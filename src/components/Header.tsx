import SearchBar from './SearchBar'
import { Link } from 'react-router-dom'

function Header() {
  return (
        <div className='bg-gray py-8 flex justify-between items-center'>
            <div>
                <Link to='/'>
                    <img src="/movizone-logo.png" alt="MOVIZONE" />
                </Link>
            </div>

            <SearchBar />

            <div>
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
