/* eslint-disable global-require */
/* eslint-disable class-methods-use-this */
import winston from 'winston';
import 'dotenv/config'
import DailyRotateFile = require('winston-daily-rotate-file');

const { format } = winston;
const {
  combine, label, json, colorize, timestamp, printf,
} = format;

class LoggerHelper {
  nodeEnv: string;

  level: string;

  logger: winston.Logger;

  constructor(opts: any) {
    const { level, nodeEnv } = opts || {};
    this.nodeEnv = this.getConfig(nodeEnv, String(process.env.NODE_ENV), '');
    this.level = this.getConfig(level, String(process.env.LOG_LEVEL), 'info');
    this.logger = this.getLogger();
  }

  getConfig(value: string, envValue: string, defaultValue: string) {
    if (value) return value;
    if (envValue) return envValue;
    return defaultValue;
  }

  addTransport(transport: any) {
    if (!transport && typeof transport !== 'object') {
      throw new Error('Invalid Transport');
    }
    this.logger.add(transport);
  }

  setLevel(level: string) {
    this.level = level;
  }

  getLogger(name?: string) {
    this.logger  = winston.createLogger({
      level: this.level,
    });

    if (this.nodeEnv === 'production') {
      this.logger.add(
        new winston.transports.Console({
          format: combine(label({ label: name }), json()),
        })
      );
      this.logger.add(
        new DailyRotateFile({
          filename: 'log/api.%DATE%.log',
          datePattern: 'YYYY-MM-DD',
        })
      );
    } else {
      const formatMessage = ({
        // eslint-disable-next-line no-shadow
        level,
        message,
        timestamp,
        stack,
      }: winston.Logform.TransformableInfo) => {
        const classname = name ? ` - [${name}]` : '';
        if (stack) {
          return `[ ${timestamp} ] ${level}${classname}: ${stack}`;
        }
        return `[ ${timestamp} ] ${level}${classname}: ${message}`;
      };
      this.logger.add(
        new winston.transports.Console({
          format: combine(
            colorize({
                colors:{
                    info: 'green',
                    error: 'red',
                    warning: 'yellow'
                },
                message:true,
                level:true
            }),
            
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            printf((info) => formatMessage(info))
          ),
        })
      );
    }
    return this.logger;
  }
}

const loggerHelper = new LoggerHelper({
  level: process.env.LOG_LEVEL || 'info',
});

export default loggerHelper;
