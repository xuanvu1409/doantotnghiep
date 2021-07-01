const jwt = require("jsonwebtoken");
const MessageThread = require("../app/models/messageThread");
const Message = require("../app/models/message");

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
            if (!await MessageThread.exists({
                $or: [{from: socket.member._id, to: data.messageTo}, {from: data.messageTo, to: socket.member._id}]
            })) {
                await MessageThread.insertMany([{
                    to: data.messageTo,
                    from: socket.member._id,
                    status: 1,
                    lastMessage: data.content
                }, {
                    from: data.messageTo,
                    to: socket.member._id,
                    status: 1,
                    lastMessage: data.content,
                    $inc: {notRead: 1}
                }])
                const message = await Message.findById(newMessage._id).populate('from');
                io.emit('message', message);
            } else {
                await MessageThread.findOneAndUpdate({to: socket.member._id, from: data.messageTo}, {
                    $inc: {notRead: 1},
                    lastMessage: data.content
                })
                await MessageThread.findOneAndUpdate({from: socket.member._id, to: data.messageTo}, {
                    lastMessage: data.content, notRead: 0
                })
                const message = await Message.findById(newMessage._id).populate('from');
                io.emit('message', message);
            }
        })
    })
}