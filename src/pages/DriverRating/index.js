import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getLocationById } from "../../redux/locationSlice/locationSlice";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import styled from "styled-components";
import Profile from "../../assets/images/avatardriver.png";
import {
  createReview,
  getRviewByCommandId,
  updateReview,
} from "../../redux/reviewSlice/reviewSlice";
import Loader from "../../components/Items/Loader";
import { message } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const DriverRating = () => {
  const { t, i18n } = useTranslation();
  const params = useParams();
  const dispatch = useDispatch();

  const command = useSelector((store) => store?.location?.command);
  const driver = useSelector((store) => store.location?.command?.driver_id);

  const currentUser = useSelector((store) => store?.user?.currentUser);
  const currentReview = useSelector(
    (store) => store.location?.command?.review || null
  );

  const [rating, setRating] = useState(null);
  const [messageText, setMessageText] = useState(null);
  const [forceLoader, setForceLoader] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getLocationById({ id: params.id }));
      // dispatch(getRviewByCommandId({ id: params.id })).then(() =>
      setForceLoader(false);
      // );
    } else {
      setForceLoader(false);
    }
  }, []);

  const handleReview = () => {
    // alredyReviewed ====> update review by reviewID
    // Not Reviewed ===> create new review

    // ===============================================
    if (!rating) {
      message.error(
        "Veuillez attribuer une note à votre livreur ou passer cette étape."
      );
    }
    //  else {
    //   if (!!currentReview[0]) {
    //     dispatch(
    //       updateReview({
    //         id: currentReview[0].id,
    //         body: {
    //           data: {
    //             messageText: messageText,
    //             note: rating,
    //           },
    //         },
    //       })
    //     );
    //   }
    else {
      dispatch(
        createReview({
          body: {
            data: {
              note: messageText,
              score: rating,
              command: command.id,
              driver: driver.id,
              client: currentUser.id,
            },
          },
        })
      );
    }
    // }
  };

  // const isLoading = useSelector((store) => store?.location?.isLoading);
  // const isLoading2 = useSelector((store) => store?.user?.isLoading);

  if (forceLoader) {
    return <Loader />;
  }

  if (
    !currentUser?.id ||
    (command?.client_id?.id && !(command?.client_id?.id === currentUser?.id))
  ) {
    return (
      <RatingContainer>
        <h1>{t("ClientProfile.Commande.Message.unauthorized")}</h1>
        <h3>{t("ClientProfile.Commande.Message.span")}</h3>
        <Link to="/" className="retour">
          {t("ClientProfile.Commande.Message.button")}
        </Link>
      </RatingContainer>
    );
  }

  return command?.commandStatus === "Completed" ? (
    <RatingContainer>
      <Div>
        <h1> {t("ClientProfile.Commande.Message.completed")}</h1>
        <img
          className="profile-picture"
          src={
            driver?.profilePicture ? `${driver?.profilePicture?.url}` : Profile
          }
          alt="driver picture"
        />
        <h1
          style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "grey",
            color: "#f37a1d",
          }}
        >
          {driver?.firstName}
          {driver?.lastName}
        </h1>

        {/* <h5>Commande livré avec succès</h5> */}
        {currentReview?.length ? (
          <p>{t("ClientProfile.Commande.Message.note")}</p>
        ) : (
          <>
            {/* <p>{t("ClientProfile.Commande.Message.ratting")}</p> */}

            <h2>{t("ClientProfile.Commande.Message.rattinge")}</h2>
          </>
        )}
        <Rating
          readOnly={currentReview?.length || false}
          className="my-rating-class"
          // style={{ maxWidth: 350 }}
          value={currentReview ? currentReview?.score : rating} ////// ================== a verifier
          onChange={setRating}
          // halfFillMode="box"
          itemStyles={{
            itemShapes: RoundedStar,
            activeFillColor: "#f37a1d",
            inactiveFillColor: "#ccc",
          }}
        />
        {currentReview ? (
          <p
            style={{
              border: "1px solid rgba(250,250,250,0.3)",
              padding: 16,
              borderRadius: 16,
              width: "fit-content",
            }}
          >
            {currentReview?.note}
          </p>
        ) : (
          <textarea
            placeholder={t("ClientProfile.Commande.Message.comment")}
            rows={5}
            cols={50}
            onChange={(e) => setMessageText(e.target.value)}
          ></textarea>
        )}

        {/* <span>
        {!currentReview?.length ? "" : "Vous avez déjà évalué cette commande."}
      </span> */}
        <Buttons>
          {!currentReview ? (
            <button onClick={handleReview} className="saveRating">
              {t("ClientProfile.Commande.Message.envoyer")}
            </button>
          ) : null}

          <Link to="/ClientProfile/history" className="passer">
            {!currentReview
              ? t("ClientProfile.Commande.Message.passer")
              : t("ClientProfile.Commande.Message.dejanote")}
          </Link>
        </Buttons>
      </Div>
    </RatingContainer>
  ) : (
    <RatingContainer>
      <h2 className="h2message">
        {t("ClientProfile.Commande.Message.invitation")}
      </h2>
      <h3>{t("ClientProfile.Commande.Message.invitspan")}</h3>
    </RatingContainer>
  );
};

export default DriverRating;
const Buttons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  align-items: baseline;
`;
const Div = styled.div`
  background-color: #18365a;

  margin-top: 30;
  padding-top: 5vh;
  width: 50%;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  border-radius: 30px;

  justify-content: flex-start;
  gap: 10px;
  @media (max-width: 744px) {
    padding-top: 20px;
    justify-content: center;
    width: 90vw;
    min-height: 90vh;
  }
`;
const RatingContainer = styled.div`
  background-color: #18365a;
  padding-top: 10vh;
  padding-bottom: 30px;
  width: 100%;
  min-height: 95vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  justify-content: flex-start;
  gap: 10px;
  @media (max-width: 744px) {
    padding-top: 20px;
    justify-content: center;
  }

  h2 {
    color: #f0f0f0;
    padding-top: 5%;
    width: 50%;
    text-align: center;
    @media (max-width: 744px) {
      width: 90%;
      font-size: 16px;
    }
  }

  .h2message {
    @media (max-width: 744px) {
      margin-top: -15vh;
    }
  }
  h3 {
    color: #f37a1d;
    font-weight: 300;
  }

  p {
    padding: 0px 20px;
    color: #f0f0f0;
    width: 40%;
    text-align: center;
    @media (max-width: 1100px) {
      width: 80%;
    }
  }

  h1 {
    text-transform: capitalize;
    text-align: center;
    color: #f0f0f0;
  }

  .profile-picture {
    width: 20vh;
    height: 20vh;
    border-radius: 50%;
    object-fit: cover;
  }
  .my-rating-class {
    /* background-color: #f37a1d; */
    width: 20vw;
    margin-bottom: 10px;
    @media (max-width: 744px) {
      width: 150px;
    }
  }
  textarea {
    padding: 8px 12px;
    border-radius: 20px;
    resize: none;
    font-size: 16px;
    @media (max-width: 744px) {
      width: 80vw;
      resize: vertical;
    }
  }
  .saveRating {
    cursor: pointer;
    font-size: 18px;
    padding: 12px 30px;
    border-radius: 16px;
    background-color: #f37a1d;
    border: none;
    color: white;
    box-shadow: 1px 1px 5px 1px #405a6ea1;
    margin-top: 20px;
  }
  .passer {
    cursor: pointer;
    text-decoration: none;
    color: #f37a1d;
    cursor: pointer;
    font-size: 18px;
    padding: 12px 30px;
    border-radius: 16px;
    background-color: #f0f0f0;
    border: none;

    margin-top: 20px;
  }
  .retour {
    margin-top: 20px;
    border: 1px solid white;
    border-radius: 16px;
    padding: 8px 16px;
    cursor: pointer;
    text-decoration: none;
    color: white;
    &:hover {
      color: #f37a1d;
    }
  }
`;
