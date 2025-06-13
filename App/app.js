import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const router = express.Router();

const static_path = __dirname + '/static/';
const port = 3000;

router.use(function (req,res,next) {
  console.log('/' + req.method);
  next();
});

router.get('/', function(req,res){
  res.sendFile(static_path + 'index.html');
});

router.get('/sharks', function(req,res){
  res.sendFile(static_path + 'sharks.html');
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.use(express.static(static_path));
app.use('/', router);

export default app;