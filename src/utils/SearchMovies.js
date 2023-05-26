import { SHORT_MOVIE_DURATION } from "./ProjectConstants.js";

export default function SearchMovies(movies, isShort, filterString) {
  const filtered = movies.filter((movie) => {
    const nameRU = movie.nameRU.toUpperCase();
    if (isShort && movie.duration > SHORT_MOVIE_DURATION) {
      return false;
    }
    return nameRU.includes(filterString.toUpperCase());
  });
  return filtered;
}
