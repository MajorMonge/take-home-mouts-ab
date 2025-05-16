import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserEntity implements User {
    @ApiProperty({
        description: 'The unique identifier of the user',
        example: '1',
        required: false,
    })
    id: string;

    @ApiProperty({
        description: 'The name of the user',
        example: 'John Doe',
        required: false,
    })
    name: string;

    @ApiProperty({
        description: 'The email of the user',
        example: 'john@domain.com',
        required: false,
    })
    email: string;

    @ApiProperty({
        description: 'The job title of the user',
        example: 'Software Engineer',
        required: false,
    })
    job: string;

    @ApiProperty({
        description: 'The date and time when the user was created',
        example: '2023-10-01T12:00:00Z',
        required: false,
    })
    createdAt: Date;

    @ApiProperty({
        description: 'The date and time when the user was last updated',
        example: '2023-10-01T12:00:00Z',
        required: false,
    })
    updatedAt: Date;
}
