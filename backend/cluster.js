const cluster = require('cluster');
const os = require('os');
const app = require('./app');
const numCPUs = os.cpus().length;
const logger = require('./utils/logger');

if (cluster.isMaster) {
    logger.info(`Master ${process.pid} is running`);

   
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        logger.info(`Worker ${worker.process.pid} died`);
        cluster.fork();
    });
} else {
    const port = process.env.PORT || 5000;
    app.listen(port, () => logger.info(`Worker ${process.pid} started on port ${port}`));
}
