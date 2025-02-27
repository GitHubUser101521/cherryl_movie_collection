import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Header() {
    const inputRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()

    const handleQuery = (e: React.FormEvent) => {
        e.preventDefault()

        if (!inputRef.current?.value) return

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

export default Header
