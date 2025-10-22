import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger: Logger = new Logger(AppService.name);
  constructor() {}
  getHello(): string {
    this.logger.log({ message: 'Hello World!' });
    return 'Hello World!';
  }
}
