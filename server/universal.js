/* eslint-disable consistent-return */
const React = require('react');
const path = require('path');
const fs = require('fs');

const { Provider } = require('react-redux');
const { renderToString } = require('react-dom/server');
const { StaticRouter } = require('react-router-dom');
const createMemoryHistory = require('history').createMemoryHistory;

const { default: configureStore } = require('../src/store/index');
const { default: App } = require('../src/App');

module.exports = function universalLoader(req, res) {
  const filePath = path.resolve(__dirname, '..', 'build', 'index.html');

  fs.readFile(filePath, 'utf8', (err, htmlData) => {
    if (err) {
      return res.status(404).end();
    }
    const history = createMemoryHistory();
    const context = {};
    const store = configureStore();
    const markup = renderToString(
      <Provider store={store}>
        <StaticRouter
          location={req.url}
          context={context}
        >
          <App history={history} />
        </StaticRouter>
      </Provider>
    );

    if (context.url) {
      // Somewhere a `<Redirect>` was rendered
      res.redirect(301, context.url);
    } else {
      // we're good, send the response
      const RenderedApp = htmlData.replace('{{SSR}}', markup);
      res.send(RenderedApp);
    }
  });
};
