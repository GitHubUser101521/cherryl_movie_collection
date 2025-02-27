import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { convertDuration, convertTitle, fetchMovieDetails } from '../utils/services'
import { Header, Overview, Reviews } from './components/Components'
import { useMovieStore } from '../utils/stores/Stores'

function MovieDetails() {
    const { movieId } = useParams()
    const { movie, setMovie } = useMovieStore()
    const tabs = ['Overview', 'Reviews'];
    const [currentTab, setCurrentTab] = useState('Overview');
    const navigate = useNavigate()

    useEffect(() => {
        if (!movieId || movieId.slice(0,2) !== 'tt' || movieId.length >= 2) {
            navigate('/error')
            return
        }

        fetchMovieDetails(movieId)
            .then(res => setMovie(res))

    }, [movieId])

    return (
        <>
            <Header />
            <div className='movie-details-grid'>
                {/* MOVIE POSTER */}
                <div style={{ gridArea: '1 / 1 / 6 / 3' }} className='w-90 h-80 flex flex-col items-center'>
                    <img src={movie.short?.image || '/error-placeholder.png'} alt={movie.short?.name} className='relative'/>
                    <Link to={movie.short.trailer?.embedUrl || movie.short.url || "/"} target='_blank'>
                        <button className='bg-red px-6 py-2 text-xl rounded-full border-2 border-white mt-4'>
                        See Trailer
                        </button>
                    </Link>
                </div>

                {/* MOVIE INFOS */}
                <div style={{ gridArea: '1 / 3 / 2 / 7' }} className='flex justify-between'>
                    <div className='flex flex-col justify-center'>
                        <h1 className='text-3xl  font-bold'>{convertTitle(movie.short.name)}</h1>
                        <p className='text-lg  opacity-55'>
                            <span>{movie.top.releaseDate?.year || 'N/A'}  |  { movie.top.runtime?.seconds > 0 ? convertDuration(movie.top.runtime.seconds) : 'N/A'}</span>
                        </p>
                    </div>

                    <div className='flex items-center gap-2'>
                        <span className=' text-xl font-bold'>
                            {movie.top.ratingsSummary.aggregateRating ? movie.top.ratingsSummary.aggregateRating.toFixed(1) : 'N/A'}
                        </span> 
                        <div>
                            <img src="/star-icon.png" alt="Stars" className='w-8 aspect-square'/>
                        </div>
                    </div>
                </div>

                <div style={{ gridArea: '2 / 3 / 4 / 7' }}>
                    <div className="flex gap-8">
                        {tabs.map(tab => (
                            <p
                                className={`text-xl mb-4 cursor-pointer ${currentTab === tab ? 'active-tab' : ''}`}
                                onClick={() => setCurrentTab(tab)}
                                key={tab}
                            >
                                {tab}
                            </p>
                        ))}
                    </div>

                    <div>
                        {currentTab === 'Overview' && <Overview />} 
                        {currentTab === 'Reviews' && <Reviews />}     
                    </div> 
                </div>              
            </div>
        </>
    )
}

export default MovieDetails
