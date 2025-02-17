import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Header, MovieImage } from './Components'
import { fetchMovies } from '../../utils/services'
import { SimpleMovieType } from '../../utils/Type'

function Search() {
    const { query } = useParams()
    const [ movies, setMovies ] = useState<SimpleMovieType[]>()

    useEffect(() => {
        if (!query) return

        fetchMovies(query)
            .then(res => setMovies(res))
    }, [query])

    return (
        <>
            <Header />

            <div>
                <h1 className='text-2xl font-bold'>{`Search result(s) for`} <span className='italic'>{query}</span></h1>
                
                <div className='flex justify-between gap-4 mt-6'>
                {
                    movies?.length ?
                    movies.map(movie => (
                        <MovieImage {...movie} key={movie.IMDB_ID} />
                    ))

                    :

                    <>
                        <h1>No result found</h1>
                        <p>Please make sure there are no typos in you query</p>
                    </>
                }
                </div>
            </div>
        </>
    )
}

export default Search
