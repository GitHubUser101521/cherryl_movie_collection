import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

function SearchBar() {
    const inputRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()

    const handleQuery = (e: React.FormEvent) => {
        e.preventDefault()

        if (!inputRef.current) return

        navigate(`/query/${inputRef.current.value}`)
    }

    return (
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
    )
}

export default SearchBar
