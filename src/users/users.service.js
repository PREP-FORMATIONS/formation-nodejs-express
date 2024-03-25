const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const taskService = require('../tasks/tasks.service');

const getAllUsers =  () => {
    return prisma.users.findMany();
};

const getUserById = async (userId) => {
    const user = await prisma.users.findUnique({
        where: { id: userId },
    });
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

const createUser = (userData) => {
    return prisma.users.create({
        data: userData,
    });
};

const updateUser = async (userId, userData) => {
    const user = await prisma.users.findUnique({
        where: { id: userId },
    });
    if (!user) {
        throw new Error('User not found');
    }
    return prisma.users.update({
        where: { id: userId },
        data: { ...userData, updated_at: new Date() },
    });
};

const deleteUser = async (userId) => {
    const user = await prisma.users.findUnique({
        where: { id: userId },
    });
    if (!user) {
        throw new Error('User not found');
    }
    await prisma.users.delete({
        where: { id: userId },
    });
    await taskService.updateTasksUserIdToNull(userId);
    return true;
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};