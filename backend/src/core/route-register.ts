import { Application } from 'express';
// import routeEntrance from './route-entrance';
import routeEntrance from '../mvc/routes/@entrance';
import urlRouteConf from '../config/url-route';

export default (app: Application) => {
  app.use('*', routeEntrance);
  var rootUrls = Object.keys(urlRouteConf);
  rootUrls.forEach(url => {
    console.log('======> register router for rootUrl: ' + url);
    app.use(url, urlRouteConf[url].router);
  })
}
