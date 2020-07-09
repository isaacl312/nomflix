import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import Section from "Components/Section";
import WatchSection from "Components/WatchSection";
import Poster from "Components/Poster";
import WatchPoster from "Components/WatchPoster";
import ProfileCard from "Components/ProfileCard";
import Reviews from "Components/Reviews";
import { Link } from "react-router-dom";

const TopContainer = styled.div`
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
  font-weight: 600
  text-border: 1px
  border: 5px;
  text-shadow:  0 1px black, 1px 0 black, 
`;
const ItemContainer = styled.div`
  margin: 20px 0;
  text-shadow: 0 1px black, 1px 0 black;
`;
const Item = styled.span``;
const Divider = styled.span`
  margin-left: 10px;
  margin-right: 2px;
`;
const Overview = styled.p`
  font-size: 12px;
  opacity: 0.9;
  line-height: 1.5;
  width: 80%;
`;
const VideoContainer = styled.div`
  height:60%
  width:90%
  opacity: 0.9;
`;
const Video = styled.iframe`
  src: url(${(props) => props.video});
  width: 100%;
  height: 100%;
  frameborder: 0;
  border-radius: 15px;
`;

const RightContainer = styled.div`
  width: 20%;
  height: 100%;
  overflow: auto
  align-content: flex-end;
`;
const RatingContainer = styled.div`
  margin-bottom: 5px;
`;
const Overall = styled.span`
  font-size: 12px;
  font-weight: 500;
`;
const Rating1 = styled.span`
  font-size: 12px;
  color: rgba(220, 220, 0, 1);
  font-weight: 600;
`;
const Rating2 = styled.span`
  font-size: 10px;
  font-weight: 500;
  color: rgba(200, 200, 200, 0.8);
`;
const ReviewContainer = styled.div`
  margin-top: 30px;
`;
const ComentTitle = styled.div`
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 650;
`;
const Review = styled.div`
  font-size: 16px;
  font-weight: 5000;
  margin-bottom: 20px;
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
const Credit = styled.div`
  padding: 50px;
  padding-bottom: 0px;
`;
const Seasons = styled.div`
  padding: 50px;
`;

const ThirdPage = styled.div`
  padding: 50px;
`;
const ThirdContainer = styled.div`
  width: 100%;
  position: relative;
  background-color: rgba(70, 70, 70, 0.6);
  border-radius: 14px;
`;
const Similar = styled.div`
  padding: 50px;
  padding-bottom: 0px;
`;
const Recommendation = styled.div`
  margin-bottom: 50px;
  padding: 50px;
`;

const DetailPresenter = ({ result, similar, recommendations, clickHandler, loading, isMovie, error }) =>
  loading ? (
    <>
      <Helmet>
        <title> Loading | Nomflix </title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <>
      <>
        <TopContainer>
          <Backdrop bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`} />
          <Helmet>
            <title> {result.original_title ? result.original_title : result.original_name} | Nomflix </title>
          </Helmet>
          <Content>
            <PosterImg bgImage={result.poster_path ? `https://image.tmdb.org/t/p/original${result.poster_path}` : require("../../assets/noPosterSmall.png")} />
            <>
              <Center>
                <DiscriptionContainer>
                  <Title> {result.original_title ? result.original_title : result.original_name} </Title>
                  <ItemContainer>
                    <Item> {result.release_date ? result.release_date.substring(0, 4) : ""} </Item> <Divider> • </Divider>
                    <Item>
                      {result.runtime ? result.runtime : result.episode_run_time[0]}
                      min
                    </Item>
                    <Divider> • </Divider>
                    <Item> {result.genres && result.genres.map((genre, index) => (index === result.genres.length - 1 ? genre.name : `${genre.name}/ `))} </Item>
                    {result.number_of_seasons ? (
                      <>
                        <Divider> • </Divider>
                        <span>
                          {result.number_of_seasons}
                          th Seasons
                        </span>
                      </>
                    ) : (
                      ""
                    )}
                    {result.number_of_episodes ? (
                      <>
                        <Divider> • </Divider>
                        <span>
                          {result.number_of_episodes}
                          episodes
                        </span>
                      </>
                    ) : (
                      ""
                    )}
                  </ItemContainer>
                  <Overview> {result.overview} </Overview>
                </DiscriptionContainer>
                <>
                  {result.videos.results.length > 0 && (
                    <VideoContainer>
                      <Video
                        src={
                          result.videos.results[result.videos.results.length - 1].site === "YouTube"
                            ? `https://youtube.com/embed/${result.videos.results[result.videos.results.length - 1].key}`
                            : `https://www.youtube.com/watch?v=rB0k21sGT_A`
                        }
                      />
                    </VideoContainer>
                  )}
                </>
              </Center>
            </>
            <>
              <RightContainer>
                <Review> Reviews </Review>
                <>
                  <RatingContainer>
                    <Overall> Popularity: </Overall> <Rating1> {} </Rating1>
                    <Rating1> {result.popularity.toString().substr(0, result.popularity.toString().search(/[.]/) + 2)} </Rating1> <Rating2> (by TMDb) </Rating2>
                  </RatingContainer>
                  <RatingContainer>
                    <Overall> Critic Votes: </Overall> <Rating1> {result.vote_average} </Rating1> <Rating2> /10 ({result.vote_count} rates)</Rating2>
                  </RatingContainer>
                </>
                <>
                  {result.reviews.results[0] && (
                    <ReviewContainer>
                      <ComentTitle> Recent Comments </ComentTitle>
                      {result.reviews.results.slice(0, 4).map((review) => (
                        <Reviews key={review.id} id={review.id} author={review.author ? review.author : ""} content={review.content ? review.content : ""} />
                      ))}
                    </ReviewContainer>
                  )}
                </>
              </RightContainer>
            </>
          </Content>
        </TopContainer>
      </>
      <>
        <SecondPage>
          <SecondContainer>
            <>
              <Credit>
                {result.credits.cast && (
                  <WatchSection title="Casts">
                    {result.credits.cast
                      .slice(0, 18)
                      .filter((cast) => cast.profile_path)
                      .map(((cast) => <ProfileCard key={cast.id} id={cast.id} imageUrl={cast.profile_path} name={cast.name} character={cast.character} isPeople={false} />: ""))}
                  </WatchSection>
                )}
              </Credit>
            </>
            <>
              <Seasons>
                {result.seasonInfo && (
                  <WatchSection title="Seasons">
                    {result.seasonInfo.slice(0, 12).map((season) => (
                      <WatchPoster
                        key={season.id}
                        id={season.id}
                        imageUrl={season.poster_path}
                        title={season.name}
                        year={season.air_date ? season.air_date.substring(0, 7) : ""}
                        description={season.overview === "" ? season.episodes[0] : season}
                        rating={season.episodes[0] ? season.episodes[0].vote_average : ""}
                        vote_count={season.episodes[0] ? season.episodes[0].vote_count : ""}
                        isCredit={false}
                      />
                    ))}
                  </WatchSection>
                )}
              </Seasons>
            </>
          </SecondContainer>
        </SecondPage>
      </>
      <>
        <ThirdPage>
          <ThirdContainer>
            {result.similar.total_results ? (
              <Similar>
                <Section
                  title="Similar watch"
                  subtitle={result.similar.total_results !== 0 ? `(${result.similar.total_results})` : ""}
                  section="similar"
                  clickHandler={clickHandler}
                  buttonAppear={result.similar.total_results < 18 ? false : true}
                >
                  {similar
                    .filter((watch) => watch.poster_path)
                    .slice(0, 18)
                    .map((watch) => (
                      <Poster
                        key={watch.id}
                        id={watch.id}
                        imageUrl={watch.poster_path ? watch.poster_path : ""}
                        title={watch.original_title ? watch.original_title : watch.original_name}
                        year={watch.release_date ? watch.release_date.substring(0, 4) : watch.first_air_date.substring(0, 4)}
                        rating={watch.vote_average ? watch.vote_average : ""}
                        isMovie={isMovie}
                      />
                    ))}
                </Section>
              </Similar>
            ) : (
              ""
            )}

            {result.recommendations.total_results ? (
              <Recommendation>
                <Section
                  title="Recommend for you"
                  subtitle={result.recommendations.total_results !== 0 ? `(${result.recommendations.total_results})` : ""}
                  section="recommendations"
                  clickHandler={clickHandler}
                  buttonAppear={result.recommendations.total_results < 18 ? false : true}
                >
                  {recommendations
                    .filter((watch) => watch.poster_path)
                    .slice(0, 18)
                    .map((watch) => (
                      <Poster
                        key={watch.id}
                        id={watch.id}
                        imageUrl={watch.poster_path ? watch.poster_path : ""}
                        title={watch.original_title ? watch.original_title : watch.original_name}
                        rating={watch.vote_average ? watch.vote_average : ""}
                        year={watch.release_date ? watch.release_date.substring(0, 4) : watch.first_air_date.substring(0, 4)}
                        isMovie={isMovie}
                      />
                    ))}
                </Section>
              </Recommendation>
            ) : (
              ""
            )}
          </ThirdContainer>
        </ThirdPage>
      </>
    </>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default DetailPresenter;
