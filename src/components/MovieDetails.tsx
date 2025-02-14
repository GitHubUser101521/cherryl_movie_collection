import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MovieType } from '../utils/Type'
import { fetchMovieDetails } from '../utils/services'
import Header from './Header'

function MovieDetails() {
    const { movieId } = useParams()
    const [ movie, setMovie ] = useState<MovieType>({
        short: {
            url: '',
            name: '',
            image: '',
            review: {
                author: '',
                dateCreated: '',
                name: '',
                reviewBody: '',
                reviewRating: {
                    ratingValue: ''
                }
            },
            trailer: {
                embedUrl: ''
            },
        },
        top: {
            categories: [],
            releaseDate: {
                day: 0,
                month: 0,
                year: 0
            },
            runtime: {
                seconds: 0
            },
            ratingsSummary: {
                aggregateRating: 0,
                voteCount: 0
            },
            isAdult: false,
            genres: {
                genres: []
            },
            plot: {
                plotText: {
                    plainText: ''
                }
            }
        },
        main: {
            moreLikeThisTitles: {
                edges: []
            },
            cast: {
                total: 0,
                edges: []
            },
            directors: [
                {
                    totalCredits: 0,
                    credits: []
                }
            ],
            writers: [
                {
                    totalCredits: 0,
                    credits: []
                }
            ] 
        }
    })

    useEffect(() => {
        if (!movieId) return

        fetchMovieDetails(movieId)
            .then(res => setMovie(res))

    }, [])

    return (
        <>
            <Header />
            {
                movie ?
                <div className='movie-details-grid'>
                    <div style={{ gridArea: '1 / 1 / 6 / 3' }} className='w-90 h-80'>
                        <img src={movie.short.image} alt={movie.short.name} />
                    </div>

                    <div style={{ gridArea: '1 / 3 / 2 / 7' }} className='flex justify-between'>
                        <div className='flex flex-col justify-center'>
                            <h1 className='text-3xl  font-bold'>{movie.short.name}</h1>
                            <p className='text-lg  opacity-55'><span>{movie.top.releaseDate.year}  |  {movie.top.runtime.seconds ? (movie.top.runtime.seconds / 3600).toFixed(2) : ''} hr</span></p>
                        </div>

                        <div className='flex items-center gap-2'>
                            <span className=' text-xl font-bold'>{movie.top.ratingsSummary.aggregateRating.toFixed(1)}</span> 
                            <div>
                                <img src="/star-icon.png" alt="Stars" className='w-8 aspect-square'/>
                            </div>
                        </div>
                    </div>

                    <div style={{ gridArea: '2 / 3 / 4 / 7' }}>
                        <p className='text-2xl  font-bold'>Overview</p>

                        <div>
                            <p>{movie.top.plot.plotText.plainText}</p>
                            <div className='my-8 flex flex-col gap-4'>
                                <div className='flex gap-8'>
                                    <p className='font-bold opacity-35'>Starring</p>
                                    <div>
                                        {
                                            movie.main.cast.edges.slice(0, 3).map(cast => (
                                                <span 
                                                    key={cast.node.name.id}
                                                >{cast.node.name.nameText.text}, </span>
                                            ))
                                        }
                                        
                                        {
                                            movie.main.cast.total > 3 ?
                                            <>
                                                <Link to={`/movies/${movieId}/casts`}>
                                                    <span className='underline opacity-25 cursor-pointer'>See more{`(${movie.main.cast.total - 3})`}</span>
                                                </Link>
                                            </>
                                            :
                                            <></>
                                        }
                                    </div>
                                </div>

                                <div className='flex gap-8'>
                                    <p className='font-bold opacity-35'>Directed by</p>
                                    <div>
                                        {
                                            movie.main.directors[0].credits.slice(0, 3).map(d => (
                                                <span 
                                                    key={d.name.id}
                                                >{d.name.nameText.text}</span>
                                            ))
                                        }
                                    </div>
                                </div>

                                <div className='flex gap-8'>
                                    <p className='font-bold opacity-35'>Genre</p>
                                    <div>
                                        {
                                            movie.top.genres.genres.slice(0, 6).map(g => (
                                                <span 
                                                    key={g.id}
                                                >{g.text}, </span>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <>
                    <h1 className='text-4xl  font-bold'>Loading...</h1>
                </>
            }
        </>
    )
}

export default MovieDetails
