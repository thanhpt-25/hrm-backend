import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import  { User }  from './entities/user.entity';

@Injectable()
export class UsersService {
    @InjectRepository(User)
    private usersRepository: Repository<User>;

    /**
     *  get user by his/her email or throw not found exception
     * @param email
     */

    async getUserByEmail(email: string):Promise<User|undefined>{
        return this.usersRepository.findOne({ email: email});
    }

    /**
     * Get all user from list
     */
    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }
}
