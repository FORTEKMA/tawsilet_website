import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getCommandById } from "../../redux/ordersSlice/OrderSlice";
import styled from "styled-components";
import { createReview } from "../../redux/reviewSlice/reviewSlice";
import Loader from "../../components/Items/Loader";
import { message } from "antd";
import { useTranslation } from "react-i18next";
import { FaStar } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";

const DriverRating = ({ onClose }) => {
  const { t } = useTranslation();

  const COMMENT_OPTIONS = [
    t('DriverRating.options.professional'),
    t("DriverRating.options.ontime"),
    t("DriverRating.options.talksTooMuch"),
    t("DriverRating.options.other"),
  ];

  const params = useParams();
  const dispatch = useDispatch();
  const command = useSelector((store) => store?.orders?.currentCommand);
  const currentUser = useSelector((store) => store?.user?.currentUser);
  const [rating, setRating] = useState(null);
  const [selectedComment, setSelectedComment] = useState(null);
  const [forceLoader, setForceLoader] = useState(true);
  const [otherComment, setOtherComment] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getCommandById({ id: params.id }));
      setForceLoader(false);
    } else {
      setForceLoader(false);
    }
  }, []);

  const handleReview = () => {
    if (!rating) {
      message.error("Veuillez attribuer une note à votre livreur ou passer cette étape.");
      return;
    }
    let note = selectedComment === t('DriverRating.options.other') ? otherComment : selectedComment;
    dispatch(
      createReview({
        body: {
          data: {
            note,
            score: rating,
            command: command.id,
            client: currentUser.id,
            driver:command.driver.id
          },
        },
      })
    );
    if (onClose) onClose();
  };

  if (forceLoader) return <Loader />;

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseModalButton onClick={onClose}>&times;</CloseModalButton>
        <Title>{t('DriverRating.title')}</Title>
        <Subtitle>{t('DriverRating.subtitle')}</Subtitle>
        <RatingBox>
          <ReactStars
            count={5}
            value={rating || 0}
            onChange={setRating}
            size={48}
            activeColor="#222"
            color="#ccc"
            isHalf={false}
          />
        </RatingBox>
        <CommentSubtitle>{t('DriverRating.leaveComment')}</CommentSubtitle>
        <CommentOptions>
          {COMMENT_OPTIONS.map((option) => (
            <CommentButton
              key={option}
              selected={selectedComment === option}
              onClick={() => setSelectedComment(option)}
            >
              {option}
            </CommentButton>
          ))}
        </CommentOptions>
        {selectedComment === t('DriverRating.options.other') && (
          <OtherTextarea
            placeholder={t('DriverRating.otherPlaceholder')}
            value={otherComment}
            onChange={e => setOtherComment(e.target.value)}
          />
        )}
        <EvaluerButton onClick={handleReview}>
          <FaStar style={{ marginRight: 8 }} /> {t('DriverRating.button')}
        </EvaluerButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default DriverRating;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.15);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: #fff;
  border-radius: 28px;
  box-shadow: 0 8px 32px rgba(24,54,90,0.10), 0 1.5px 6px rgba(216,181,108,0.08);
  padding: 40px 32px 32px 32px;
  min-width: 350px;
  max-width: 95vw;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CloseModalButton = styled.button`
  position: absolute;
  top: 18px;
  right: 18px;
  background: none;
  border: none;
  font-size: 2rem;
  color: #222;
  cursor: pointer;
  z-index: 10;
`;

const Title = styled.h1`
  color: #222;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 18px;
`;

const Subtitle = styled.h2`
  color: #222;
  font-size: 1.25rem;
  font-weight: 400;
  text-align: center;
  margin-bottom: 28px;
`;

const RatingBox = styled.div`
  background: #f5f5f5;
  border-radius: 18px;
  padding: 24px 32px;
  margin-bottom: 32px;
  display: flex;
  justify-content: center;
`;

const CommentSubtitle = styled.div`
  color: #bdbdbd;
  font-size: 1.1rem;
  text-align: center;
  margin-bottom: 18px;
`;

const CommentOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  margin-bottom: 40px;
`;

const CommentButton = styled.button`
  background: ${({ selected }) => (selected ? "#222" : "#fff")};
  color: ${({ selected }) => (selected ? "#fff" : "#bdbdbd")};
  border: 2px solid #ededed;
  border-radius: 16px;
  padding: 14px 28px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  min-width: 160px;
  transition: all 0.2s;
  &:hover {
    border-color: #d8b56c;
    color: #222;
  }
`;

const EvaluerButton = styled.button`
  background: #111;
  color: #fff;
  border: none;
  border-radius: 14px;
  padding: 16px 0;
  width: 90%;
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(24,54,90,0.08);
  transition: background 0.2s;
  &:hover {
    background: #222;
  }
`;

const OtherTextarea = styled.textarea`
  width: 100%;
  min-height: 80px;
  margin-top: 16px;
  border-radius: 12px;
  border: 1.5px solid #ededed;
  padding: 12px 16px;
  font-size: 1rem;
  color: #222;
  background: #fafafa;
  resize: vertical;
  outline: none;
  transition: border 0.2s;
  &:focus {
    border-color: #d8b56c;
  }
`;
