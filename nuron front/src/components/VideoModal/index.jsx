import React from "react";
import "./index.scss";
function VideoModal({close}) {
  return (
    <div className="videoModal">
      <div className="container">
        <i className="fa-sharp fa-solid fa-xmark" onClick={close}></i>
        <iframe
          src="https://www.youtube.com/embed/V830p6DwnIw?si=Jh-Cw6gTLACZAa3Q"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
}

export default VideoModal;
