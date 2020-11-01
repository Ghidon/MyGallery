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
  const [posts, setPosts] = useState([]);
  // const [whitelistedPosts, setwhitelistedPosts] = useState([]);
  const [filteredPosts, setfilteredPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(results_per_page);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get(feed);
      if (!localStorage.getItem("blackListed")) {
        localStorage.setItem("blackListed", []);
      }
      setPosts(
        // res.data filtered by blacklist
        res.data.filter(
          (post) => !localStorage.getItem("blackListed").includes(post.url)
        )
      );
      // setwhitelistedPosts(res.data);
      setfilteredPosts(
        res.data.filter(
          (post) => !localStorage.getItem("blackListed").includes(post.url)
        )
      );
      setLoading(false);
    };

    fetchPosts();
  }, [feed]);

  function setNewPostPerPage(newValue) {
    const intNewValue = parseInt(newValue, 10);
    setPostPerPage(intNewValue);
  }

  function setNewSearchPosts(searchValue) {
    let newPosts = posts.filter((post) => post.title.includes(searchValue));
    setfilteredPosts(newPosts);
  }

  function setNewWhitelistedPosts() {
    let newWhitelistedPosts = filteredPosts.filter(
      (post) => !localStorage.getItem("blackListed").includes(post.url)
    );
    setfilteredPosts(newWhitelistedPosts);
  }

  function setNewPostsSorting(sortValue) {
    console.log(sortValue);
    const sortedFilteredPosts = filteredPosts.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });
    setfilteredPosts(sortedFilteredPosts);
    // console.log(sortedFilteredPosts);
  }

  //Get current posts
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="my-gallery mt-5">
      <h1 className="text-primary mb-3">My Gallery</h1>
      <Header
        myGalleryPostPerPage={setNewPostPerPage}
        myGalleryPostsFilter={setNewSearchPosts}
        myGalleryPostsSort={setNewPostsSorting}
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
          postPerPage={postPerPage}
          totalPosts={filteredPosts.length}
          paginate={paginate}
        />
      )}
    </div>
  );
};
export default MyGallery;
