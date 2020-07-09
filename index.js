const log = require('./src/log.js');
const app = require('./src/app.js');

const port = 3000;

app.listen(port, () => {
    log.info(`app running on port ${port}`)
});

