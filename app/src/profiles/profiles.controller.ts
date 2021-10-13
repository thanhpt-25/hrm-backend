import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    NotFoundException
} from '@nestjs/common';
import {ProfilesService} from './profiles.service';
import {CreateProfileDto} from './dto/create-profile.dto';
import {UpdateProfileDto} from './dto/update-profile.dto';
import {ThrottlerGuard} from "@nestjs/throttler";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

@Controller('profiles')
export class ProfilesController {
    constructor(private readonly service: ProfilesService) {
    }

    @Post()
    create(@Body() createProfileDto: CreateProfileDto) {
        return this.service.create(createProfileDto);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @UseGuards(ThrottlerGuard)
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: number) {
        let profile = await this.service.findOne(+id);
        if (!profile)
            throw new NotFoundException(
                {key: 'messages.MSG_PROFILE_ID_NOT_FOUND', args: {id: id}},
            );
        else return profile;
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
        return this.service.update(+id, updateProfileDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(+id);
    }
}
