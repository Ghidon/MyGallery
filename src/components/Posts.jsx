import React, { useState } from "react";
import Carousel from "react-elastic-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./Posts.css";

export const Posts = ({ posts, loading, auto_rotate_time }) => {
  const [imgIndex, setImgIndex] = useState("");
  const [modalIndex, setmodalIndex] = useState(false);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  const getIndex = (index) => {
    setImgIndex(index);
    setmodalIndex(true);
    //set to false when modal closes
  };

  const removeImage = (url) => {
    console.log(url);
  };

  // const destroyModal = () => {
  //   let modal = document.getElementById("exampleModal");
  //   modal.remove();
  //   setmodalIndex(false);
  //   console.log("stocazzo");
  // };

  return (
    <div className="posts-gallery col-12 d-flex flex-wrap">
      {posts.map((post, index) => (
        <span className="d-flex">
          <div className="card posts-card">
            <a
              href="!#"
              onClick={() => getIndex(index)}
              key={post.title}
              data-toggle="modal"
              data-target="#exampleModal"
              className=""
            >
              <img
                src={post.url}
                alt="..."
                className="posts-img-sizing img-thumbnail"
              />
            </a>
            <div className="posts-trash">
              <a href="!#" onClick={() => removeImage(post.url)}>
                <FontAwesomeIcon icon={faTrash} />
              </a>
            </div>
          </div>
        </span>
      ))}
      {modalIndex && (
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
                            // onError={replaceBrokenImage}
                            src={post.url}
                            alt="..."
                            className="img-sizing"
                          />
                          <h3>{post.title}</h3>
                          <h5>{post.date}</h5>
                        </span>
                      </a>
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};