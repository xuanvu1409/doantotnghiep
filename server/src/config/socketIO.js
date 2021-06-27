const jwt = require("jsonwebtoken");
const MessageThread = require("../app/models/messageThread");
const Message = require("../app/models/message");
const Member = require("../app/models/member");
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
        socket.on('send-message', async (data) => {
            const newMessage = await Message.create({
                to: data.messageTo,
                from: socket.member._id,
                content: data.content,
                media: data.media,
                status: 1
            })
            const message = await Message.findById(newMessage._id).populate('from')
            io.emit('message', message);
        })
    })
}