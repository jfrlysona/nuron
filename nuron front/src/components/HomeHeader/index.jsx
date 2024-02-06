import React, { useRef, useEffect, useState, useCallback } from "react";
import "./index.scss";

function HomeHeader() {
  const containerRef = useRef(null);
  const ex1LayerRef = useRef(null);
  const [transform, setTransform] = useState("");

  const calculateTransform = useCallback((x, y, el) => {
    if (!el) return "";

    let box = el.getBoundingClientRect();
    let constrain = 100;
    let calcX = -(y - box.y - box.height / 2) / constrain;
    let calcY = (x - box.x - box.width / 2) / constrain;

    return (
      "perspective(400px) " +
      "rotateX(" +
      calcX +
      "deg) " +
      "rotateY(" +
      calcY +
      "deg) "
    );
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (!ex1LayerRef.current) return;

      let xy = [e.clientX, e.clientY];
      let position = xy.concat([ex1LayerRef.current]);
      let newTransform = calculateTransform(...position);
      setTransform(newTransform);
    },
    [calculateTransform]
  );

  const handleMouseLeave = useCallback(() => {
    setTransform("");
  }, []);

  useEffect(() => {
    const mouseOverContainer = containerRef.current;

    if (mouseOverContainer) {
      mouseOverContainer.addEventListener("mousemove", handleMouseMove);
      mouseOverContainer.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (mouseOverContainer) {
        mouseOverContainer.removeEventListener("mousemove", handleMouseMove);
        mouseOverContainer.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [handleMouseMove, handleMouseLeave]);

  const imageSrc =
    "https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/01/banner-06-1.png";

  return (
    <section id="homeHeader">
      <div className="container">
        <div className="text">
          <h1>
            Buy and sell <br /> digital art, <br />
            <span>NFT,s collection</span>
          </h1>
          <p>
            There is enough digital artwork available online to help you put
            together a cryptocurrency website.
          </p>
          <div className="btns">
            <button className="btn-start">Get Started</button>
            <button className="btn-create">Create</button>
          </div>
        </div>
        <div className="content">
          <div className="images" ref={containerRef}>
            <img
              src={imageSrc}
              alt="header photo"
              ref={ex1LayerRef}
              id="ex1-layer"
              style={{ transform }}
            />
          </div>
          <div className="jumping-text">
            <div className="users">
              <div className="users-photo">
                <img src="https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/01/client-3.png" alt="" />
                <img src="https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/01/client-3.png" alt="" />
                <img src="https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/01/client-3.png" alt="" />
                <img src="https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/01/client-3.png" alt="" />
              </div>
              <span>More Then 25K</span>
            </div>
            <p>
              Million of people are selling there NFTs in Nuron marketplaces. <br />
              Create & Sell Your NFT.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeHeader;
