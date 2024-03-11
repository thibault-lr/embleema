import type { OnModuleInit } from '@nestjs/common';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { fieldEncryptionExtension } from 'prisma-field-encryption';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger();

  public constructor() {
    super();

  }

  public async onModuleInit(): Promise<void> {
    await this.$connect();

    // Easy hack to extend prisma before instantiation : https://github.com/prisma/prisma/issues/18628
    Object.assign(this,
      this.$extends(fieldEncryptionExtension()))

    this.logger.debug('Prisma connected');
  }
}
