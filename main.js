import express from 'express';
import { configure } from '@dwp/govuk-casa';

import application from './main-app/main.js';

const mountUrl = '/main';

const app1 = application({ mountUrl });

const parent = express();
parent.use(mountUrl, app1);

parent.listen(3000, () => {
  console.log('listening on port 3000');
})