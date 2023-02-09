import express from 'express';
import { configure } from '@dwp/govuk-casa';

const application = ({
  sessionStore
}) => {
  const { mount, ancillaryRouter } = configure({
    views: ['./sub-app/views/'],
    session: {
      name: 'myappsessionid', // session cookie name 
      secret: 'secret',       // secret used to sign cookie
      ttl: 3600,              // (seconds)
      secure: false,
      store: sessionStore,
    }
  });

  ancillaryRouter.use('/start', (req, res, next) => {
    if(req.session.subCount) {
      ++req.session.subCount;
    } else {
      req.session.subCount = 1;
    }

    res.render('pages/start.njk', { message: "Viewed " + req.session.subCount + " times." });
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