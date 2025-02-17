import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchMovieDetails } from '../utils/services'
import Header from './components/Header'
import CastDetails from './components/CastDetails'
import Footer from './components/Footer'
import { useMovieStore } from '../utils/stores/Stores'

function Casts() {
    const { movieId } = useParams()
    const { movie, setMovie } = useMovieStore()
    const { edges } = movie.main.cast

    useEffect(() => {
        console.log(movieId)
        if (!movieId) return

        fetchMovieDetails(movieId)
            .then(res => setMovie(res))
    }, [])

    return (
        <div>
            <Header />

            <h1 className='font-bold text-3xl'>Top Casts from <span className='italic'>{movie.short.name}</span> {`(${movie.main.cast.edges.length})`}</h1>
            <hr className='mt-4 w-1/2'/>

            <div className='mt-8 mb-20 grid grid-cols-3 gap-12'>
            {
                edges.map(c => (
                    <CastDetails {...c} key={c.node.name.id}/>
                ))
            }
            </div>

            <Footer />
        </div>
    )
}

export default Casts
