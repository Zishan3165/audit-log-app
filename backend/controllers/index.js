import configureUserController from './userController.js';
import configureLogController from './logController.js';
import configureSiteController from './siteController.js';

const configure = app => {
  configureUserController(app);
  configureLogController(app);
  configureSiteController(app);
};
export default configure;
