import {Injectable} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {EntityNotFoundError, Repository} from "typeorm";
import {Profile} from "./entities/profile.entity";

@Injectable()
export class ProfilesService {
  @InjectRepository(Profile)
  private profileRepository : Repository<Profile>;

  async create(createProfileDto: CreateProfileDto) {
      const newProfile = await this.profileRepository.create(createProfileDto);
      return await this.profileRepository.save(newProfile);
  }

  async findAll() {
    return `This action returns all profiles`;
  }
  async findOne(profile_id: number) :Promise<Profile|undefined>{
    return this.profileRepository.findOne(profile_id);
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    return await this.profileRepository.update({id: id}, updateProfileDto);
  }

  async remove(id: number) {
    let profile = await this.profileRepository.findOne(id);
    return await this.profileRepository.remove(profile);
  }
}
