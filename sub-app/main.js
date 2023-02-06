import express from 'express';
import { configure } from '@dwp/govuk-casa';

const application = (mountUrl = '/') => {
  const { mount, ancillaryRouter } = configure({
    views: ['./sub-app/views/'],
    session: {
      name: 'myappsessionid', // session cookie name 
      secret: 'secret',       // secret used to sign cookie
      ttl: 3600,              // (seconds)
      secure: false
    }
  });

  ancillaryRouter.use('/start', (req, res, next) => {
    res.render('pages/start.njk');
  });

  // redirect unknown pages to the welcome page
  ancillaryRouter.use(/^\/$/, (req, res, next) => {
    res.redirect(302, `${req.baseUrl}/start`);
  });

  const casaApp = express();
  mount(casaApp);

  return casaApp;
};

export default application;