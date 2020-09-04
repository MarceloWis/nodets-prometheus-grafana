import responseTime = require('response-time')
import { Summary } from 'prom-client'
import { register as Register } from 'prom-client';
import help from './help';
export const responses = new Summary({
  name: 'responses',
  help: 'Response time in millis',
  labelNames: ['method', 'path', 'status', 'contry', 'city','latitude','longitude']
})

const getLocationIp = () => {
  return {
    "ip": "170.245.203.6",
    "country_code": "BR",
    "country_name": "",
    "region_code": "SC",
    "region_name": "",
    "city": "",
    "zip_code": "89290",
    "time_zone": "America/Sao_Paulo",
    "latitude": -Math.floor(Math.random() * 29) + 1  ,
    "longitude": -Math.floor(Math.random() * 50) + 1,
    "metro_code": 0
    }
}
export const startCollection = () => {
  require('prom-client').collectDefaultMetrics();
}

export const responseCounters = responseTime((req: any, response: any, time: any) => {
  if (req.url !== '/metrics') {

    const a = help.map((element: any) => {
      return responses.labels(req.method, req.url, String(response.statusCode)
      , '', element.city, String(element.latitude), String(element.longitude), ).observe(time);
    });
    return a
  }
})

export const injectMetricsRoute = (App:any) => {
  App.get('/metrics', (req:any, res:any) => {
      res.set('Content-Type', Register.contentType);
      return res.end(Register.metrics());
  });
}
