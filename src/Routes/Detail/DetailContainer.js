import React from "react";
import DetailPresenter from "./DetailPresenter";
import { api, moviesApi, tvApi } from "../../api";

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname },
    } = props;
    this.state = {
      similar: null,
      similarCurrPage: 1,
      similarNextPage: 1,
      recommendations: null,
      recommendationsCurrPage: 1,
      recommendationsNextPage: 1,
      result: null,
      error: null,
      loading: true,
      isMovie: pathname.includes("/movie/"),
    };
  }

  clickHandler = (section, next) => {
    switch (section) {
      case "recommendations":
        console.log(this.state.recomendations);
        next === true
          ? this.state.result.recomendations.total_pages < this.state.recommendationsNextPage &&
            this.setState((state) => ({
              recommendationsNextPage: state.recommendationsNextPage + 1,
            }))
          : this.state.recommendationsNextPage !== 1 &&
            this.setState((state) => ({
              recommendationsNextPage: state.recommendationsNextPage - 1,
            }));
        break;

      case "similar":
        next === true
          ? this.state.result.similar.total_pages < this.state.similarNextPage &&
            this.setState((state) => ({
              similarNextPage: state.similarNextPage + 1,
            }))
          : this.state.similarNextPage !== 1 &&
            this.setState((state) => ({
              similarNextPage: state.similarNextPage - 1,
            }));

        break;
      default:
    }
  };

  async componentDidUpdate() {
    console.log("componentDidUpdate");
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const { recommendations, similar } = this.state;
    const { isMovie } = this.state;
    if (this.state.similarCurrPage !== this.state.similarNextPage) {
      const {
        data: { results: similar },
      } = await api.get(`${isMovie ? "movie" : "tv"}/${id}/similar`, {
        params: {
          page: this.state.similarNextPage,
        },
      });
      this.setState({
        similarCurrPage: this.state.similarNextPage,
      });
    }
    if (this.state.recommendationsCurrPage !== this.state.recommendationsNextPage) {
      const { data: recommendations } = await api.get(`${isMovie ? "movie" : "tv"}/${id}/recommendations`, {
        params: {
          page: this.state.recommendationsNextPage,
        },
      });
      this.setState({
        recommendationsCurrPage: this.state.recommendationsNextPage,
      });
    }
  }

  async componentDidMount() {
    console.log("h1");
    const {
      match: {
        params: { id },
      },
      history: { push },
    } = this.props;
    const { isMovie } = this.state;
    const parsedId = parseInt(id);
    let result = null;

    if (isNaN(parsedId)) {
      return push("/");
    }

    if (isMovie) {
      ({ data: result } = await moviesApi.movieDetail(parsedId));
    } else {
      ({ data: result } = await tvApi.showDetail(parsedId));
      if (result.seasons.length > 0) {
        result.seasonInfo = [];
        for (let i = 0; i < result.seasons.length; i++) {
          if (result.seasons[i].name.search(/[0-9]+/) !== -1) {
            var parsed_num = result.seasons[i].name.replace(/[^0-9]/g, "");
            const { data } = await tvApi.seasonDetail(parsedId, parsed_num);
            result.seasonInfo.push(data);
          }
        }
      }
    }

    const {
      data: { results: similar },
    } = await api.get(`${isMovie ? "movie" : "tv"}/${id}/similar`, {
      params: {
        page: 1,
      },
    });

    const {
      data: { results: recommendations },
    } = await api.get(`${isMovie ? "movie" : "tv"}/${id}/recommendations`, {
      params: {
        page: 1,
      },
    });

    this.setState({
      loading: false,
      recommendations,
      similar,
      result,
    });
  }

  render() {
    const { similar, recommendations, result, error, loading, isMovie } = this.state;
    console.log(isMovie);
    console.log(similar);
    console.log(this.state.recommendations);
    console.log(result);

    return (
      <DetailPresenter clickHandler={this.clickHandler} similar={similar} recommendations={recommendations} result={result} error={error} loading={loading} isMovie={isMovie} />
    );
  }
}
