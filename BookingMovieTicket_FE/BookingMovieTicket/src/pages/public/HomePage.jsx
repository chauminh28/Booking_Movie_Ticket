import React from "react";
import Header from "../../components/layouts/Header";
import Banner from "../../components/layouts/Banner";
import Footer from "../../components/layouts/Footer";
import MovieList from "../../components/features/MovieList";
import MovieSchedule from "../../components/features/MovieSchedule";

function HomePage() {
  return (
    <div>
      <Header />
      <Banner />
      <MovieList />
      <MovieSchedule />
      <Footer />
    </div>
  );
}

export default HomePage;
