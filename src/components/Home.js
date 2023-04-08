import React, { useEffect } from "react";
import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import Viewers from "./Viewers";
import Recommends from "./Recommends";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Trending from "./Trending";
import { useDispatch, useSelector } from "react-redux";
import { selectUserName } from "../features/user/userSlice";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { setMovies } from "../features/movies/movieSlice";

const Home = (props) => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);

  let recommends = [];
  let newDisneys = [];
  let originals = [];
  let trending = [];

  const getMovies = async () => {
    const querySnapshot = await getDocs(collection(db, "movies"));
    querySnapshot.forEach((doc) => {
      switch (doc.data().type) {
        case "recommend":
          recommends = [...recommends, { id: doc.id, ...doc.data() }];
          break;
        case "new":
          newDisneys = [...newDisneys, { id: doc.id, ...doc.data() }];
          break;
        case "original":
          originals = [...originals, { id: doc.id, ...doc.data() }];
          break;
        case "trending":
          trending = [...trending, { id: doc.id, ...doc.data() }];
          break;
      }
    });
    dispatch(
      setMovies({
        recommended: recommends,
        newDisney: newDisneys,
        original: originals,
        trending: trending,
      })
    );
  };

  useEffect(() => {
    getMovies();
  }, [userName]);
  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Recommends />
      <NewDisney />
      <Originals />
      <Trending />
    </Container>
  );
};

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;
