import express from 'express';
import { configure } from '@dwp/govuk-casa';

import application from './main-app/main.js';

const app1 = application({ mountUrl: '/main' });

const parent = express();
parent.use('/main', app1);

parent.listen(3000, () => {
  console.log('listening on port 3000');
})