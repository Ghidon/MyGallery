import React, { Component } from "react";
import "./App.css";
import MyGallery from "./components/MyGallery";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: "https://api.jsonbin.io/b/5f9a4aa5f0402361dcee277e",
      search: true,
      pagination: true,
      results_per_page: 10,
      sorting: true,
      auto_rotate_time: 4000,
    };
  }

  // handleChange = (newValue) => {
  //   const intNewValue = parseInt(newValue, 10);
  //   this.setState({ results_per_page: intNewValue });
  // };

  render() {
    return (
      <div>
        <div className="App container">
          <MyGallery
            feed={this.state.feed}
            search={this.state.search} //show a search box
            pagination={this.state.pagination} // show pagination component
            results_per_page={this.state.results_per_page} // results per page
            sorting={this.state.sorting} //show/allow sorting of images (date, title)
            auto_rotate_time={this.state.auto_rotate_time} //time of image slideshow
          />
        </div>
      </div>
    );
  }
}
