import jwt from 'jsonwebtoken';
import config from 'config';
import util from 'util';
import request from 'request-promise';
import UserType from 'api/graphql/types/user';
import { debug as createDebug } from 'api/util';

const debug = createDebug('graphql:queries:viewer');

export default {
  type: UserType,
  args: {},
  resolve: async (parentValue, {}, { req, requestOptions }) => {
    debug('*** Process Started ***');
    let { owner } = req.session;

    if (!owner || !owner.id) {
      debug('Missing owner info in session, owner: %O', owner);
      return null;
    }
    
    let { profiledot } = config;
    let sign = util.promisify(jwt.sign);
    let token = await sign({ data: owner }, profiledot.secret, { expiresIn: 300 });
    let options = Object.assign({}, requestOptions);
    options.headers = { Authorization: `Bearer ${token}` };

    let response = await request(profiledot.uri, options);

    let errorCodes = [400, 404];
    
    if (errorCodes.includes(response.statusCode)) {
      debug(`Recieved errorCode ${response.statusCode} from request`);
      return null;
    }

    debug('Complete process with response body %O', response.body);

    return JSON.parse(response.body);
  }
};
