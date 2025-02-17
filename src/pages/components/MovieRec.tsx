import { Link } from 'react-router-dom'
import { MoreLikeThisTitleType } from '../../utils/Type'
import { useState } from 'react'

function MovieRec(movie: MoreLikeThisTitleType) {
    const data = movie.node
    const [ hovering, setHovering ] = useState(false)

    return (
        <div 
            key={data.id} 
            className='rounded-lg border-2 border-white w-max bg-cover bg-center relative'
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
        >
            <Link to={`/movies/${data.id}`}>
                <img 
                    src={data.primaryImage?.url || '/error-placeholder.png'} 
                    alt={data.titleText.text} 
                    className={`w-35 ${hovering ? 'brightness-20' : ''}`}
                />
                {
                    hovering && <p className='absolute top-1/2 text-center font-bold break-word px-2'>{data.titleText.text}</p>
                }
            </Link>
        </div>
    )
}

export default MovieRec
