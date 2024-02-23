import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import "./index.scss";

import { Pagination } from "swiper/modules";
import NftCard from "../NftCard";
import { Link } from "react-router-dom";

function RelatedItems({ relatedItems, collection }) {
  function getCollectionName(nftId) {
    const nftCollectionMap = {};
    collection.forEach((col) => {
      col.nfts.forEach((nftId) => {
        nftCollectionMap[nftId] = col.name;
      });
    });
    return nftCollectionMap[nftId];
  }
  return (
    <section id="related">
      <h1>Related Items</h1>
      <Swiper
        slidesPerView={1}
        spaceBetween={8}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 70,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {relatedItems.map((x) => (
          <SwiperSlide key={x._id}>
            <NftCard
              key={x._id}
              img={x.image}
              name={x.name}
              price={x.price}
              likes={x.likes}
              id={x._id}
              collection={getCollectionName(x._id)}
              collectionId={x.collectionId}
              item={x}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default RelatedItems;
