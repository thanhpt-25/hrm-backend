import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { UsersController } from './users.controller';
import {User} from "./entities/user.entity";
import {Profile} from "../profiles/entities/profile.entity";

@Module({
  imports:[
      TypeOrmModule.forFeature([User, Profile])
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
