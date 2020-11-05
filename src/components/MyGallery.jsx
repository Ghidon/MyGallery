import React, { useState, useEffect } from "react";
import axios from "axios";
import { Posts } from "./Posts";
import { Pagination } from "./Pagination";
import Header from "./Header";
import "./Posts.css";

const MyGallery = ({
  feed,
  results_per_page,
  pagination,
  auto_rotate_time,
  search,
  sorting,
}) => {
  const [originalPosts, setOriginalPosts] = useState([]);
  const [searchFilteredPosts, setSearchFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(results_per_page);
  const [sortMethod, setSortMethod] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get(feed);
      if (!localStorage.getItem("blackListed")) {
        localStorage.setItem("blackListed", []);
      }
      const whiteListed = res.data.filter(
        (post) => !localStorage.getItem("blackListed").includes(post.url)
      );
      setOriginalPosts(whiteListed);
      setSearchFilteredPosts(whiteListed);
      setLoading(false);
    };

    fetchPosts();
  }, [feed]);

  function setNewPostPerPage(newValue) {
    const intNewValue = parseInt(newValue, 10);
    setPostsPerPage(intNewValue);
  }

  function setNewSearchPosts(searchValue) {
    let newPosts = originalPosts.filter((post) =>
      post.title.includes(searchValue)
    );
    setSearchFilteredPosts(newPosts);
  }

  function setNewWhitelistedPosts() {
    let newWhitelistedPosts = searchFilteredPosts.filter(
      (post) => !localStorage.getItem("blackListed").includes(post.url)
    );
    setSearchFilteredPosts(newWhitelistedPosts);
    setOriginalPosts(newWhitelistedPosts);
  }

  function setNewPostsSortingDate() {
    setSortMethod("date");
    searchFilteredPosts.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
  }

  function setNewPostsSortingTitle() {
    setSortMethod("title");
    searchFilteredPosts.sort((a, b) => a.title.localeCompare(b.title));
  }

  //Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = searchFilteredPosts.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="my-gallery mt-5">
      <h1 className="mb-3">My Gallery</h1>
      <Header
        myGalleryPostPerPage={setNewPostPerPage}
        myGalleryPostsFilter={setNewSearchPosts}
        myGalleryPostsSortDate={setNewPostsSortingDate}
        myGalleryPostsSortTitle={setNewPostsSortingTitle}
        search={search}
        sorting={sorting}
        results_per_page={results_per_page}
      ></Header>

      <Posts
        posts={currentPosts}
        myGalleryWhiteListingPosts={setNewWhitelistedPosts}
        loading={loading}
        auto_rotate_time={auto_rotate_time}
      />
      {pagination && (
        <Pagination
          postPerPage={postsPerPage}
          totalPosts={searchFilteredPosts.length}
          paginate={paginate}
        />
      )}
    </div>
  );
};
export default MyGallery;
