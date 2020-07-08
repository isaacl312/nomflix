import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import Section from "Components/Section";
import Message from "../../Components/Message";
import Poster from "../../Components/Poster";
import ProfileCard from "../../Components/ProfileCard";

const Container = styled.div`
margin-top:10px
padding-top: 20px
padding-bottom:20px
padding-right: 40px;
padding-left: 20px
`;

const Form = styled.form`
  margin-bottom: 50px;
  width: 100%;
`;

const Input = styled.input`
  all: unset;
  font-size: 28px;
  width: 100%;
`;

const PeopleContainer = styled.div`
  padding: 20px;
  margin-top: 20px;
`;

const SearchPresenter = ({ movieResults, tvResults, peopleResults, loading, searchTerm, handleSubmit, error, updateTerm, isPeople, peopleWeeklyTrending, peoplePopular }) => (
  <Container>
    <Helmet>
      <title> Search | Nomflix </title>{" "}
    </Helmet>{" "}
    <Form onSubmit={handleSubmit}>
      <Input placeholder={isPeople ? "Search your Actor or Crew" : "Search Movies or TV Shows "} value={searchTerm} onChange={updateTerm} />{" "}
    </Form>{" "}
    {loading ? (
      <Loader />
    ) : (
      <>
        {" "}
        {!isPeople &&
          movieResults &&
          movieResults.length > 0 && (
            <Section title="Movie Results">
              {" "}
              {movieResults.slice(0, 18).map((movie) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.original_title}
                  rating={movie.vote_average}
                  year={movie.release_date.substring(0, 4)}
                  isMovie={true}
                />
              ))}{" "}
            </Section>
          )}{" "}
        {!isPeople &&
          tvResults &&
          tvResults.length > 0 && (
            <Section title="TV Show Results">
              {" "}
              {tvResults.slice(0, 18).map((show) => (
                <Poster
                  key={show.id}
                  id={show.id}
                  imageUrl={show.poster_path}
                  title={show.original_name}
                  rating={show.vote_average}
                  year={show.first_air_date && show.first_air_date.substring(0, 4)}
                />
              ))}{" "}
            </Section>
          )}{" "}
        <PeopleContainer>
          {" "}
          {isPeople &&
            peopleResults &&
            peopleResults.length > 0 && (
              <Section title="Your Searched Actors or Directors">
                {" "}
                {peopleResults.slice(0, 18).map((person) => (
                  <ProfileCard
                    key={person.id}
                    id={person.id}
                    imageUrl={person.profile_path}
                    name={person.name}
                    rating={person.popularity}
                    year={person.first_air_date && person.first_air_date.substring(0, 4)}
                    isPeople={1}
                  />
                ))}{" "}
              </Section>
            )}{" "}
          {error && <Message color="#e74c3c" text={error} />}{" "}
          {tvResults &&
            movieResults &&
            peopleResults &&
            tvResults.length === 0 &&
            movieResults.length === 0 &&
            peopleResults.length === 0 && <Message text="Nothing found" color="#95a5a6" />}{" "}
          <>
            {" "}
            {isPeople &&
              peoplePopular && (
                <Section title="Popular Stars on TMDb">
                  {" "}
                  {peoplePopular
                    .slice(0, 18)
                    .slice(0, 18)
                    .map((person) => {
                      const featureTitle = person.known_for
                        ? person.known_for.length > 0
                          ? person.known_for[person.known_for.length - 1].media_type === "movie"
                            ? `"${person.known_for[person.known_for.length - 1].title}"`
                            : ` "${person.known_for[person.known_for.length - 1].name}"`
                          : ""
                        : "";

                      const featureYear = person.known_for
                        ? person.known_for.length > 0
                          ? person.known_for[person.known_for.length - 1].media_type === "movie"
                            ? `(${person.known_for[person.known_for.length - 1].release_date.substr(0, 4)}, MV)`
                            : `(${person.known_for[person.known_for.length - 1].first_air_date.substr(0, 4)}, TV)`
                          : ""
                        : "";

                      return (
                        <ProfileCard
                          key={person.id}
                          id={person.id}
                          imageUrl={person.profile_path}
                          name={person.name}
                          rating={person.popularity}
                          year={""}
                          isPeople={true}
                          featureTitle={featureTitle}
                          featureYear={featureYear}
                        />
                      );
                    })}{" "}
                </Section>
              )}{" "}
          </>{" "}
          <>
            {" "}
            {isPeople &&
              peopleWeeklyTrending && (
                <Section title="Weekly Trending Now">
                  {" "}
                  {peopleWeeklyTrending.slice(0, 18).map((person) => {
                    const featureTitle = person.known_for
                      ? person.known_for.length > 0
                        ? person.known_for[person.known_for.length - 1].media_type === "movie"
                          ? `"${person.known_for[person.known_for.length - 1].title}"`
                          : ` "${person.known_for[person.known_for.length - 1].name}"`
                        : ""
                      : "";

                    const featureYear = person.known_for
                      ? person.known_for.length > 0
                        ? person.known_for[person.known_for.length - 1].media_type === "movie"
                          ? `(${person.known_for[person.known_for.length - 1].release_date.substr(0, 4)}, MV)`
                          : `(${person.known_for[person.known_for.length - 1].first_air_date.substr(0, 4)}, TV)`
                        : ""
                      : "";

                    return (
                      <ProfileCard
                        key={person.id}
                        id={person.id}
                        imageUrl={person.profile_path}
                        name={person.name}
                        rating={person.popularity}
                        year={""}
                        isPeople={true}
                        featureTitle={featureTitle}
                        featureYear={featureYear}
                      />
                    );
                  })}{" "}
                </Section>
              )}{" "}
          </>{" "}
        </PeopleContainer>{" "}
      </>
    )}{" "}
  </Container>
);

SearchPresenter.propTypes = {
  movieResults: PropTypes.array,
  tvResults: PropTypes.array,
  peopleResults: PropTypes.array,
  error: PropTypes.string,
  searchTerm: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  updateTerm: PropTypes.func.isRequired,
};

export default SearchPresenter;
