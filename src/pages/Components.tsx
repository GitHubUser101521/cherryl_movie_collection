import { useEffect, useRef, useState } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { CastEdge, MoreLikeThisTitleType, MovieType, SimpleMovieType } from '../utils/Type'
import { emptyMovieType, fetchMovies } from '../utils/services'
import { useMovieStore } from '../utils/stores/Stores'
import axios from 'axios'
import Swal from 'sweetalert2'

type MoviesBeltProp = {
    header: string,
    caption: string
}

type UserReviewProp = {
    author: {
        nickName: string
    },
    summary: {
        originalText: string
    },
    text: {
        originalText: {
            plainText: string
        }
    },
    authorRating: number,
    submissionDate: string
}

function CastDetails(cast: CastEdge) {
    const navigate = useNavigate()
    useEffect(() => {
        if (!cast) {
            navigate(-1)
        }
    }, [])

    return (
        <div className='flex items-center gap-4'>
            <img 
                src={cast.node.name.primaryImage?.url || "/error-placeholder.png"} 
                alt={cast.node.name.nameText.text}
                className='w-30 aspect-square rounded-full border border-white' 
            />

            <div>
                <h1 className='font-bold text-xl'>{cast.node.name.nameText.text}</h1>
                <div>
                {
                    cast.node.characters.map(c => (
                        <span className='opacity-65'>{c.name} </span>
                    ))
                }
                </div>
            </div>
        </div>
    )
}

function Footer() {
    return (
        <div className='text-center py-12'>
            © 2025 MoviZone. All rights reserved.
        </div>
    )
}

function Header() {
    const navigate = useNavigate()
    const inputRef = useRef<HTMLInputElement>(null)

    const handleQuery = (e: React.FormEvent) => {
        e.preventDefault()

        if (!inputRef.current) return

        navigate(`/query/${inputRef.current.value}`)
    }
    
    return (
        <div className='bg-gray py-8 flex justify-between items-center'>
            <div>
                <Link to='/'>
                    <img src="/movizone-logo.png" alt="MOVIZONE" />
                </Link>
            </div>

            <form 
                className='w-2/4 bg-white flex justify-between rounded-full pl-4 h-fit'
                onSubmit={handleQuery}
            >
                <input 
                    type="text" 
                    placeholder='Search'
                    className='outline-none border-none w-full'
                    ref={inputRef}
                />
                <button
                    type='submit'
                    className='w-36 bg-red  font-bold rounded-full py-2'
                >Search</button>
            </form>

            <div className='flex gap-4 items-center'>
                <img src="/history-icon.png" alt="History" className='w-8 aspect-square'/>

                <a href="https://github.com/GitHubUser101521/cherryl_movie_collection">
                    <img 
                        src="/github-logo.png" 
                        alt="See Github Repo" 
                        className='w-26 bg-white px-4 rounded-full'
                    />
                </a>
            </div>
        </div>
    )
}

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

function MovieRec(movie: MoreLikeThisTitleType) {
    const data = movie.node
    const [ hovering, setHovering ] = useState(false)

    return (
        <div 
            key={data.id} 
            className='rounded-lg border-2 border-white w-max bg-cover bg-center relative'
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
        >
            <Link to={`/movies/${data.id}`}>
                <img 
                    src={data.primaryImage?.url || '/error-placeholder.png'} 
                    alt={data.titleText.text} 
                    className={`w-35 ${hovering ? 'brightness-20' : ''}`}
                />
                {
                    hovering && <p className='absolute top-1/2 text-center font-bold break-word px-2'>{data.titleText.text}</p>
                }
            </Link>
        </div>
    )
}

function MoreLikeThis(movies: MoreLikeThisTitleType[]) {
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

function MovieImage(movie: SimpleMovieType) {
    const [ hovering, setHovering ] = useState(false)

    return (
        <div 
            key={movie.IMDB_ID} 
            className='border border-white flex justify-center items-center relative' 
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
        >
            <Link to={`/movies/${movie.IMDB_ID}`}>
                <img 
                    src={movie.IMG_POSTER} 
                    alt={movie.TITLE} 
                    className={`w-45 h-65 bg-cover ${hovering ? 'brightness-20' : ''}`}
                />
                {
                    hovering && <p className='absolute top-1/2 text-center font-bold break-word px-2'>{movie.TITLE}</p>
                }
            </Link>
        </div>
    )
}

function MoviesBelt({ header, caption }: MoviesBeltProp) {
    const [ movies, setMovies ] = useState<SimpleMovieType[]>()

    useEffect(() => {
        if (!header) return

        fetchMovies(header)
            .then(res => setMovies(res))
    }, [])
    
    return (
        <div className='my-8'>
            <h1 className='text-3xl  font-bold'>{ header }</h1>
            <p className='opacity-55  text-xl mb-6'>{ caption }</p>

            <div className='flex gap-4'>
                {
                    movies && 
                    movies.map(movie => (
                        <MovieImage {...movie} key={movie.IMDB_ID}/>
                    ))
                }
            </div>
        </div>
    )
}

function Overview() {
    const navigate = useNavigate()
    const { movie } = useMovieStore()

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
                <MoreLikeThis {...movie.main.moreLikeThisTitles.edges.slice(0, 6)} />
            </div>
        </>
    )
}

function UserReview({ author, summary, text, authorRating, submissionDate }: UserReviewProp) {
    const [ seeMore, setSeeMore ] = useState(false)

    return (
        <div className="border border-white rounded-lg p-4">
            <div className="flex items-center gap-4 mb-4">
                <img 
                    src="/error-placeholder.png" 
                    className='w-12 h-12 bg-white rounded-full'
                />

                <div>
                    <p className="font-bold">
                        { author.nickName } 
                    </p>
                    <p className="text-xs">{submissionDate}</p>
                </div>
            </div>

            <div>
                <p className="flex mb-2 font-bold text-lg">
                    {summary.originalText}
                    <span className="flex gap-2 items-center ml-4">
                        {authorRating}
                        <img src="/star-icon.png" alt="stars" className="w-4 h-4"/>
                    </span>
                </p>
                
                <>
                    { text.originalText.plainText &&
                        <div onClick={() => setSeeMore(!seeMore)}>
                            {
                                !seeMore ?
                                <span>
                                    {text.originalText.plainText.slice(0, 499)}
                                </span>
                                :
                                <span>
                                    {text.originalText.plainText}
                                </span>
                            }
                            {
                                text.originalText.plainText.length < 499 ?
                                <></>
                                :
                                <span className="opacity-65 ml-2 cursor-pointer">{ seeMore ? 'Close' : '... See more' }</span>
                            }
                        </div>
                    }
                </>
            </div>
        </div>
    )
}

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

export { Footer, Header, MovieImage, MoreLikeThis, Hero, MoviesBelt, Overview, Reviews, MovieRec, Search, CastDetails}