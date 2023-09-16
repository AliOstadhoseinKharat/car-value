import { IsString, IsOptional, IsBoolean, IsEmail } from 'class-validator'


export class UpdateUserDto {
    @IsString()
    @IsOptional()
    firstName: string;

    @IsString()
    @IsOptional()
    lastName: string;

    @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    password: string;

    @IsBoolean()
    @IsOptional()
    isActive: boolean;
}