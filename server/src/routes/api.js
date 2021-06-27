const memberRouter = require('./member');
const locationRouter = require('./location');
const genderRouter = require('./gender');
const jobTitleRouter = require('./jobTitle');
const interestsRouter = require('./interests');
const languageRouter = require('./language');
const contactRouter = require('./contact');
const actionRouter = require('./action');
const messageRouter = require('./message');

module.exports = (app) => {
    app.use('/api/job/', jobTitleRouter);
    app.use('/api/gender/', genderRouter);
    app.use('/api/location/', locationRouter);
    app.use('/api/interests/', interestsRouter);
    app.use('/api/language/', languageRouter);
    app.use('/api/contact/', contactRouter);
    app.use('/api/action/', actionRouter);
    app.use('/api/message/', messageRouter);
    app.use('/api/', memberRouter);
}
