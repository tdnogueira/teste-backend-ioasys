import { Router } from 'express';
import { getRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import Movie from '../models/Movie';

import CreateMovieService from '../services/CreateMovieService';
import RatingMovieService from '../services/RatingMovieService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const moviesRouter = Router();

moviesRouter.use(ensureAuthenticated);

moviesRouter.get('/', async (request, response) => {
    const moviesRepository = getRepository(Movie);

    const movies = await moviesRepository.find();

    return response.json(movies);
});

moviesRouter.post('/', async (request, response) => {
    try {
        const createMovie = new CreateMovieService();

        const {
            email,
            title,
            director,
            gender,
            stars,
            description,
            date,
        } = request.body;

        const parsedDate = parseISO(date);

        const movie = await createMovie.execute({
            email,
            title,
            director,
            gender,
            stars,
            description,
            date: parsedDate,
        });

        return response.json(movie);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

moviesRouter.patch('/rate', async (request, response) => {
    try {
        const updateMovieRate = new RatingMovieService();

        const { title, rate } = request.body;

        const movie = await updateMovieRate.execute({
            title,
            rate,
        });

        return response.json(movie);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
export default moviesRouter;
