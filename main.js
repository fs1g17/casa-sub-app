import express from 'express';
import { configure } from '@dwp/govuk-casa';

function createApp(mountUrl) {
  const { mount, ancillaryRouter } = configure({
    views: ['./views/'],
    session: {
      name: 'myappsessionid', // session cookie name 
      secret: 'secret',       // secret used to sign cookie
      ttl: 3600,              // (seconds)
      secure: false
    }
  });

  // I know for sure this is the one that gets called
  ancillaryRouter.use('/start', (req, res, next) => {
    res.render('pages/start.njk');
  });

  // redirect unknown pages to the welcome page
  ancillaryRouter.use(/^\/$/, (req, res, next) => {
    res.redirect(302, `${req.baseUrl}/start`);
  });

  return mount(express());
}

const app1 = createApp();
const app2 = createApp();

const parent = express();
parent.use('/one/', app1);
parent.use('/two/', app2);

parent.listen(3000);