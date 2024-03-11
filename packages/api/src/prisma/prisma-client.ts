import { PrismaClient } from '@prisma/client';
import { fieldEncryptionExtension } from 'prisma-field-encryption';

const globalClient = new PrismaClient();

export const client = globalClient.$extends(
  // https://github.com/47ng/prisma-field-encryption#readme
  fieldEncryptionExtension(),
);
