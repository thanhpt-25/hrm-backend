import { IsEmail, IsNotEmpty } from 'class-validator';

export default class LoginDto {
    @IsEmail()
    email: string;
    @IsNotEmpty()
    password: string;
}
