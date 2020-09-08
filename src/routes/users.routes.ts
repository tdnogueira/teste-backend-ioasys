import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UpdateUserStatusService from '../services/UpdateUserStatusService';
import UpdateUserTypeService from '../services/UpdateUserTypeService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
    try {
        const { name, email, password } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            password,
        });

        delete user.password;

        return response.json(user);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

usersRouter.patch('/status', ensureAuthenticated, async (request, response) => {
    try {
        const updateUserStatus = new UpdateUserStatusService();

        const { active } = request.body;

        const user = await updateUserStatus.execute({
            user_id: request.user.id,
            active,
        });

        delete user.password;

        return response.json(user);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

usersRouter.patch('/types', ensureAuthenticated, async (request, response) => {
    try {
        const updateUserType = new UpdateUserTypeService();

        const { admin } = request.body;

        const user = await updateUserType.execute({
            user_id: request.user.id,
            admin,
        });

        delete user.password;

        return response.json(user);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default usersRouter;
