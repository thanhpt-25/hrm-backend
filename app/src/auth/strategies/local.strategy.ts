import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'email',
            passwordField: 'password',
        });
    }

    async validate(username: string, password: string): Promise<User> {
        try{
            const user = await this.authService.validateUser(username, password);
            if (!user) {
                throw new UnauthorizedException();
            }
            console.log(user);
            return user;
        }catch (e) {
            throw new UnauthorizedException();
        }
    }
}
