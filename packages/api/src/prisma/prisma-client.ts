import { PrismaClient } from '@prisma/client';
import { fieldEncryptionExtension } from 'prisma-field-encryption';

export const client = new PrismaClient().$extends(
  // https://github.com/47ng/prisma-field-encryption#readme
  fieldEncryptionExtension(),
);
