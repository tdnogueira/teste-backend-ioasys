/*  */
import { getRepository } from 'typeorm';

import Movie from '../models/Movie';

interface Request {
    title: string;
    rate: number;
}

interface MovieRequest {
    MovieRate: number;
    MovieRating: number;
}

class RatingMovieService {
    public async execute({ title, rate }: Request): Promise<Movie> {
        const moviesRepository = getRepository(Movie);

        const movie = await moviesRepository.findOne({
            where: { title },
        });

        if (!movie) {
            throw Error('Movie does not exists');
        }

        if (rate < 0 || rate > 4) {
            throw Error('Rate out of range');
        }

        movie.ratings += 1;

        movie.rate = parseInt(movie.rate) + parseInt(rate);

        movie.rate = parseInt(movie.rate) / parseInt(movie.ratings);

        console.log(rate);

        await moviesRepository.save(movie);

        return movie;
    }
}

export default RatingMovieService;
