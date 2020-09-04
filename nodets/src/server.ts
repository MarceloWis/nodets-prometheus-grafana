import express, { Express, Router } from 'express';
import router from './router';
import { responseCounters, injectMetricsRoute, startCollection } from './middlewares/prometheus';
class Server {
    public express: Express;

    constructor() {
        this.express = express();
        this.config();
        this.middleware();
        this.prometheus()
        this.router();
    }

    private config() {}
    private middleware() {}
    private router() {
        this.express.use(router);
    }
    private prometheus() {
      this.express.use(responseCounters);
      injectMetricsRoute(this.express);
      startCollection();
  }
}
export default new Server().express;
