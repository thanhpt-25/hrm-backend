import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, Unique } from 'typeorm';

@Entity({name:'users'})
@Unique(['email'])
export default class User{
    @PrimaryColumn()
    id: number;

    @Column()
    email: string;
}