'use strict';

const expressJwt = require('express-jwt').expressjwt;

function authJwt() {
  const secret = process.env.SESSION_SECRET;
  const api = process.env.API_VERSION;

  return expressJwt({
    secret,
    algorithms: ['HS256'],
    isRevoked: isRevoked,
  }).unless({
    path: [
      {
        url: /\/public(.*)/,
        methods: ['GET', 'OPTIONS', 'POST', 'PUT', 'DELETE'],
      },

      `${api}/about/terms-and-condition/1`,
      `${api}/admin/forgot-password`,
      `${api}/admin/reset-password`,
      `${api}/admin/signin`,
      `${api}/event/search-events`,
      `${api}/help-center/faq`,
      /^\/api\/v1\/home\/banner\/([^\/]*)$/,
      `${api}/home/search-banners`,
      `${api}/home/send-message`,
      `${api}/member/forgot-password`,
      `${api}/member/reset-password`,
      `${api}/member/signin`,
      `${api}/member/signup`,
      `${api}/member/verification-link`,
      `${api}/service_transaction`,
      `${api}/service_transaction/today`,
      `${api}/service_transaction/check_point_expired`,
      `${api}/service_transaction/get_data_csv_direct`,
      // { url: /(.*)/ }, // TO DISABLE AUTHENTICATION TEMPORARILY WHILE FRONTEND DEVELOPMENT
    ],
  });
}

async function isRevoked(req, payload, done) {
  if (payload.isAdmin) {
    done();
  }
  if (payload.verified) {
    done();
  }
}

module.exports = authJwt;
