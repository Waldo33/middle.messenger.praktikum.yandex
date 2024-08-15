import express from "express";
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PATHNAMES = {
  SIGNIN_PATH: '/',
  SIGNUP_PATH: '/sign-up',
  MESSAGER_PATH: '/messenger',
  SETTINGS_PATH: '/settings',
  EDIT_SETTINGS_PATH: '/edit-settings',
  EDIT_PASSWORD_PATH: '/edit-password',
  PATH_NOT_FOUND: '/path-not-found',
};

const app = express();

app.use(express.static(path.resolve(__dirname, 'dist')))

for(const key in PATHNAMES) {
  app.get(PATHNAMES[key], (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist/index.html'))
  })
}

app.listen(3000);
