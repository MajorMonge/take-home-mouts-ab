import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const users = [
        {
            name: 'Alice',
            email: 'alice@goodemail.com',
            job: 'Software Engineer',
        },
        {
            name: 'Bob',
            email: 'superbob@earthmail.earth',
            job: 'Product Manager',
        },
    ];

    await prisma.user.createMany({
        data: users,
        skipDuplicates: true,
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

