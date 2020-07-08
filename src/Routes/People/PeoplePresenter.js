import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import WatchSection from "Components/WatchSection";
import WatchPoster from "../../Components/WatchPoster";

const FirstPage = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;
const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;
const PosterImg = styled.div`
  width: 30%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Center = styled.div`
  width: 40%;
  height: 100%
  margin-left: 10px;
  `;
const DiscriptionContainer = styled.div`
  height: 40%;
  width: 90%
  overflow: hidden;
  text-overflow: ellipsis;
  `;
const Title = styled.h3`
  font-size: 32px;
  text-border: 1px
  border: 5px;
  text-shadow:  0 1px black, 1px 0 black, 
`;
const ItemContainer = styled.div`
  margin: 20px 0;
  text-shadow: 0 1px black, 1px 0 black;
`;
const Item = styled.span``;
const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 80%;
`;

const SecondPage = styled.div`
  padding: 50px;
`;
const SecondContainer = styled.div`
  width: 100%;
  position: relative;
  background-color: rgba(70, 70, 70, 0.6);
  border-radius: 14px;
`;
const MovieCredit = styled.div`
  padding: 50px;
  padding-bottom: 0px;
`;
const TVCredit = styled.div`
  padding: 50px;
  padding-bottom: 0px;
`;

const PeoplePresenter = ({ result, loading, error }) =>
  loading ? (
    <>
      <Helmet>
        <title> Loading | Nomflix </title>{" "}
      </Helmet>{" "}
      <Loader />
    </>
  ) : (
    <>
      <FirstPage>
        <Backdrop bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`} />{" "}
        <Helmet>
          <title>{result.name ? result.name : ""}| Nomflix</title>
        </Helmet>
        <Content>
          <PosterImg bgImage={result.profile_path ? `https://image.tmdb.org/t/p/original${result.profile_path}` : require("../../assets/noPosterSmall.png")} />
          <Center>
            <DiscriptionContainer>
              <Title> {result.name ? result.name : ""} </Title>{" "}
              <ItemContainer>
                <Item> {result.birthday ? `Born in ${result.birthday}` : ""} </Item>{" "}
                {result.deathday ? (
                  <Item>
                    `~$
                    {result.deathday}`{" "}
                  </Item>
                ) : (
                  ""
                )}{" "}
                {result.place_of_birth ? <Item> from {result.place_of_birth} </Item> : ""}{" "}
              </ItemContainer>{" "}
              <Overview> {result.biography} </Overview>{" "}
            </DiscriptionContainer>{" "}
          </Center>{" "}
        </Content>{" "}
      </FirstPage>
      <>
        <SecondPage>
          <SecondContainer>
            <MovieCredit>
              <>
                {result.movie_credits.cast && (
                  <WatchSection title={`Movice Casted (${result.movie_credits.cast.length})`} subtitle="">
                    {result.movie_credits.cast.slice(0, 6).map((movie) => (
                      <WatchPoster
                        key={movie.id}
                        id={movie.id}
                        imageUrl={movie.poster_path}
                        title={movie.title}
                        year={movie.release_date ? movie.release_date.substring(0, 7) : ""}
                        rating={movie.vote_average ? movie.vote_average : ""}
                        popularity={movie.popularity}
                        description={movie}
                        character={movie.character}
                        isCredit={true}
                        isMovie={true}
                        isCast={true}
                        vote_count={movie.vote_count}
                      />
                    ))}{" "}
                  </WatchSection>
                )}{" "}
              </>
              <>
                {result.movie_credits.crew && (
                  <WatchSection title={`Produced Movies (${result.movie_credits.crew.length})`}>
                    {result.movie_credits.crew.slice(0, 6).map((movie) => (
                      <WatchPoster
                        key={movie.id}
                        id={movie.id}
                        imageUrl={movie.poster_path}
                        title={movie.title}
                        year={movie.release_date ? movie.release_date.substring(0, 7) : ""}
                        rating={movie.vote_average ? movie.vote_average : ""}
                        popularity={movie.popularity}
                        description={movie}
                        character={movie.job}
                        isCredit={true}
                        isMovie={true}
                        isCast={false}
                        vote_count={movie.vote_count}
                      />
                    ))}{" "}
                  </WatchSection>
                )}{" "}
              </>
            </MovieCredit>{" "}
            <TVCredit>
              <>
                {result.tv_credits.cast && (
                  <WatchSection title={`TV Casted (${result.tv_credits.cast.length})`} subtitle="">
                    {result.tv_credits.cast.slice(0, 6).map((tv) => (
                      <WatchPoster
                        key={tv.id}
                        id={tv.id}
                        imageUrl={tv.poster_path}
                        title={tv.name ? tv.name : ""}
                        year={tv.first_air_date ? tv.first_air_date.substring(0, 7) : ""}
                        popularity={tv.popularity}
                        rating={tv.vote_average ? tv.vote_average : ""}
                        vote_count={tv.vote_count}
                        description={tv}
                        character={tv.character}
                        isCredit={true}
                        isMovie={true}
                        isCast={true}
                      />
                    ))}{" "}
                  </WatchSection>
                )}{" "}
              </>
              <>
                {result.tv_credits.crew && (
                  <WatchSection title={`Produced Movies (${result.tv_credits.crew.length})`}>
                    {result.tv_credits.crew.slice(0, 6).map((tv) => (
                      <WatchPoster
                        key={tv.id}
                        id={tv.id}
                        imageUrl={tv.poster_path}
                        title={tv.name ? tv.name : ""}
                        year={tv.first_air_date ? tv.first_air_date.substring(0, 7) : ""}
                        rating={tv.vote_average ? tv.vote_average : ""}
                        popularity={tv.popularity}
                        description={tv}
                        character={tv.job}
                        isCredit={true}
                        isMovie={true}
                        isCast={false}
                        vote_count={tv.vote_count}
                      />
                    ))}{" "}
                  </WatchSection>
                )}{" "}
              </>
            </TVCredit>
          </SecondContainer>{" "}
        </SecondPage>{" "}
      </>
    </>
  );

PeoplePresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default PeoplePresenter;
