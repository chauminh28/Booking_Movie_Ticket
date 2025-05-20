import React from 'react'
import Header from "../../components/layouts/Header"
import Footer from "../../components/layouts/Footer"
import MovieDetail from "../../components/features/MovieDetail"

function MovieDetailPage() {
    return (
        <>
            <div>
                <Header />
                <MovieDetail />
                <Footer />
            </div>
        </>
    )
}

export default MovieDetailPage