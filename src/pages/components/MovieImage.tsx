import { useState } from 'react'
import { SimpleMovieType } from '../../utils/Type'
import { Link } from 'react-router-dom'

function MovieImage(movie: SimpleMovieType) {
    const [ hovering, setHovering ] = useState(false)

    return (
        <div 
            key={movie.IMDB_ID} 
            className='border border-white flex justify-center items-center relative' 
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
        >
            <Link to={`/movies/${movie.IMDB_ID}`}>
                <img 
                    src={movie.IMG_POSTER} 
                    alt={movie.TITLE} 
                    className={`w-45 h-65 bg-cover ${hovering ? 'brightness-20' : ''}`}
                />
                {
                    hovering && <p className='absolute top-1/2 text-center font-bold break-word px-2'>{movie.TITLE}</p>
                }
            </Link>
        </div>
    )
}

export default MovieImage
