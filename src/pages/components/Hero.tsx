import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import Header from './Header'
import { MovieType } from '../../utils/Type'
import { emptyMovieType } from '../../utils/services'

function Hero() {
    const [ heroMovie, setHeroMovie ] = useState<MovieType>(emptyMovieType)    

    useEffect(() => {
        const fetchHeroMovie = async () => {
            try {
                await axios.get('https://imdb.iamidiotareyoutoo.com/search?tt=tt8391976')
                    .then(res => setHeroMovie(res.data))                
            } catch (err) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    footer: 'Try refreshing the page'
                })
            }
        }

        fetchHeroMovie()
    }, [])

    return (
        <>
            <Header />

            <div className='flex justify-between items-center mx-30 mb-12'>
                <img 
                    src={heroMovie.short.image || '/error-placeholder.png'}
                    alt="BUNGOU STRAY DOGS: DEAD APPLE" 
                    className='w-1/5'
                />

                <div className='py-12  text-right'>
                    <h1 className='opacity-60 font-semibold text-xl mb-8'>FEATURED THIS YEAR</h1>
                    <h1 className=' text-4xl font-bold mb-2'>{heroMovie.short.name}</h1>
                    <p className='opacity-70'>{heroMovie.top.plot.plotText.plainText}</p>

                    <div className='flex items-center gap-2 justify-end mt-2'>
                        {heroMovie.top.ratingsSummary.aggregateRating}
                        <img src="/star-icon.png" alt="Stars" className='w-8 aspect-square'/>
                    </div>

                    <a href={heroMovie.short.trailer.embedUrl} target='blank' rel="noopener noreferrer">
                        <button className='w-36 bg-red  font-bold rounded-full py-2 mt-8'>See Trailer</button>
                    </a>
                </div>
            </div>
        </>
    )
}

export default Hero
