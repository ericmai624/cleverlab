import jwt from 'jsonwebtoken';
import config from 'config';
import util from 'util';

import UserType from 'api/graphql/types/user';

export default {
  type: UserType,
  args: {},
  resolve: async (parentValue, {}, { req, db }) => {
    const { jwtToken } = req.session;
    
    if (!jwtToken) return null;
    
    const { secret } = config.jwt;
    const verify = util.promisify(jwt.verify);
    const decoded = await verify(jwtToken, secret);

    if (!decoded || !decoded.viewerId) return null;

    return db.User.findById(decoded.viewerId);
  }
};
