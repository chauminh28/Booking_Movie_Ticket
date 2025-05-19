import React from "react";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import ProfileInfo from "../../components/features/ProfileInfo";

function Profile() {
  return (
    <div>
      <Header />
      <ProfileInfo />
      <Footer />
    </div>
  );
}

export default Profile;
