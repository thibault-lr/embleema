import { Controller, Get } from '@nestjs/common';
import { Public } from 'nest-keycloak-connect';

import { version } from '../package.json';

@Controller()
export class AppController {
  @Get()
  @Public()
  public getStatus(): { version: string } {
    return { version };
  }
}
