import UserServices from './users';
import LogServices from './logs';
import SiteServices from './sites';

export default {
  ...UserServices,
  ...LogServices,
  ...SiteServices
};
