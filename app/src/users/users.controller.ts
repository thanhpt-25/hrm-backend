import { Controller, Post} from '@nestjs/common';
import { Res, Req, Body, HttpStatus} from '@nestjs/common';
import { NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { Query } from '@nestjs/common';
import { Get } from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/CreateUser.dto";
import * as bcrypt from 'bcrypt';
import { PostgresErrorCode } from '../database/error.code'
import { UseGuards } from '@nestjs/common';
import  {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

@Controller('users')
export class UsersController {
    private saltOrRounds = 10;

    constructor(
        private readonly userService: UsersService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    public getAllUsers(@Query('email') email, @Res() res) {
        if (!email) {
            const users = this.userService.findAll();
            return res.status(HttpStatus.OK).json(users);
        } else {
            const user = this.userService.getUserByEmail(email);
            if (user)
                return res.status(HttpStatus.OK).json(user);
            else
                throw new NotFoundException('User not found');
        }
    }
    @UseGuards(JwtAuthGuard)
    @Get('me')
    public getProfile(@Req() req) {
        return req.user;
    }
    @Post()
    public async createUser(@Body() createUserDto : CreateUserDto, @Res() res ){
        const hashedPassword = await bcrypt.hash(createUserDto.password, this.saltOrRounds);
        try {
            const createdUser = await this.userService.create(
                {
                    ...createUserDto,
                    password: hashedPassword
                }
            );
            createdUser.password = undefined;
            return res.status(HttpStatus.OK).json(createdUser);
        }catch (error) {
            if (error?.code === PostgresErrorCode.UniqueViolation ) {
                throw new BadRequestException(
                    { key: 'messages.MSG_USER_EXISTED', args: { email: createUserDto.email } },
                );
            }
            throw new InternalServerErrorException({key: 'messages.MSG_SYSTEM_ERROR', args: undefined});
        }
    }

}
