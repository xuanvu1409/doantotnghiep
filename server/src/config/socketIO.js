const jwt = require("jsonwebtoken");

module.exports = (app) => {

    const server = require("http").createServer(app);
    const io = require("socket.io")(server, {
        cors: {
            origin: '*',
        }
    });
    server.listen(process.env.APP_PORT);

    server.on('listening', function () {
        console.log(`App listening at http://localhost:${process.env.APP_PORT}`)
    });


    io.use(function (socket, next) {
        if (socket.handshake.query && socket.handshake.query.token) {
            jwt.verify(socket.handshake.query.token, process.env.JWT_SECRET, {}, (err, decoded) => {
                if (err) return next(new Error('Authentication error'));
                socket.member = decoded;
                next();
            });
        } else {
            next(new Error('Authentication error'));
        }
    })

    io.on('connection', (socket) => {
        //message
        socket.on('send-message', async (data) => {
            io.emit('message', data);
        })

        //video call
        socket.emit("me", socket.id)

        socket.on("disconnect", () => {
            socket.broadcast.emit("callEnded")
        })

        socket.on("callUser", (data) => {
            io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
        })

        socket.on("answerCall", (data) => {
            io.to(data.to).emit("callAccepted", data.signal)
        })
    })
}