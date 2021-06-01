const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
    } catch (e) {
        console.log('connect failure!')
    }
}

module.exports = {connect}
