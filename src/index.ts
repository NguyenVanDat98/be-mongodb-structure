import 'dotenv/config'
import './core/casbin'
import express from 'express'
import cors from 'cors'
import rootRouter from './routes';
import { loggerHelper } from './core';
import { signToken, verifyToken } from './utils';


const logger = loggerHelper.getLogger('index')
const app = express();
app.use(cors());
rootRouter(app)

app.listen(process.env.PORT,function(){
    logger.info('Server listening on host: http://localhost:'+process.env.PORT)
})