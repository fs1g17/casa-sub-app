import express from 'express';
import { configure } from '@dwp/govuk-casa';

const application = ({
  sessionStore
}) => {
  const { mount, ancillaryRouter } = configure({
    views: ['./main-app/views/'],
    session: {
      name: 'myappsessionid', // session cookie name 
      secret: 'secret',       // secret used to sign cookie
      ttl: 3600,              // (seconds)
      secure: false,
      store: sessionStore,
    }
  });

  ancillaryRouter.use('/start', (req, res, next) => {
    if(req.session.mainCount) {
      ++req.session.mainCount;
    } else {
      req.session.mainCount = 1;
    }

    res.render('pages/start.njk', { message: "Viewed " + req.session.mainCount + " times." });
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