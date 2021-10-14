import {IsDate, IsEmail, IsNotEmpty} from "class-validator";

export class CreateProfileDto {
    @IsNotEmpty()
    employee_id: string;

    @IsEmail()
    @IsNotEmpty()
    official_email:string;

    @IsEmail()
    private_email:string;

    @IsNotEmpty()
    first_name:string;

    @IsNotEmpty()
    last_name:string;

    @IsDate()
    dob:Date;
}
