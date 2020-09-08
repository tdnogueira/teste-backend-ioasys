import { getRepository } from 'typeorm';
import User from '../models/User';

interface Request {
    user_id: string;
    active: boolean;
}

class UpdateUserStatusService {
    public async execute({ user_id, active }: Request): Promise<User> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne(user_id);

        if (!user) {
            throw new Error('Only authenticated users can change the status');
        }

        if (user.active === false) {
            throw new Error('User inactive, please contact system admin');
        }

        user.active = active;

        await usersRepository.save(user);

        return user;
    }
}

export default UpdateUserStatusService;
