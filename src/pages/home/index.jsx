import React from "react";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { UpCircleOutlined } from "@ant-design/icons";
import Footer from "../../components/Footer";
import "../../style/homePage.css";
import db from "../../firebase/firebase";
import ListStudent from "../student/ListStudent";

function Home(props) {
  const events = db.collection("user");
  const [admin, setAdmin] = useState([]);
  const [showGoToTop, setShowGoToTop] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    events.get().then((querySnapshot) => {
      const tempDoc = [];
      querySnapshot.forEach((doc) => {
        tempDoc.push({ id: doc.id, ...doc.data() });
      });
      setAdmin(tempDoc);
    });
  };

  useEffect(() => {
    const handleGoToTop = () => {
      setShowGoToTop(window.scrollY >= 100);
    };

    window.addEventListener("scroll", handleGoToTop);

    //cleanUp func
    return () => {
      window.removeEventListener('scroll', handleGoToTop)
    }
  });


  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  return (
    <div className="home_page">
      {showGoToTop && (
            <UpCircleOutlined
          style={{
            position: "fixed",
            right: "20px",
            bottom: "30px",
            background: '#fff',
            fontSize: "40px",
            borderRadius: "50%",
            color: "var(--primary-color)",
          }}
          onClick = {goToTop}
        />
      )}

      <div className="flex">
        <Header getData={getData} admin={admin} />
        <ListStudent />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
