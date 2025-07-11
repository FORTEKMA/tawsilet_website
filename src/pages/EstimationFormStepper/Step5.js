import styled from "styled-components";
import React, { useRef, useState, useEffect } from "react";
import previousFleshIcon from "../../assets/icons/previousFleshIcon.svg";
import { StepContainerLayout } from ".";
import { useTranslation } from "react-i18next";
import { useDriverSearch } from '../../hooks/useDriverSearch';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
  gap: 18px;
  padding-top: 32px;
  padding-bottom: 32px;
`;

const CenteredText = styled.div`
  color: #bdbdbd;
  font-size: 22px;
  text-align: center;
  margin-bottom: 18px;
`;

const LoaderWrapper = styled.div`
  position: relative;
  width: ${({ size }) => size || 400}px;
  height: ${({ size }) => size || 400}px;
  margin-bottom: 18px;
`;

const WaveCircle = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) scale(1);
  border-radius: 50%;
  border: 6px solid #0c0c0c;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  opacity: 0.7;
  animation: radar 2.4s linear infinite;
  animation-delay: ${({ delay }) => delay || 0}s;
  z-index: 1;
  @keyframes radar {
    0% {
      transform: translate(-50%, -50%) scale(0.2);
      opacity: 0.7;
    }
    80% {
      opacity: 0.7;
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0;
    }
  }
`;

const AvatarAround = styled.img`
  position: absolute;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 3px solid #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  background: #fff;
  z-index: 3;
  ${({ pos }) => pos === 0 && 'top: 10px; left: 50%; transform: translate(-50%, 0);'}
  ${({ pos }) => pos === 1 && 'top: 50%; left: 10px; transform: translate(0, -50%);'}
  ${({ pos }) => pos === 2 && 'bottom: 10px; left: 60%; transform: translate(-50%, 0);'}
  ${({ pos }) => pos === 3 && 'top: 70%; right: 10px; transform: translate(0, -50%);'}
`;

const CancelBox = styled.div`
  display: flex;
  align-items: center;
  background: #dedede;
  border-radius: 16px;
  padding: 0;
  width: 90%;
  height: 56px;
  margin-top: 8px;
  position: relative;
  overflow: hidden;
`;

const CancelText = styled.span`
  color: #757575;
  font-size: 10px;
  flex: 1;
  text-align: center;
  z-index: 1;
  user-select: none;
`;

const SliderThumb = styled.div`
  position: absolute;
  right: ${({ x }) => x}px;
  top: 0;
  width: 56px;
  height: 56px;
  background: #111;
  border-radius: 0 12px 12px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  z-index: 3;
  transition: background 0.2s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
`;

const ArrowIcon = styled.img`
  width: 28px;
  height: 28px;
  filter: invert(1);
`;

const SLIDE_MAX = 304; // 360 - 56

const Step5 = ({
  setStep
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Get data from redux store
  const user = useSelector((store) => store.user.currentUser);
  const command = useSelector((store) => store?.newCommand?.command);
  const pickup = command?.pickUpAddress;
  const dropoff = command?.dropOfAddress;
  const vehicleType = command?.TansportType;
  const price = command?.totalPrice;
  const time = command?.duration;
  const distance = command?.distance;

  // UI state
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [orderId, setOrderId] = useState(null);

  // Use the custom hook for driver search
  const { startSearch, searching } = useDriverSearch({
    user,
    pickup,
    dropoff,
    vehicleType,
    price,
    time,
    distance,
    t,
    onFound: (data) => {
      setShowPopup(true);
      setOrderId(data.orderId);
      setTimeout(() => {
        navigate(`/driver/track/${data.orderId}`);
      }, 3000);
    },
    onNotFound: () => {
      alert(t("EstimationFormStepper.Step4.noDriverFound") || "No driver accepted.");
    },
  });

  useEffect(() => {
    startSearch();
    // eslint-disable-next-line
  }, []);

  const avatars = [
    "https://randomuser.me/api/portraits/men/32.jpg",
    "https://randomuser.me/api/portraits/women/44.jpg",
    "https://randomuser.me/api/portraits/men/65.jpg",
    "https://randomuser.me/api/portraits/women/68.jpg"
  ];
  const dragStartX = useRef(null);

  const handleDragStart = (e) => {
    setDragging(true);
    dragStartX.current = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
  };
  const handleDrag = (e) => {
    if (!dragging) return;
    const clientX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
    let delta = dragStartX.current - clientX;
    if (delta < 0) delta = 0;
    if (delta > SLIDE_MAX) delta = SLIDE_MAX;
    setDragX(delta);
  };
  const handleDragEnd = () => {
    setDragging(false);
    if (dragX > SLIDE_MAX * 0.8) {
      setDragX(SLIDE_MAX);
      setTimeout(() => setStep(3), 200);
    } else {
      setDragX(0);
    }
  };

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleDrag);
      window.addEventListener("touchmove", handleDrag);
      window.addEventListener("mouseup", handleDragEnd);
      window.addEventListener("touchend", handleDragEnd);
      return () => {
        window.removeEventListener("mousemove", handleDrag);
        window.removeEventListener("touchmove", handleDrag);
        window.removeEventListener("mouseup", handleDragEnd);
        window.removeEventListener("touchend", handleDragEnd);
      };
    }
  }, [dragging, dragX]);

  return (
    <StepContainerLayout>
      <CenteredContainer>
        <CenteredText>{t("EstimationFormStepper.Step4.loadingTime")}</CenteredText>
        <LoaderWrapper size={230}>
          <WaveCircle size={100} delay="0s" />
          <WaveCircle size={200} delay="1.5s" />
          <WaveCircle size={300} delay="2.5s" />
          <WaveCircle size={400} delay="3.5s" />
          {avatars.map((src, i) => (
            <AvatarAround key={i} src={src} alt={`avatar${i+1}`} pos={i} />
          ))}
        </LoaderWrapper>
        <CancelBox>
          <CancelText>{t("EstimationFormStepper.Step4.swipeLeftToCancel")}</CancelText>
          <SliderThumb
            x={dragX}
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}
            style={{ right: dragX }}
          >
            <ArrowIcon src={previousFleshIcon} alt={t("EstimationFormStepper.Step4.back")}/>
          </SliderThumb>
        </CancelBox>
      </CenteredContainer>
    </StepContainerLayout>
  );
};

export default Step5;
