import React from 'react'
import Header from "../../components/layouts/Header"
import Footer from "../../components/layouts/Footer"
import MovieList from '../../components/features/MovieList'

function MoviePage() {
    return (
        <>
            <div>
                <Header />
                <div className='container mx-auto mb-8'>
                    <p className="text-[#031327] text-2xl font-bold">
                        {" "}
                        <span className="mr-2 border-l-4 border-l-[#031327]" />
                        PHIM
                    </p>
                </div>
                <MovieList />
                <Footer />
            </div>
        </>
    )
}

export default MoviePage