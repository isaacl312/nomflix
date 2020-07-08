import React from "react";
import SearchPresenter from "./SearchPresenter";
import { moviesApi, tvApi, PeopleApi } from "../../api";

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname },
    } = props;
    this.state = {
      movieResults: null,
      tvResults: null,
      peopleResults: null,
      searchTerm: "",
      loading: false,
      error: null,
      isPeople: pathname.includes("/people"),
      peopleWeeklyTrending: null,
      peoplePopular: null,
    };
  }

  async componentDidMount() {
    if (this.state.isPeople) {
      try {
        const {
          data: { results: peopleWeeklyTrending },
        } = await PeopleApi.weeklyTrending();
        const {
          data: { results: peoplePopular },
        } = await PeopleApi.popular();
        this.setState({
          peopleWeeklyTrending,
          peoplePopular,
        });
      } catch {
        this.setState({
          error: "Can't find Person information.",
        });
      }
    }
  }

  componentDidUpdate(oldProps) {
    const {
      location: { pathname },
    } = this.props;
    if (oldProps.location.pathname !== pathname) {
      this.setState({
        isPeople: pathname.includes("/people"),
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { searchTerm } = this.state;
    if (searchTerm !== "") {
      this.searchByTerm();
    }
  };

  updateTerm = (event) => {
    const {
      target: { value },
    } = event;
    this.setState({
      searchTerm: value,
    });
  };

  searchByTerm = async () => {
    const { searchTerm } = this.state;
    this.setState({
      loading: true,
    });

    try {
      if (this.state.isPeople) {
        const {
          data: { results: peopleResults },
        } = await PeopleApi.search(searchTerm);
        this.setState({
          peopleResults,
        });
      } else {
        const {
          data: { results: movieResults },
        } = await moviesApi.search(searchTerm);
        const {
          data: { results: tvResults },
        } = await tvApi.search(searchTerm);
        this.setState({
          movieResults,
          tvResults,
        });
      }
    } catch {
      this.setState({
        error: "Can't find results.",
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    const { movieResults, tvResults, peopleResults, searchTerm, loading, error, isPeople, peopleWeeklyTrending, peoplePopular } = this.state;
    return (
      <SearchPresenter
        movieResults={movieResults}
        tvResults={tvResults}
        peopleResults={peopleResults}
        loading={loading}
        error={error}
        searchTerm={searchTerm}
        handleSubmit={this.handleSubmit}
        updateTerm={this.updateTerm}
        isPeople={isPeople}
        peopleWeeklyTrending={peopleWeeklyTrending}
        peoplePopular={peoplePopular}
      />
    );
  }
}
