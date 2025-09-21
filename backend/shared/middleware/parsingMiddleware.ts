import express, { Application } from 'express';
import compression from 'compression';
import morgan from 'morgan';

export const configureBodyParsing = (app: Application) => {
 app.use(compression({
  filter: (req, res) => {
   if (req.headers['x-no-compression']) {
    return false;
   }
   return compression.filter(req, res);
  },
  level: 6
 }));

 app.use(express.json({
  limit: '10mb',
  verify: (_req, _res, buf) => {
   try {
    JSON.parse(buf.toString());
   } catch (e) {
    const error = new Error('Invalid JSON format') as Error & { status?: number };
    error.status = 400;
    throw error;
   }
  }
 }));

 app.use(express.urlencoded({
  extended: true,
  limit: '10mb'
 }));
};

export const configureLogging = (app: Application) => {
 morgan.token('id', (req: any) => req.id);

 const logFormat = process.env.NODE_ENV === 'production'
  ? ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :id'
  : ':method :url :status :response-time ms - :res[content-length] - :id';

 app.use(morgan(logFormat, {
  skip: (req) => {
   return process.env.NODE_ENV === 'production' && req.path === '/health';
  }
 }));
};
