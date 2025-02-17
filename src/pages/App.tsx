import { Hero, MoviesBelt, Footer } from './components/Components'

function App() {
    const headers = [
        {
            header: 'Animation',
            caption: 'Quite Popular'
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
