import React, { Component } from "react";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
    };
  }

  handleNumberOfResults = (event) => {
    this.props.myGalleryPostPerPage(event.target.value);
  };

  handleSearchValue = (event) => {
    this.props.myGalleryPostsFilter(event.target.value);
  };

  handleSortBy = (event) => {
    if (event.target.value === "date") {
      this.props.myGalleryPostsSortDate();
    } else {
      this.props.myGalleryPostsSortTitle();
    }
  };

  render() {
    return (
      <div className="d-flex justify-content-between">
        {this.props.search && (
          <div className="input-group mb-3 col-9">
            <input
              type="text"
              className="form-control"
              placeholder="Search your picture"
              aria-describedby="button-addon2"
              onChange={this.handleSearchValue}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
              >
                Search
              </button>
            </div>
          </div>
        )}
        {this.props.sorting && (
          <div className="input-group col-2">
            <select
              className="custom-select"
              id="inputGroupSelect04"
              aria-label="Example select with button addon"
              onChange={this.handleSortBy}
            >
              <option selected>Sort by...</option>
              <option value="date">Date</option>
              <option value="title">Title</option>
            </select>
          </div>
        )}
        <div className="input-group col-1">
          <select
            className="custom-select"
            id="inputGroupSelect04"
            aria-label="Example select with button addon"
            onChange={this.handleNumberOfResults}
          >
            <option value="5">5</option>
            <option selected value="10">
              10
            </option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>
    );
  }
}
