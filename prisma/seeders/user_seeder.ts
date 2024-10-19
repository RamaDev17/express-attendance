import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import inquirer from 'inquirer';

export const UserSeeder = async ({ prisma }: { prisma: PrismaClient }) => {
    console.log('Start User Seeder');

    const checkUserSuperAdmin = await prisma.user.findFirst({
        where: {
            role: 'super_admin'
        }
    })

    if (checkUserSuperAdmin) {
        console.log('User super_admin already exists');
        return;
    }
    
    const hashedPassword = await bcrypt.hash('linux', 10);
    await prisma.user.create({
        data: {
            name: 'super_admin',
            email: 'super_admin@localhost',
            password: hashedPassword,
            role: 'super_admin'
        },
    });
    console.log('End User Seeder');
};
