import validateUser from './user-view-model.js';
import validateSite from './site-view-model.js';
import validateLog from './log-view-model.js';

const validators = {
  userSchemaValidate: validateUser,
  siteSchemaValidate: validateSite,
  logSchemaValidate: validateLog,
};
export default validators;
