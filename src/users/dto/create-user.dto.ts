import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsBoolean, IsOptional } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({
        description: 'First name of the user',
        example: 'John',
    })
    @IsString()
    firstName: string;

    @ApiProperty({
        description: 'Last name of the user',
        example: 'Doe',
    })
    @IsString()
    lastName: string;

    @ApiProperty({
        description: 'Email of the user',
        example: 'john.doe@example.com',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Gender of the user',
        example: 'male',
    })
    @IsString()
    gender: string;
}
