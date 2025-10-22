import { randomUUID } from 'crypto';

import { Injectable } from '@nestjs/common';
import { Params } from 'nestjs-pino';

import { name as serviceName } from '../../../package.json';
import { response } from 'express';

@Injectable()
export class LoggerConfig {
  get execute(): Params {
    const isDev = process.env.ENVIRONMENT?.toLocaleUpperCase() !== 'PRODUCTION';

    return {
      assignResponse: true,
      pinoHttp: {
        level: isDev ? 'debug' : 'info',
        transport: isDev
          ? {
              target: 'pino-pretty',
              options: {
                colorize: true,
                singleLine: true,
                translateTime: 'yyyy-mm-dd HH:MM:ss.l o',
                ignore: 'pid,hostname',
              },
            }
          : undefined,
        redact: ['req.headers.authorization', 'req.headers.cookie', 'req.body.password'],
        messageKey: 'data',
        base: {},
        mixin() {
          return {
            request_id: randomUUID(),
            user_agent: 'my-user-agent',
            service_name: 'lumina-indra',
            ip: '127.0.0.1',
          };
        },
        genReqId: (req) => req.headers['x-request-id']?.toString() ?? randomUUID(),
        customProps: (req: any, res: any) => {
          req.body ??= req.body;
          req.params ??= req.params;
          req.query ??= req.query;

          res.body ??= res.body;
          res.statusCode ??= res.statusCode;

          return {
            request_id: req.id,
            user_agent: req.headers['user-agent'],
            service_name: serviceName,
            ip: req.headers?.['x-forwarded-for'] || req.socket.remoteAddress,
          };
        },
      },
    };
  }
}
