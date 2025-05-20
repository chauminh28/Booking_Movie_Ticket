import React from 'react'
import Header from "../../components/layouts/Header"
import Footer from "../../components/layouts/Footer"
import MovieSchedule from '../../components/features/MovieSchedule'

function MovieSchedulePage() {
    return (
        <>
            <div>
                <Header />
                <MovieSchedule />
                <Footer />
            </div>
        </>
    )
}

export default MovieSchedulePage