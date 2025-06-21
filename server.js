import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { clear } from 'console';
import ModuleManager from './app/ModuleManager.js';
import session from 'express-session';
import { appConfig } from './app/util/config.js';
const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: appConfig().SECRET, // use env var in production!
  resave: false,
  saveUninitialized: false,
}));

// 🔧 Strip trailing slashes for consistency (e.g., /admin/logout/ -> /admin/logout)
app.use((req, res, next) => {
  if (req.path !== '/' && req.path.endsWith('/')) {
    const query = req.url.slice(req.path.length);
    res.redirect(301, req.path.slice(0, -1) + query);
  } else {
    next();
  }
});





const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'app', 'public')));

const moduleManager = new ModuleManager();
await moduleManager.initModules();

for (let pk in await moduleManager.getModules()) {
  const namespace = await moduleManager.getNamespace(pk);
  if (namespace.error !== '') {
    console.error(`Error found in namespace: ${namespace.error}. Skipping modules in that namespace`);
    continue;
  }
  const modules = namespace.namespaceData._modules;
  for (let module in modules) {
    if (modules[module]._publicRoute !== '') {
      app.get(`/${modules[module]._publicRoute}`, async (req, res) => {
        const controllerPath = `file://${modules[module]._controller.replace(/\\/g, '/')}`;

        console.log('GET Request: ', modules[module]._publicRoute)
        if (req?.params) {
          console.log('- Params: ', req?.params);
        }
        if (req?.body) {
          console.log('- Request Body: ', req?.body);
        }

        try {
          const { default: Controller } = await import(controllerPath);
          const result = await Controller(req, res);

          // Only send JSON response if headers haven't been sent yet
          // (meaning the controller didn't handle the response)
          if (!res.headersSent) {
            // Handle structured response objects (for newer controllers)
            if (result?.type === 'redirect') {
              return res.redirect(302, result.url);
            } else if (result?.type === 'html') {
              return res.send(result.content);
            } else if (result?.type === 'json') {
              return res.json(result.data);
            } else {
              // Fallback - send error info
              return res.json({
                module: module,
                module_info: modules[module],
                error: result?.error || 'Controller completed without sending response'
              });
            }
          }
          // If headers were sent, the controller handled the response directly

        } catch (error) {
          console.error('Route handler error:', error);
          if (!res.headersSent) {
            res.status(500).json({
              module: module,
              module_info: modules[module],
              error: 'Internal server error. Check logs.'
            });
          }
        }
      });
    }
    if (modules[module]?._postRoute !== undefined && modules[module]?._postRoute !== null && modules[module]?._postRoute !== '') {

      app.post(`/${modules[module]?._postRoute}`, async (req, res) => {
        console.log('POST Request: ', modules[module]._postRoute);
        if (req?.params) {
          console.log('- Params: ', req?.params);
        }
        if (req?.body) {
          console.log('- Request Body: ', req?.body);
        }

        try {
          const controllerPath = `file://${modules[module]._controller.replace(/\\/g, '/')}`;
          const { default: Controller } = await import(controllerPath);
          const result = await Controller(req, res);

          if (!res.headersSent) {
            if (result?.type === 'redirect') {
              return res.redirect(302, result.url);
            } else if (result?.type === 'html') {
              return res.send(result.content);
            } else if (result?.type === 'json') {
              return res.json(result.data);
            } else {
              return res.json({
                module: module,
                module_info: modules[module],
                error: result?.error || 'Controller completed without sending response'
              });
            }
          }
        } catch (error) {
          console.error('POST Route handler error:', error);
          if (!res.headersSent) {
            res.status(500).json({
              module: module,
              module_info: modules[module],
              error: 'Internal server error. Check logs.'
            });
          }
        }
      });
    }
    if (modules[module]?._putRoute !== undefined && modules[module]?._putRoute !== null && modules[module]?._putRoute !== '') {
      app.put(`/${modules[module]?._putRoute}`, async (req, res) => {
        console.log('PUT Request: ', modules[module]._putRoute);
        if (req?.params) {
          console.log('- Params: ', req?.params);
        }
        if (req?.body) {
          console.log('- Request Body: ', req?.body);
        }

        try {
          const controllerPath = `file://${modules[module]._controller.replace(/\\/g, '/')}`;
          const { default: Controller } = await import(controllerPath);
          const result = await Controller(req, res);

          if (!res.headersSent) {
            // Handle structured response objects (for newer controllers)
            if (result?.type === 'redirect') {
              return res.redirect(302, result.url);
            } else if (result?.type === 'html') {
              return res.send(result.content);
            } else if (result?.type === 'json') {
              return res.json(result.data);
            } else {
              // Fallback - send error info
              return res.json({
                module: module,
                module_info: modules[module],
                error: result?.error || 'Controller completed without sending response'
              });
            }
          }
          // If headers were sent, the controller handled the response directly

        } catch (error) {
          console.error('PUT Route handler error:', error);
          if (!res.headersSent) {
            res.status(500).json({
              module: module,
              module_info: modules[module],
              error: 'Internal server error. Check logs.'
            });
          }
        }
      });
    }

    if (modules[module]?._deleteRoute !== undefined && modules[module]?._deleteRoute !== null && modules[module]?._deleteRoute !== '') {
      app.delete(`/${modules[module]?._deleteRoute}`, async (req, res) => {
        console.log('DELETE Request: ', modules[module]._deleteRoute);
        if (req?.params) {
          console.log('- Params: ', req?.params);
        }
        if (req?.body) {
          console.log('- Request Body: ', req?.body);
        }

        try {
          const controllerPath = `file://${modules[module]._controller.replace(/\\/g, '/')}`;
          const { default: Controller } = await import(controllerPath);
          const result = await Controller(req, res);

          if (!res.headersSent) {
            // Handle structured response objects (for newer controllers)
            if (result?.type === 'redirect') {
              return res.redirect(302, result.url);
            } else if (result?.type === 'html') {
              return res.send(result.content);
            } else if (result?.type === 'json') {
              return res.json(result.data);
            } else {
              // Fallback - send error info
              return res.json({
                module: module,
                module_info: modules[module],
                error: result?.error || 'Controller completed without sending response'
              });
            }
          }
          // If headers were sent, the controller handled the response directly

        } catch (error) {
          console.error('DELETE Route handler error:', error);
          if (!res.headersSent) {
            res.status(500).json({
              module: module,
              module_info: modules[module],
              error: 'Internal server error. Check logs.'
            });
          }
        }
      });
    }
  }

}
app.get("/", async (req, res) => {
  res.redirect(302, '/modules');
});


app.listen(PORT, () => {
  console.log(`Server is running on ${appConfig().SERVER}. PORT: => ${PORT}`);
});

