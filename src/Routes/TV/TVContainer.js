import React from "react";
import TVPresenter from "./TVPresenter";
import {
  api,
  tvApi
} from "../../api";

export default class extends React.Component {
  state = {
    weeklyTrending: null,
    weeklyTrendingCurrPage: 1,
    weeklyTrendingNextPage: 1,
    topRated: null,
    topRatedCurrPage: 1,
    topRatedNextPage: 1,
    popular: null,
    popularCurrPage: 1,
    popularNextPage: 1,
    airingToday: null,
    airingTodayCurrPage: 1,
    airingTodayNextPage: 1,
    loading: true,
    error: null,
  };

  clickHandler = (section, next) => {
    switch (section) {
      case "weeklyTrending":
        next === true ?
          this.state.weeklyTrendingNextPage < 100 &&
          this.setState((state) => ({
            weeklyTrendingNextPage: state.weeklyTrendingNextPage + 1,
          })) :
          this.state.weeklyTrendingNextPage !== 1 &&
          this.setState((state) => ({
            weeklyTrendingNextPage: state.weeklyTrendingNextPage - 1,
          }));

        break;

      case "topRated":
        next === true ?
          this.state.topRatedNextPage < 30 &&
          this.setState((state) => ({
            topRatedNextPage: state.topRatedNextPage + 1,
          })) :
          this.state.topRatedNextPage !== 1 &&
          this.setState((state) => ({
            topRatedNextPage: state.topRatedNextPage - 1,
          }));

        break;
      case "popular":
        next === true ?
          this.state.popularNextPage < 10 &&
          this.setState((state) => ({
            popularNextPage: state.popularNextPage + 1,
          })) :
          this.state.popularNextPage !== 1 &&
          this.setState((state) => ({
            popularNextPage: state.popularNextPage - 1,
          }));

        break;
      case "airingToday":
        next === true ?
          this.state.airingTodayNextPage < 500 &&
          this.setState((state) => ({
            airingTodayNextPage: state.airingTodayNextPage + 1,
          })) :
          this.state.airingTodayNextPage !== 1 &&
          this.setState((state) => ({
            airingTodayNextPage: state.airingTodayNextPage - 1,
          }));

        break;
      default:
    }
  };

  async componentDidUpdate() {
    console.log("componentDidUpdate");
    if (this.state.weeklyTrendingCurrPage !== this.state.weeklyTrendingNextPage) {
      const {
        data: {
          results: weeklyTrending
        },
      } = await api.get("trending/tv/week", {
        params: {
          page: this.state.weeklyTrendingNextPage,
        },
      });
      this.setState({
        weeklyTrending,
        weeklyTrendingCurrPage: this.state.weeklyTrendingNextPage,
      });
    }
    if (this.state.topRatedCurrPage !== this.state.topRatedNextPage) {
      const {
        data: {
          results: topRated
        },
      } = await api.get("tv/top_rated", {
        params: {
          page: this.state.topRatedNextPage,
        },
      });
      this.setState({
        topRated,
        topRatedCurrPage: this.state.topRatedNextPage,
      });
    }
    if (this.state.airingTodayCurrPage !== this.state.airingTodayNextPage) {
      const {
        data: {
          results: airingToday
        },
      } = await api.get("tv/airing_today", {
        params: {
          page: this.state.airingTodayNextPage,
        },
      });
      this.setState({
        airingToday,
        airingTodayCurrPage: this.state.airingTodayNextPage,
      });
    }
    if (this.state.popularCurrPage !== this.state.popularNextPage) {
      const {
        data: {
          results: popular
        },
      } = await api.get("tv/popular", {
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
    try {
      const {
        data: {
          results: weeklyTrending
        },
      } = await tvApi.weeklyTrending();
      const {
        data: {
          results: topRated
        },
      } = await tvApi.topRated();
      const {
        data: {
          results: popular
        },
      } = await tvApi.popular();
      const {
        data: {
          results: airingToday
        },
      } = await tvApi.airingToday();
      // Promise.all([tvApi.weeklyTrending(), tvApi.topRated(), tvApi.popular(), tvApi.airingToday()])
      this.setState({
        weeklyTrending,
        topRated,
        popular,
        airingToday,
      });
    } catch {
      this.setState({
        error: "Can't find TV information.",
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const {
      weeklyTrending,
      topRated,
      popular,
      airingToday,
      loading,
      error
    } = this.state;
    return ( <
      TVPresenter clickHandler = {
        this.clickHandler
      }
      weeklyTrending = {
        weeklyTrending
      }
      topRated = {
        topRated
      }
      popular = {
        popular
      }
      airingToday = {
        airingToday
      }
      loading = {
        loading
      }
      error = {
        error
      }
      />
    );
  }
}