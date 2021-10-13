import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from './entities/user.entity';
import CreateUserDto from "./dto/CreateUser.dto";
import UpdateUserDto from "./dto/UpdateUser.dto";

@Injectable()
export class UsersService {
    @InjectRepository(User)
    private usersRepository: Repository<User>;

    /**
     *  get user by his/her email or throw not found exception
     * @param email
     */

    async getUserByEmail(email: string):Promise<User|undefined>{
        return this.usersRepository.findOne({ where: { email: email} , relations:['profile'] });
    }

    /**
     * Get all user from list
     */
    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    /**
     * Create user using input information
     * @param creatUserDto
     */

    async create(creatUserDto: CreateUserDto):Promise<User|undefined>{
        const newUser = await this.usersRepository.create(creatUserDto);
        await this.usersRepository.save(newUser);
        return newUser;
    }

    /**
     * Create user using input information
     * @param id
     * @param updateUserDto
     */

    async update(id: number, updateUserDto: UpdateUserDto){
        return await this.usersRepository.update({id: id}, updateUserDto);
    }
}
