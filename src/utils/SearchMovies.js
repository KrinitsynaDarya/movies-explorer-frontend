export default function SearchMovies(movies, isShort, filterString) {
  const filtered = movies.filter((movie) => {
    const nameRU = movie.nameRU.toUpperCase();
    if (isShort && movie.duration > 40) {
      return false;
    }
    return nameRU.includes(filterString.toUpperCase());
  });
  return filtered;
}
