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
    
    let { secret } = config.jwt;
    let sign = util.promisify(jwt.sign);
    let verify = util.promisify(jwt.verify);
    let decoded = await verify(owner, secret);

    if (!decoded || !decoded.data || !decoded.data.id) return null;

    let { uri, secret: profiledotSecret } = config.profiledot;
    let options = Object.assign({}, requestOptions);
    options.headers = { Authorization: `Bearer ${await sign({ data: decoded.data }, profiledotSecret, { expiresIn: 300 })}` };

    let response = await request(uri, options);

    if (response.statusCode === 406) return null;

    return JSON.parse(response.body);
  }
};
