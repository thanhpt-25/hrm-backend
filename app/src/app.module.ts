import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ThrottlerModule } from '@nestjs/throttler';
import {ConfigModule, ConfigService} from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import PostgresConfig from './config/postgres.config';
import JWTConfig from './config/jwt.config';
import ThrottleConfig from './config/throttler.config';
@Module({
  imports: [
      ConfigModule.forRoot({
          load:[
                PostgresConfig,
                JWTConfig,
                ThrottleConfig
          ]
      }),
      ThrottlerModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (config: ConfigService) => ({
              ttl: config.get('throttle').THROTTLE_TTL,
              limit: config.get('throttle').THROTTLE_LIMIT,
          }),
      }),
      AuthModule,
      UsersModule,
      DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
