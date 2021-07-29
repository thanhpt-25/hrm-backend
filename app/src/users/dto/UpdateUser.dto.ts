import CreateUserDto from "./CreateUser.dto";
import {PartialType} from '@nestjs/mapped-types';

export default class UpdateUserDto extends PartialType(CreateUserDto) {}
