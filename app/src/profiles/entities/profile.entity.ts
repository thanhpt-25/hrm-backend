import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Gender } from '../enums/Gender';
import { MaritalStatus } from '../enums/MaritalStatus';

@Entity({ name: 'profiles' })
export class Profile {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true, nullable: false })
  public employee_id: string;

  @Column({ unique: true, nullable: false })
  public official_email: string;

  @Column({ unique: true, nullable: true })
  public private_email: string;

  @Column({ nullable: true })
  public avatar: string;

  @Column({ nullable: false, length: 50 })
  public first_name: string;

  @Column({ nullable: false, length: 50 })
  public last_name: string;

  @Column({ nullable: false, type: 'date' })
  public dob: Date;

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.Male,
    nullable: true,
  })
  public gender: Gender;
  @Column({
    type: 'enum',
    enum: MaritalStatus,
    default: MaritalStatus.Single,
    nullable: true,
  })
  public marital_status: MaritalStatus;

  @Column({ nullable: true })
  public permanent_address: string;

  @Column({ nullable: true })
  public temporary_address: string;

  @Column({ nullable: true, length: 15 })
  public home_phone: string;

  @Column({ nullable: true, length: 15 })
  public mobile_phone: string;

  @Column({ nullable: true, length: 15 })
  public passport_num: string;

  @Column({
    nullable: true,
    length: 20,
    comment: 'National Identification Number',
  })
  public nin_num: string;

  @Column({
    nullable: true,
    type: 'date',
    comment: 'National Identification card issued date',
  })
  public nin_card_issued_date: Date;

  @Column({
    nullable: true,
    comment: 'National Identification card issued place',
  })
  public nin_card_issued_place: string;

  @Column({ nullable: true, length: 30, comment: 'Social Insurance Number' })
  public sin_num: string;

  @Column({ nullable: true, length: 15 })
  public driving_license: string;

  @Column({ nullable: true, length: 15 })
  public vehicle_number_plate: string;

  @Column({ nullable: true, length: 15 })
  public vehicle_ticket: string;
}
