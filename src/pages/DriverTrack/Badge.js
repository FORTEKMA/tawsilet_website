import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import avatarHolder from "../../assets/icons/avatarHolder.jpeg";

import { Rating, RoundedStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const Badge = () => {
  const driver = useSelector((store) => store?.orders?.currentCommand?.driver_id);
  const reviews = useSelector((store) => store?.user?.reviews);
  // const
  // const [rating, setRating] = useState(3.6); // Initial value
  return (
    <Card
    //    data-aos="fade-up-left"
    >
      <ImageContainer>
        <AvatarDriver
          alt="driver"
          src={
            driver?.profilePicture?.url
              ? `${driver?.profilePicture?.url}`
              : avatarHolder
          }
        />
        <Rating
          readOnly
          className="my-rating-class"
          style={{ maxWidth: 150 }}
          value={ driver?.rating
            // reviews.length
            //   ? reviews.reduce((acc, el) => acc + el.note, 0) / reviews.length
            //   : null
          }
          // onChange={setRating}
          // halfFillMode="box"
          itemStyles={{
            itemShapes: RoundedStar,
            activeFillColor: "#d8b56c",
            inactiveFillColor: "#ccc",
          }}
        />
      </ImageContainer>
      <InfoCard>
        <h3>{driver?.firstName}</h3>
        <h6>{driver?.vehicule_id?.matriculation}</h6>{" "}
        <a className="adminButton" href={`tel:${driver?.phoneNumber}`}>
          <i className="fa-solid fa-phone"></i>
          <h6>{driver?.phoneNumber}</h6>
        </a>
      </InfoCard>
    </Card>
  );
};

export default Badge;

const Card = styled.div`
  padding: 20px;
  background-color: #32323ddd;
  border: 1px solid #aaa;
  border-radius: 24.75px;
  /* z-index: 99999; */
  position: absolute;
  gap: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  top: 100px;
  left: 60px;
  order: 4;
  min-width: 300px;

  @media (max-width: 744px) {
    /* width: 90vw; */
    margin-inline: 50%;
    flex-direction: row;
    /* justify-content: center; */
    /* padding: 10px 0 20px; */
    transform: translateX(-50%);
    top: 60px;
    left: 0;
    gap: 10vw;
    position: absolute;
    border-radius: 24.599px;
    border: 1.439px solid var(--body-text-2, #666);
    background: rgba(37, 36, 58, 0.8);
    backdrop-filter: blur(157.5341796875px);
    /* min-width: 150px; */
    max-width: 200px !important;
  }

  a {
    text-decoration: none;
  }

  .my-rating-class {
    @media (max-width: 744px) {
      width: 50px;
    }
  }
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  @media (max-width: 744px) {
    gap: 10px;
  }
`;

const AvatarDriver = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  @media (max-width: 744px) {
    width: 50px;
    height: 50px;
  }
`;

const InfoCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  @media (max-width: 744px) {
    align-items: flex-start;
  }
  h3 {
    color: white;
  }

  a {
    border: 1px solid white;
    border-radius: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    color: white;
    font-size: 16px !important;
    padding: 4px 12px;
    /* margin-top: 6px; */
  }
  i {
    font-size: 12px;
    color: #4cbb17;
  }
`;
