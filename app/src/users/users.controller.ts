import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    InternalServerErrorException,
    Param,
    Patch,
    Post,
    Query,
    Req,
    Res,
    UseGuards
} from '@nestjs/common';
import {UsersService} from "./users.service";
import * as bcrypt from 'bcrypt';
import {PostgresErrorCode} from '../database/error.code'
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import UpdateUserDto from "./dto/UpdateUser.dto";
import CreateUserDto from "./dto/CreateUser.dto";
import {EntityNotFoundError} from 'typeorm/error/EntityNotFoundError';

@Controller('users')
export class UsersController {
    private saltOrRounds = 10;

    constructor(
        private readonly userService: UsersService
    ) {}

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
    @UseGuards(JwtAuthGuard)
    @Patch()
    public async updateUser(@Req() req,
                            @Body() updateUserDto:UpdateUserDto
    ) {
        const user = req.user;
        const id = user.userId;
        try {
            return await this.userService.update(
                +id,
                updateUserDto
            );
        }catch(error){
            throw new BadRequestException(
                { key: 'messages.MSG_UPDATE_FAILED', args: { id: id } },
            );
        }
    }

}
