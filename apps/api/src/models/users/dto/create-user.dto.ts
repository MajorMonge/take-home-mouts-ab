
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({
        description: 'The name of the user',
        example: 'John Doe',
    })
    name: string;

    @ApiProperty({
        description: 'The email of the user',
        example: 'john@domain.com',
    })
    email: string;

    @ApiProperty({
        description: 'The job title of the user',
        example: 'Software Engineer',
        required: false,
    })
    job?: string;
}
