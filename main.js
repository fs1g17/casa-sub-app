import express from 'express';
import { configure } from '@dwp/govuk-casa';

import application from './main-app/main.js';

const app1 = application();
const app2 = application();

const parent = express();
parent.use('/one/', app1);
parent.use('/two/', app2);

parent.use(/^\/$/, (req, res, next) => {
  res.redirect(302, `${req.baseUrl}/one`);
});

parent.listen(3000);