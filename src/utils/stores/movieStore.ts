import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware';
import { MovieType } from '../Type';
import { emptyMovieType } from '../services';

type MovieStoreType = {
    movie: MovieType,
    setMovie: (newState: MovieType) => void
}

const useMovieStore = create<MovieStoreType>()(
    persist(
        (set) => ({
            movie: emptyMovieType,
            setMovie: (newState => set({ movie: newState })),
        }),
        {
            name: 'movie-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useMovieStore
  