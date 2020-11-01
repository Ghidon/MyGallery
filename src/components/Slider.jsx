import React, { useState } from "react";
import Carousel from "react-elastic-carousel";

export const Slider = ({ posts, loading, auto_rotate_time }) => {
  const [imgUrl, setImgUrl] = useState("");
  const [imgTitle, setImgTitle] = useState("");

  if (loading) {
    return <h2>Loading...</h2>;
  }

  function openInModal(url, title) {
    console.log(url);
    setImgUrl(url);
    setImgTitle(title);
  }

  function replaceBrokenImage() {
    console.log("ninna");
  }

  return (
    <div>
      <Carousel itemsToShow={1} enableAutoPlay autoPlaySpeed={auto_rotate_time}>
        {posts.map((post) => (
          <div>
            <a
              href="!#"
              onClick={() => openInModal(post.url, post.title)}
              data-toggle="modal"
              data-target="#exampleModal"
            >
              <span key={post.title} className="">
                <img
                  onError={replaceBrokenImage}
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
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                {imgTitle}ninna
              </h5>

              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="container-fluid">
                <img src={imgUrl} alt={imgTitle} />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
