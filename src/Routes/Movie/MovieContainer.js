import React from "react";
import MoviePresenter from "./MoviePresenter";
import { api, moviesApi } from "api";

export default class extends React.Component {
  state = {
    weeklyTrending: null,
    weeklyTrendingCurrPage: 1,
    weeklyTrendingNextPage: 1,
    nowPlaying: null,
    nowPlayingCurrPage: 1,
    nowPlayingNextPage: 1,
    upcoming: null,
    upcomingCurrPage: 1,
    upcomingNextPage: 1,
    popular: null,
    popularCurrPage: 1,
    popularNextPage: 1,
    error: null,
    loading: true,
  };

  clickHandler = (section, next) => {
    switch (section) {
      case "weeklyTrending":
        {
          next === true
            ? this.state.weeklyTrendingNextPage < 100 &&
              this.setState((state) => ({
                weeklyTrendingNextPage: state.weeklyTrendingNextPage + 1,
              }))
            : this.state.weeklyTrendingNextPage != 1 &&
              this.setState((state) => ({
                weeklyTrendingNextPage: state.weeklyTrendingNextPage - 1,
              }));
        }
        break;

      case "nowPlaying":
        {
          next === true
            ? this.state.nowPlayingNextPage < 30 &&
              this.setState((state) => ({
                nowPlayingNextPage: state.nowPlayingNextPage + 1,
              }))
            : this.state.nowPlayingNextPage != 1 &&
              this.setState((state) => ({
                nowPlayingNextPage: state.nowPlayingNextPage - 1,
              }));
        }
        break;
      case "upcoming":
        {
          next === true
            ? this.state.upcomingNextPage < 10 &&
              this.setState((state) => ({
                upcomingNextPage: state.upcomingNextPage + 1,
              }))
            : this.state.upcomingNextPage != 1 &&
              this.setState((state) => ({
                upcomingNextPage: state.upcomingNextPage - 1,
              }));
        }
        break;
      case "popular":
        {
          next === true
            ? this.state.popularNextPage < 500 &&
              this.setState((state) => ({
                popularNextPage: state.popularNextPage + 1,
              }))
            : this.state.popularNextPage != 1 &&
              this.setState((state) => ({
                popularNextPage: state.popularNextPage - 1,
              }));
        }
        break;
      default:
    }
  };

  async componentDidUpdate() {
    console.log("componentDidUpdate");
    if (this.state.weeklyTrendingCurrPage !== this.state.weeklyTrendingNextPage) {
      const {
        data: { results: weeklyTrending },
      } = await api.get("trending/movie/week", {
        params: {
          page: this.state.weeklyTrendingNextPage,
        },
      });
      this.setState({
        weeklyTrending,
        weeklyTrendingCurrPage: this.state.weeklyTrendingNextPage,
      });
    }
    if (this.state.nowPlayingCurrPage !== this.state.nowPlayingNextPage) {
      const {
        data: { results: nowPlaying },
      } = await api.get("movie/now_playing", {
        params: {
          page: this.state.nowPlayingNextPage,
        },
      });
      this.setState({
        nowPlaying,
        nowPlayingCurrPage: this.state.nowPlayingNextPage,
      });
    }
    if (this.state.upcomingCurrPage !== this.state.upcomingNextPage) {
      const {
        data: { results: upcoming },
      } = await api.get("movie/upcoming", {
        params: {
          page: this.state.upcomingNextPage,
        },
      });
      this.setState({
        upcoming,
        upcomingCurrPage: this.state.upcomingNextPage,
      });
    }
    if (this.state.popularCurrPage !== this.state.popularNextPage) {
      const {
        data: { results: popular },
      } = await api.get("movie/popular", {
        params: {
          page: this.state.popularNextPage,
        },
      });
      this.setState({
        popular,
        popularCurrPage: this.state.popularNextPage,
      });
    }
  }

  async componentDidMount() {
    console.log("componentDidMount");
    try {
      const {
        data: { results: weeklyTrending },
      } = await moviesApi.weeklyTrending();
      const {
        data: { results: nowPlaying },
      } = await moviesApi.nowPlaying();
      const {
        data: { results: upcoming },
      } = await moviesApi.upcoming();
      const {
        data: { results: popular },
      } = await moviesApi.popular();
      this.setState({
        weeklyTrending,
        nowPlaying,
        upcoming,
        popular,
      });
    } catch {
      this.setState({
        error: "Can't find movie information.",
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { weeklyTrending, nowPlaying, upcoming, popular, error, loading } = this.state;
    console.log("render");
    return (
      <>
        <MoviePresenter
          clickHandler={this.clickHandler}
          weeklyTrending={weeklyTrending}
          nowPlaying={nowPlaying}
          upcoming={upcoming}
          popular={popular}
          error={error}
          loading={loading}
        />{" "}
      </>
    );
  }
}
