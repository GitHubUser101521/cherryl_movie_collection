import { SimpleMovieType } from '../utils/Type'
import { Link } from 'react-router-dom'

function MovieImage(movie: SimpleMovieType) {
  return (
    <div key={movie.IMDB_ID} className='border border-white'>
        <Link to={`/movies/${movie.IMDB_ID}`}>
            <img 
                src={movie.IMG_POSTER} 
                alt={movie.TITLE} 
                className='w-45 h-65 bg-cover'
            />
        </Link>
    </div>
  )
}

export default MovieImage
