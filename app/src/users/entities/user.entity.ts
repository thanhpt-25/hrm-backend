import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, Unique } from 'typeorm';

@Entity({name:'users'})
export class User{
    @PrimaryColumn()
    id: number;

    @Column({unique:true})
    email: string;

    @Column()
    password?: string;
}