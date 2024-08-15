import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsBoolean } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({
        description: 'Status of the user (active or inactive)',
        example: true,
        default: true,
        required: false,
    })
    @IsOptional()
    @IsBoolean()
    status?: boolean = true;
}
