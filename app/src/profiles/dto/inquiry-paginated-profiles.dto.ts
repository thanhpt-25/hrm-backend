import { Profile } from '../entities/profile.entity';

export class InquiryPaginatedProfilesDto {
  data: Profile[];
  page: number;
  limit: number;
  totalCount: number;
}
