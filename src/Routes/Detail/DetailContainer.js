import React from "react";
import DetailPresenter from "./DetailPresenter";
import {
  moviesApi,
  tvApi
} from "../../api";

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: {
        pathname
      },
    } = props;
    this.state = {
      result: null,
      error: null,
      loading: true,
      isMovie: pathname.includes("/movie/"),
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: {
          id
        },
      },
      history: {
        push
      },
    } = this.props;
    const {
      isMovie
    } = this.state;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push("/");
    }
    let result = null;
    try {
      if (isMovie) {
        ({
          data: result
        } = await moviesApi.movieDetail(parsedId));
      } else {
        ({
          data: result
        } = await tvApi.showDetail(parsedId));

        if (result.seasons.length > 0) {
          result.seasonInfo = [];
          for (let i = 0; i < result.seasons.length; i++) {
            if (result.seasons[i].name.search(/[0-9]+/) !== -1) {
              var parsed_num = result.seasons[i].name.replace(/[^0-9]/g, "");
              const {
                data
              } = await tvApi.seasonDetail(parsedId, parsed_num);
              result.seasonInfo.push(data);
            }
          }
        }
      }
    } catch {
      this.setState({
        error: "Can't find anything.",
      });
    } finally {
      console.log(result);
      this.setState({
        loading: false,
        result,
      });
    }
  }

  render() {
    const {
      result,
      error,
      loading,
      isMovie
    } = this.state;
    return <DetailPresenter result = {
      result
    }
    error = {
      error
    }
    loading = {
      loading
    }
    isMovie = {
      isMovie
    }
    />;
  }
}