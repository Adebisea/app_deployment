import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import client from 'prom-client'; // 1. Import the "Reporter"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const router = express.Router();

// --- PROMETHEUS CONFIGURATION ---
//  Setup a Registry
const register = new client.Registry();

//  Collect default metrics like CPU and Heap usage automatically
client.collectDefaultMetrics({
    register,
    prefix: 'sharks_app_' 
});
// --------------------------------

const static_path = path.join(__dirname ,'/static/')

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

//  The /metrics endpoint: This is what Prometheus "scrapes"
app.get('/metrics', async (req, res) => {
  res.setHeader('Content-Type', register.contentType);
  res.send(await register.metrics());
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.use(express.static(static_path));
app.use('/', router);

export default app;