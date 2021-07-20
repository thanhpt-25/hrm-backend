import { Injectable } from '@nestjs/common';
import { User } from "../users/entities/user.entity";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {UsersService} from "../users/users.service";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private usersService: UsersService
    ) {}
    async validateUser(email: string, password: string): Promise<User> {
        try{
            const user = await this.usersService.getUserByEmail(email);
            const validated = await bcrypt.compare(
                password,
                user.password
            );
            console.log(validated);

            if(validated){
                user.password = undefined;
                return user;
            }else{
                return undefined;
            }
        }catch (e) {
            return undefined;
        }
    }
    async login(user: User): Promise<any> {
        const payload = {
            email: user.email,
            id: user.id,
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
