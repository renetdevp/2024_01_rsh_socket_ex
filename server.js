require('dotenv').config();

const server = require('./app');

server.listen(process.env.PORT || 8000, () => {
    console.log('server opened');
});
