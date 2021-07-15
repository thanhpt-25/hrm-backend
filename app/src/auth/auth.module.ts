import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { UsersModule} from "../users/users.module";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";

import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService} from '@nestjs/config';

@Module({
  imports:[
    UsersModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('jwt').JWT_SECRET,
          signOptions: { expiresIn: '3600s' },
        };
      },
      inject: [ConfigService]
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, ConfigService],
  exports:[AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
