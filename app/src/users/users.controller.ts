import { Controller } from '@nestjs/common';
import { Res, HttpStatus} from '@nestjs/common';
import { NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { Query } from '@nestjs/common';
import { Get } from '@nestjs/common';
import {UsersService} from "./users.service";
@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService
    ) {}

    @Get()
    public async getAllUsers(@Query('email') email, @Res() res) {
        if (!email) {
            const users = await this.userService.findAll();
            return res.status(HttpStatus.OK).json(users);
        } else {
            const user = await this.userService.getUserByEmail(email);
            if (user)
                return res.status(HttpStatus.OK).json(user);
            else
                throw new NotFoundException('User not found');
        }
    }
}
