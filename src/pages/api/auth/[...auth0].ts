import {
  handleAuth,
  handleCallback,
  handleLogin,
  handleLogout,
} from '@auth0/nextjs-auth0';

import { loginCallback } from '~/logic/api/loginCallback';

export default handleAuth({
  async login(req, res) {
    await handleLogin(req, res);
  },
  async logout(req, res) {
    await handleLogout(req, res);
  },
  async callback(req, res) {
    await handleCallback(req, res, { afterCallback: loginCallback });
  },
});
