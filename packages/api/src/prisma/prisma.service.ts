import type { OnModuleInit } from '@nestjs/common';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { fieldEncryptionExtension } from 'prisma-field-encryption';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger();

  public constructor() {
    super();

    this.$extends(fieldEncryptionExtension());
  }

  public async onModuleInit(): Promise<void> {
    await this.$connect();

    this.logger.debug('Prisma connected');
  }
}
