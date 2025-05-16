import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { describe, it, beforeAll, afterAll, expect, beforeEach } from '@jest/globals';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/providers/prisma/prisma.service';

describe('UsersController (e2e)', () => {
    let app: INestApplication;
    let prismaService: PrismaService;
    let userId: string;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication() as INestApplication;
        prismaService = app.get<PrismaService>(PrismaService);

        prismaService.enableShutdownHooks(app);

        await app.init();

        try {
            await prismaService.user.deleteMany({});
        } catch (error) {
            console.error('Error cleaning database:', error);
        }
    });

    afterAll(async () => {
        try {
            await prismaService.user.deleteMany({});
        } catch (error) {
            console.error('Error cleaning database:', error);
        }

        await prismaService.$disconnect();
        await app.close();
    });

    describe('POST /users', () => {
        it('should create a new user', async () => {
            const newUser = {
                name: 'Test User',
                email: 'test@example.com',
                job: 'Test Engineer'
            };

            const response = await request(app.getHttpServer())
                .post('/users')
                .send(newUser)
                .expect(201);

            expect(response.body).toHaveProperty('id');
            expect(response.body.name).toBe(newUser.name);
            expect(response.body.email).toBe(newUser.email);
            expect(response.body.job).toBe(newUser.job);

            userId = response.body.id;
        });

        it('should not create a user with duplicate email', async () => {
            const duplicateUser = {
                name: 'Another User',
                email: 'test@example.com', 
                job: 'Duplicate Tester'
            };

            await request(app.getHttpServer())
                .post('/users')
                .send(duplicateUser)
                .expect(409); 
        });
    });

    describe('GET /users', () => {
        it('should return all users', async () => {
            const response = await request(app.getHttpServer())
                .get('/users')
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
        });
    });

    describe('GET /users/:id', () => {
        it('should return a user by id', async () => {
            const response = await request(app.getHttpServer())
                .get(`/users/${userId}`)
                .expect(200);

            expect(response.body).toHaveProperty('id', userId);
            expect(response.body.name).toBe('Test User');
            expect(response.body.email).toBe('test@example.com');
        });

        it('should return 404 for non-existent user', async () => {
            await request(app.getHttpServer())
                .get('/users/non-existent-id')
                .expect(404);
        });
    });

    describe('PUT /users/:id', () => {
        it('should update a user', async () => {
            const updateData = {
                name: 'Updated User',
                job: 'Senior Test Engineer'
            };

            const response = await request(app.getHttpServer())
                .put(`/users/${userId}`)
                .send(updateData)
                .expect(200);

            expect(response.body).toHaveProperty('id', userId);
            expect(response.body.name).toBe(updateData.name);
            expect(response.body.job).toBe(updateData.job);
            
            expect(response.body.email).toBe('test@example.com');
        });

        it('should return 404 when updating non-existent user', async () => {
            await request(app.getHttpServer())
                .put('/users/non-existent-id')
                .send({ name: 'Nobody' })
                .expect(404);
        });
    });

    describe('DELETE /users/:id', () => {
        it('should delete a user', async () => {
            await request(app.getHttpServer())
                .delete(`/users/${userId}`)
                .expect(204);

            await request(app.getHttpServer())
                .get(`/users/${userId}`)
                .expect(404);
        });

        it('should return 404 when deleting non-existent user', async () => {
            await request(app.getHttpServer())
                .delete('/users/non-existent-id')
                .expect(404);
        });
    });
});