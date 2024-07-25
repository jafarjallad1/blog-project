
import express from 'express';
import {initapp} from './src/initApp.js';

const app = express();

initapp(app,express);

app.listen(3000 , console.log("app listening on port 3000 ..."));