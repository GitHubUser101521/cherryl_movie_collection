import {} from 'react'
import { useMovieStore } from '../../utils/stores/Stores'
import UserReview from './UserReview'

function Reviews() {
    const { movie } = useMovieStore()

    return (
        <>
            { movie.top.featuredReviews?.edges.length < 1 && 
                <>
                    <h1>No review yet.</h1>
                </>
            }


            <>
            {
                movie.top.featuredReviews?.edges.map(r => (
                    <UserReview key={r.node.author.nickName} {...r.node}/>
                ))
            }
            </>
        </>
    )
}

export default Reviews
