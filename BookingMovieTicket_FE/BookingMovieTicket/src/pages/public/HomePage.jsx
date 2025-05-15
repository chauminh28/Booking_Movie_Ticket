import React from "react";
import Header from "../../components/layouts/Header";
import Banner from "../../components/layouts/Banner";
import Footer from "../../components/layouts/Footer";
import MovieList from "../../components/features/MovieList";

function HomePage() {
  return (
    <div>
      <Header />
      <Banner />
      <MovieList />
      <Footer />
    </div>
  );
}

export default HomePage;
