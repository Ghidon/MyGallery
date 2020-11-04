import React, { useState } from "react";
import Carousel from "react-elastic-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./Posts.css";

export const Posts = ({
  posts,
  loading,
  auto_rotate_time,
  myGalleryWhiteListingPosts,
}) => {
  const [imgIndex, setImgIndex] = useState("");

  if (loading) {
    return <h2>Loading...</h2>;
  }

  const getIndex = (index) => {
    setImgIndex(index);
  };

  const handleErrorImg = (event) => {
    console.log(event.target.src);
    return (event.target.src =
      "https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png");
  };

  const removeImage = (url) => {
    let list = [localStorage.getItem("blackListed")];
    list.push(url);
    localStorage.setItem("blackListed", list);
    myGalleryWhiteListingPosts();
  };

  // const destroyModal = () => {
  //   let modal = document.getElementById("exampleModal");
  //   modal.remove();
  //   setmodalIndex(false);
  //   console.log("stocazzo");
  // };

  return (
    <div className="posts-gallery d-flex flex-wrap center">
      {posts.map((post, index) => (
        <span className="d-flex">
          <div className="card posts-card box-shadow">
            <div class="hover06 column">
              <div>
                <a
                  href="!#"
                  onClick={() => getIndex(index)}
                  key={post.title}
                  data-toggle="modal"
                  data-target="#exampleModal"
                  className=""
                >
                  <figure>
                    <img
                      src={post.url}
                      alt="..."
                      className="posts-img-sizing img-thumbnail"
                      onError={handleErrorImg}
                    />
                  </figure>
                </a>
              </div>
            </div>
            <div className="posts-trash">
              <a href="!#" onClick={() => removeImage(post.url)}>
                <FontAwesomeIcon icon={faTrash} />
              </a>
            </div>
          </div>
        </span>
      ))}
      {
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="false"
          data-backdrop="static"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-body">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  // onClick={destroyModal}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                {imgIndex && (
                  <Carousel
                    initialActiveIndex={imgIndex}
                    itemsToShow={1}
                    enableAutoPlay
                    autoPlaySpeed={auto_rotate_time}
                  >
                    {posts.map((post) => (
                      <div className="post-modal">
                        <a
                          href="!#"
                          data-toggle="modal"
                          data-target="#exampleModal"
                        >
                          <span key={post.title} className="">
                            <img
                              src={post.url}
                              onError={handleErrorImg}
                              alt="..."
                              className="img-sizing"
                            />
                            <h5 className="posts-modal-title">{post.title}</h5>
                            <span>{post.date}</span>
                          </span>
                        </a>
                      </div>
                    ))}
                  </Carousel>
                )}
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
};
