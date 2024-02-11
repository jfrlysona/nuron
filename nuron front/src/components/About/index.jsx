import React, { useEffect, useState } from "react";
import "./index.scss";
import CallToAction from "../CallToAction";
import Statistics from "../Statistics";
import OurRecentBlog from "../OurRecentBlog";
import { Link } from "react-router-dom";
function About() {
  const [stickyDiv, setStickyDiv] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", stickDiv);

    return () => {
      window.removeEventListener("scroll", stickDiv);
    };
  }, []);

  const stickDiv = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 350 && windowHeight < 920
        ? setStickyDiv(true)
        : setStickyDiv(false);
    }
  };
  return (
    <section id="about">
      <div className="main">
        <h1>
          Direct Teams. <br />
          For Your Dadicated Dreams
        </h1>
        <div className="content">
          <div className="img">
            <div className="container">
              <div
                className="text"
                style={{
                  position: stickyDiv ? "fixed" : "absolute",
                  bottom: stickyDiv ? "-250px" : "-460px",
                  left: stickyDiv ? "60px" : null,
                  top: stickyDiv ? "100px" : null,
                  height: stickyDiv ? "min-content" : null,
                }}
              >
                <h2>Why We Do This</h2>
                <p>
                  NFTs are virtual tokens that represent ownership of something
                  inherently distinct and scarce, whether it be a physical or
                  digital item, such as artwork, a soundtrack, a collectible, an
                  in-game item or real estate. Unlike regular cryptocurrencies
                  like bitcoin or fiat money like the U.S.
                </p>
                <Link to={"/blog"}>See Our Blog</Link>
              </div>
            </div>
          </div>
          <div className="texts">
            <div className="text">
              <h2>
                Helping You <br />
                Grow In Every Stage.
              </h2>
              <p>
                NFTs are virtual tokens that represent ownership of something
                inherently distinct and scarce, whether it be a physical or
                digital item, such as artwork, a soundtrack, a collectible, an
                in-game item or real estate. Unlike regular crypto currencies
                like Bitcoin or fiat money like the U.S.
              </p>
            </div>
            <h2>
              Create, Sell well & Collect your Wonderful <br /> NFTs at Nuron
              Very Fast
            </h2>
            <p className="text-p">
              The NFTs is a one-trick pony that climbed the ladders of success
              in recent years. The growth NFTs is tremendous, and according to
              Pymnts.com, the total sales volume of NFTs has nearly crossed $2.5
              billion in the last six months of 2021. Surprisingly, the total
              sales volume of NFTs was $13.7 million in 2020. On comparing both
              the values,
            </p>
          </div>
        </div>
      </div>
      <Statistics />
      <CallToAction />
      <OurRecentBlog />
    </section>
  );
}

export default About;
