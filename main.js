import express from 'express';
import { configure } from '@dwp/govuk-casa';

import mainApp from './main-app/main.js';
import subApp from './sub-app/main.js';

const app1 = mainApp();
const app2 = subApp();

const parent = express();
parent.use('/one/', app1);
parent.use('/two/', app2);

parent.use(/^\/$/, (req, res, next) => {
  res.redirect(302, `${req.baseUrl}/one`);
});

parent.listen(3000);