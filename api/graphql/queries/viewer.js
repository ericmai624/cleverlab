import jwt from 'jsonwebtoken';
import config from 'config';
import util from 'util';
import request from 'request-promise';

import UserType from 'api/graphql/types/user';

export default {
  type: UserType,
  args: {},
  resolve: async (parentValue, {}, { req, requestOptions }) => {
    let { owner } = req.session;

    if (!owner) return null;
    
    let { cleverlab, profiledot } = config;
    let sign = util.promisify(jwt.sign);
    let verify = util.promisify(jwt.verify);
    let decoded = await verify(owner, cleverlab.secret);

    if (!decoded || !decoded.data || !decoded.data.id) return null;

    let options = Object.assign({}, requestOptions);
    let token = await await sign({ data: decoded.data }, profiledot.secret, { expiresIn: 300 });
    options.headers = { Authorization: `Bearer ${token}` };

    let response = await request(profiledot.uri, options);
    let errorCodes = [400, 404];
    if (errorCodes.includes(response.statusCode)) return null;

    return JSON.parse(response.body);
  }
};
