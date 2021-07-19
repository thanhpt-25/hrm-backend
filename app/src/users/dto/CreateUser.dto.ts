import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    email: string;
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    password: string;
}
