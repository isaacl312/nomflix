import React from "react";
import PeoplePresenter from "./PeoplePresenter";
import { PeopleApi } from "../../api";

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname },
    } = props;
    this.state = {
      result: null,
      error: null,
      loading: true,
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
      history: { push },
    } = this.props;

    const parsedId = parseInt(id);

    if (isNaN(parsedId)) {
      return push("/");
    }
    let result = null;
    try {
      ({ data: result } = await PeopleApi.PeopleDetail(parsedId));
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
    const { result, error, loading } = this.state;

    return <PeoplePresenter result={result} error={error} loading={loading} />;
  }
}
