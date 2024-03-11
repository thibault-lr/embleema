import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PatientsModule } from './endpoints/patients/patients.module';

@Module({
  imports: [PrismaModule, PatientsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
