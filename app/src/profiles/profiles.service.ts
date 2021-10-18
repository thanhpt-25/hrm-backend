import {Injectable, Query} from '@nestjs/common';
import {CreateProfileDto} from './dto/create-profile.dto';
import {UpdateProfileDto} from './dto/update-profile.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Profile} from "./entities/profile.entity";
import {InquiryPaginatedProfilesDto} from "./dto/inquiry-paginated-profiles.dto";
import {PaginationDto} from "./dto/pagination.dto";

@Injectable()
export class ProfilesService {
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>;

    async create(createProfileDto: CreateProfileDto): Promise<Profile> {
        const newProfile = await this.profileRepository.create(createProfileDto);
        return await this.profileRepository.save(newProfile);
    }

    async findAll(paginationDto: PaginationDto): Promise<InquiryPaginatedProfilesDto> {
        const skippedItems = (paginationDto.page - 1) * paginationDto.limit;
        const totalCount = await this.profileRepository.count()
        const products = await this.profileRepository.createQueryBuilder()
            .orderBy('employee_id', "DESC")
            .offset(skippedItems)
            .limit(paginationDto.limit)
            .getMany()
        return {
            totalCount,
            page: paginationDto.page,
            limit: paginationDto.limit,
            data: products,
        }

    }

    async findOne(profile_id: number): Promise<Profile | undefined> {
        return this.profileRepository.findOne(profile_id);
    }

    async update(id: number, updateProfileDto: UpdateProfileDto): Promise<any> {
        return await this.profileRepository.update({id: id}, updateProfileDto);
    }

    async remove(id: number): Promise<Profile> {
        let profile = await this.profileRepository.findOne(id);
        return await this.profileRepository.remove(profile);
    }
}
