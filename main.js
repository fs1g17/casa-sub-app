import express from 'express';
import session from 'express-session';
import genFunc from 'connect-memcached';

import mainApp from './main-app/main.js';
import subApp from './sub-app/main.js';

const parent = express();

const MemcachedStore = genFunc(session);
const sessionStore = new MemcachedStore({
  hosts: ["127.0.0.1:11211"],
  secret: "123, easy as ABC. ABC, easy as 123" // Optionally use transparent encryption for memcached session data
});

const app1 = mainApp({ sessionStore });
const app2 = subApp({ sessionStore });

parent.use('/one/', app1);
parent.use('/two/', app2);

parent.use(/^\/$/, (req, res, next) => {
  res.redirect(302, `${req.baseUrl}/one`);
});

parent.listen(3000);