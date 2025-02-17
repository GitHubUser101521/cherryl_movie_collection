import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { MoreLikeThis } from './Components'
import useMovieStore from '../../utils/stores/movieStore'
import { useEffect } from 'react'

function Overview() {
    const { movie } = useMovieStore()
    const navigate = useNavigate()

    useEffect(() => {
        if (!movie) {
            navigate('/')
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            })
            return
        }

    }, [])
    
    return (
        <>
            <p>
                {movie.top.plot.plotText?.plainText.length > 253 ? 
                    <span 
                        onClick={() => Swal.fire({ text: movie.top.plot.plotText?.plainText })}
                    >
                        {movie.top.plot.plotText?.plainText.slice(0, 250)}...
                    </span> 
                    : 
                    movie.top.plot.plotText?.plainText
                }
            </p>
                        
            <div className='flex gap-8 mt-6'>
                <div className='flex flex-col gap-2 justify-between h-1/6'>
                    <p className='font-bold opacity-35'>Starring</p>
                    <p className='font-bold opacity-35'>Directed by</p>
                    <p className='font-bold opacity-35'>Genres</p>
                </div>

                <div className='flex flex-col gap-2 justify-between h-1/6'>
                    <p>
                    {
                        <>
                            {
                                movie.main.cast.edges.length >= 5 ?
                                <>
                                    {
                                        movie.main.cast.edges.slice(0, 4).map(c => (
                                            <span key={c.node.name.id}>
                                                {`${c.node.name.nameText.text}, `}
                                            </span>
                                        ))
                                    }
                                    {movie.main.cast.edges[5].node.name.nameText.text} 
                                    <Link to={`/movies/${movie.imdbId}/casts`}>
                                    <span className='opacity-50 ml-2 underline'>
                                        {movie.main.cast.edges.length > 5 ? `See more (${movie.main.cast.edges.length - 5})` : null}
                                    </span>
                                    </Link>
                                </>
                                :
                                <>
                                    N/A
                                </>                                    
                            }
                        </>
                    }
                    </p>

                    <p>
                    { !(movie.main.directors[0]?.credits.length >= 1) && 'N/A' }
                    {
                        movie.main.directors[0]?.credits.slice(0, movie.main.directors[0]?.credits.length - 1).map(d => (
                            <>
                                <span key={d.name.id}>
                                    {`${d.name.nameText.text}, `}
                                </span>
                            </>
                        ))
                    }
                    <span>
                    {
                        movie.main.directors[0]?.credits[movie.main.directors[0]?.credits.length - 1] ?
                        <>
                            {movie.main.directors[0]?.credits[movie.main.directors[0]?.credits.length - 1].name.nameText.text}
                        </>
                        :
                        ''
                    }
                    </span>
                    </p>

                    <p>
                    { !movie.top.genres.genres.length && 'N/A' }
                    {
                        movie.top.genres.genres.slice(0, movie.top.genres.genres.length - 1).map(g => (
                            <span key={g.id}>
                                {`${g.text}, `}
                            </span>
                        ))
                    }
                    <span>
                    {
                        movie.top.genres.genres[movie.top.genres.genres.length - 1] ?
                        <span>
                            {movie.top.genres.genres[movie.top.genres.genres.length - 1].text}
                        </span>
                        :
                        ''
                    }
                    </span>
                    </p>
                </div>
            </div>

            <div style={{ gridArea: '4 / 3 / 6 / 7' }}>
                <MoreLikeThis movies={movie.main.moreLikeThisTitles.edges.slice(0, 6)} />
            </div>
        </>
    )
}

export default Overview
