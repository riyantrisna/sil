const momentTimezone = require('moment-timezone');
const tzNow = momentTimezone().tz('Asia/Jakarta');

const server = {
    app: {
        env: 'development',
        port: 4000,
        timezoneNow: tzNow
    },
    email: {
        status: true,
        host: 'smtp.gmail.com',
        port: '465',
        secure: true,
        user: 'wahyuastiani84@gmail.com',
        password: 'kuthulkencul',
        senderName: 'noreply'
    }
};

module.exports = server;