import { MoreLikeThisTitleType } from '../../utils/Type'
import { MovieRec } from '../components/Components'

type prop = {
    movies: MoreLikeThisTitleType[];
}

function MoreLikeThis({ movies }: prop) {
    if (!(movies.length >= 1)) return
    
    return (
        <>
            <p className='text-2xl font-bold mt-6'>More Like This</p>
            <div className='flex gap-2 mt-2'>
            {
                movies.map(movie => (
                    <MovieRec {...movie} key={movie.node.id}/>
                ))
            }
            </div>
            
        </>
    )
}

export default MoreLikeThis
