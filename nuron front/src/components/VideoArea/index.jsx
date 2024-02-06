import React, { useState } from "react";
import "./index.scss";
import VideoModal from "../VideoModal";

function VideoArea() {
  const [openVideo, setOpenVideo] = useState(false)
  return (
    <section id="video">
      <div className="container">
        <h1>Meet with Nuron</h1>
        <p>
          An NFT is a digital asset that represents real-world objects like art,
          music, in-game items <br />
          and videos. They are bought and sold online.
        </p>
        <div className="video">
          <img
            src="https://img.freepik.com/premium-photo/a-close-up-of-a-pink-and-blue-smoke-swirl-on-a-black-background-generative-ai_958165-32308.jpg?w=900"
            alt=""
          />
          <div className="play-video" onClick={()=>setOpenVideo(true)}>
            <i className="fa-sharp fa-solid fa-play"></i>
          </div>
        </div>
      </div>
     { openVideo && <VideoModal close={()=>setOpenVideo(false)}/>}
    </section>
  );
}

export default VideoArea;
