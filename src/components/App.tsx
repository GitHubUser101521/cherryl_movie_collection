import {} from 'react'
import Hero from './Hero'
import MoviesBelt from './MoviesBelt'
import Footer from './Footer'

function App() {
    const headers = [
        {
            header: 'Anime',
            caption: 'Newest Release'
        },
        {
            header: 'Disney',
            caption: 'Feeling a little princessy?'
        },
        {
            header: 'Love',
            caption: 'Everyone romancing these days'
        },
        {
            header: 'Comedy',
            caption: "Lives already clowning, why not add a little humor?"
        },
        {
            header: 'Action',
            caption: 'Call an ambulance, but not for me 😎'
        }
    ]

    return (
        <div>
            <Hero />
            <hr className='border-b-2 border-white rounded-full'/>

            {
                headers.map(header => (
                    <MoviesBelt { ...header } key={header.header}/>
                ))
            }

            <Footer />
        </div>
    )
}

export default App
