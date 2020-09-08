import { getRepository } from 'typeorm';

import User from '../models/User';
import Movie from '../models/Movie';

interface Request {
    email: string;
    title: string;
    director: string;
    gender: string;
    stars: string;
    description: string;
    date: Date;
}

class CreateMovieService {
    public async execute({
        email,
        title,
        director,
        gender,
        stars,
        description,
        date,
    }: Request): Promise<Movie> {
        const moviesRepository = getRepository(Movie);

        const checkMovieExists = await moviesRepository.findOne({
            where: { title },
        });

        if (checkMovieExists) {
            throw Error('Title already exists');
        }

        const usersRepository = getRepository(User);

        const userAdmin = await usersRepository.findOne({
            where: { email, admin: true },
        });

        if (!userAdmin) {
            throw new Error('Only admin can add new movies');
        }

        const movie = moviesRepository.create({
            title,
            director,
            gender,
            stars,
            description,
            date,
        });

        await moviesRepository.save(movie);

        return movie;
    }
}

export default CreateMovieService;
