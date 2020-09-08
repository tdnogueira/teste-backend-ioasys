import { getRepository } from 'typeorm';
import User from '../models/User';

interface Request {
    user_id: string;
    admin: boolean;
}

class UpdateUserTypeService {
    public async execute({ user_id, admin }: Request): Promise<User> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne(user_id);

        if (!user) {
            throw new Error('Only authenticated users can change the status');
        }

        if (user.admin === false) {
            throw new Error('Only Admin can change user type');
        }

        user.admin = admin;

        await usersRepository.save(user);

        return user;
    }
}

export default UpdateUserTypeService;
