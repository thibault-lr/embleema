import { Module } from '@nestjs/common';
import { AuthGuard, KeycloakConnectModule } from 'nest-keycloak-connect';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { PatientsModule } from './endpoints/patients/patients.module';
import { ApiConfiguration } from './types';

// For example only, disable AUTH guard in prod (:D)
// Issue with Keycloak, auth request always returns 401
const providers =
  process.env.NODE_ENV === 'production'
    ? []
    : [
        {
          provide: APP_GUARD,
          useClass: AuthGuard,
        },
      ];

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      isGlobal: true,
    }),
    PrismaModule,
    PatientsModule,
    KeycloakConnectModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<ApiConfiguration>) => ({
        authServerUrl: configService.get('KEYCLOAK_AUTH_SERVER_URL')!,
        realm: configService.get('KEYCLOAK_REALM')!,
        clientId: configService.get('KEYCLOAK_CLIENT_ID')!,
        secret: configService.get('KEYCLOAK_CLIENT_SECRET')!,
      }),
    }),
  ],
  controllers: [AppController],
  providers,
})
export class AppModule {}
