import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';

import { TypeOrmModule } from '@nestjs/typeorm';
import { NodeModule } from './modules/node/node.module';
import { PropertyModule } from './modules/property/property.module';
import defaultDatabaseConfig from "./config/database.config";
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: defaultDatabaseConfig
    }), NodeModule, PropertyModule],
  controllers: [],
  providers: [{
    provide: APP_PIPE,
    useValue: new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  },],
})
export class AppModule { }
