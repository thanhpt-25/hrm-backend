import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import {ConfigModule} from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import PostgresConfig from './config/postgres.config';

@Module({
  imports: [
      ConfigModule.forRoot({
          load:[
            PostgresConfig
          ]
      }),
      AuthModule,
      UsersModule,
      DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
