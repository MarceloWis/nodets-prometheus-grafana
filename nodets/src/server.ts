import express, { Express, Router } from 'express';
import router from './router';
class Server {
    public express: Express;

    constructor() {
        this.express = express();
        this.config();
        this.middleware();
        this.router();
    }

    private config() {}
    private middleware() {}
    private router() {
        this.express.use(router);
    }
}
export default new Server().express;