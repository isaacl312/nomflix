import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Section from "Components/Section";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import Poster from "../../Components/Poster";

const Container = styled.div `
margin-top:10px
padding-top: 20px
padding-bottom:20px
padding-right: 40px;
padding-left: 20px

`;

const MoviePresenter = ({
    weeklyTrending,
    nowPlaying,
    popular,
    upcoming,
    loading,
    error,
    clickHandler
  }) => ( <
    Container >
    <
    Helmet >
    <
    title > Movies | Nomflix < /title>{" "} <
    /Helmet>{" "} {
      loading ? ( <
          Loader / >
        ) : ( <
          > {
            " "
          } {
            weeklyTrending &&
              weeklyTrending.length > 0 && ( <
                Section title = "Weekly Trending Now"
                section = {
                  "weeklyTrending"
                }
                clickHandler = {
                  clickHandler
                } > {
                  " "
                } {
                  weeklyTrending.slice(0, 20).map((movie) => ( <
                    Poster key = {
                      movie.id
                    }
                    id = {
                      movie.id
                    }
                    imageUrl = {
                      movie.poster_path
                    }
                    title = {
                      movie.original_title
                    }
                    rating = {
                      movie.vote_average
                    }
                    year = {
                      movie.release_date.substring(0, 4)
                    }
                    isMovie = {
                      true
                    }
                    />
                  ))
                } {
                  " "
                } <
                /Section>
              )
          } {
            " "
          } {
            nowPlaying &&
              nowPlaying.length > 0 && ( <
                Section title = "Now Playing"
                subtitle = "in Theatres"
                section = {
                  "nowPlaying"
                }
                clickHandler = {
                  clickHandler
                }
                result = {
                  nowPlaying
                } > {
                  " "
                } {
                  nowPlaying.slice(0, 20).map((movie) => ( <
                    Poster key = {
                      movie.id
                    }
                    id = {
                      movie.id
                    }
                    imageUrl = {
                      movie.poster_path
                    }
                    title = {
                      movie.original_title
                    }
                    rating = {
                      movie.vote_average
                    }
                    year = {
                      movie.release_date.substring(0, 4)
                    }
                    isMovie = {
                      true
                    }
                    />
                  ))
                } {
                  " "
                } <
                /Section>
              )
          } {
            " "
          } {
            upcoming &&
              upcoming.length > 0 && ( <
                Section title = "Upcoming Movies"
                subtitle = "in Theatres"
                section = {
                  "upcoming"
                }
                clickHandler = {
                  clickHandler
                }
                result = {
                  upcoming
                } > {
                  " "
                } {
                  upcoming.slice(0, 20).map((movie) => ( <
                    Poster key = {
                      movie.id
                    }
                    id = {
                      movie.id
                    }
                    imageUrl = {
                      movie.poster_path
                    }
                    title = {
                      movie.original_title
                    }
                    rating = {
                      movie.vote_average
                    }
                    year = {
                      movie.release_date.substring(0, 4)
                    }
                    isMovie = {
                      true
                    }
                    />
                  ))
                } {
                  " "
                } <
                /Section>
              )
          } {
            " "
          } {
            popular &&
              popular.length > 0 && ( <
                Section title = "Popular Movies"
                subtitle = "on TMDb"
                section = {
                  "popular"
                }
                clickHandler = {
                  clickHandler
                }
                result = {
                  popular
                } > {
                  " "
                } {
                  popular.slice(0, 20).map((movie) => ( <
                    Poster key = {
                      movie.id
                    }
                    id = {
                      movie.id
                    }
                    imageUrl = {
                      movie.poster_path
                    }
                    title = {
                      movie.original_title
                    }
                    rating = {
                      movie.vote_average
                    }
                    year = {
                      movie.release_date.substring(0, 4)
                    }
                    isMovie = {
                      true
                    }
                    />
                  ))
                } {
                  " "
                } <
                /Section>
              )
          } {
            " "
          } {
            error && < Message color = "#e74c3c"
            text = {
              error
            }
            />}{" "} <
            />
          )
        } {
          " "
        } <
        /Container>
    );

    MoviePresenter.propTypes = {
      weeklyTrending: PropTypes.array,
      nowPlaying: PropTypes.array,
      popular: PropTypes.array,
      upcoming: PropTypes.array,
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      clickHandler: PropTypes.func,
    };

    export default MoviePresenter;