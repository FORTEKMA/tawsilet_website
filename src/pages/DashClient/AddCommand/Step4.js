import React, { useEffect, useState } from "react";
import styled from "styled-components";
import user from "../../../assets/icons/user.png";
import MainImage from "../../../assets/images/Layer 1.svg";
import { Link } from "react-router-dom";
import FormInput from "../../../components/Items/FormInputEstimation";

import faaceb from "../../../assets/icons/fbbbb.png";
import gooogle from "../../../assets/icons/gooooooogl.png";
import aapple from "../../../assets/icons/appp.png";
import faceb from "../../../assets/icons/Group 17.png";
import google from "../../../assets/icons/Group 16.png";
import apple from "../../../assets/icons/Group 18.png";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, loginUser } from "../../../redux/userSlice/userSlice";

const Step4 = ({ setStep, command, setCommand, setLoading, setPing, ping }) => {
  const currentUser = useSelector((store) => store.user.currentUser);
  const myPromise = (data) => Promise.resolve(dispatch(loginUser(data)));
  const { register, handleSubmit } = useForm();

  const [LogType, setLogType] = useState("initial");
  currentUser
    ? (setCommand({ data: { ...command.data, client_id: currentUser.id } }),
      setStep(5))
    : null;

  //--------------------login--------------------

  const dispatch = useDispatch();
  const loadingStatus = useSelector((state) => state.user.isLoading);
  const [isLoading, setisLoading] = useState(loadingStatus);
  useEffect(() => {
    setisLoading(loadingStatus);
  }, [loadingStatus]);

  return (
    //------------------ main page ------------------------------////////
    <Container>
      <img className="mainImg" src={MainImage} />

      {LogType === "initial" && (
        <White>
          <Title>Connectez-vous à votre compte</Title>

          <img src={user}></img>
          <H2>Vous êtes client?</H2>

          <Link>
            <MButtonn onClick={() => setLogType("login")}>CONNEXION</MButtonn>
          </Link>
          <P>Vous shouaitez devenir client?</P>
          <Link>
            <MSidentifbutt onClick={() => setLogType("register")}>
              S'INSCRIRE
            </MSidentifbutt>
          </Link>
        </White>
      )}

      {/* //--------------------------------- register ------------------------------------------------// */}

      {LogType === "register" && (
        <White2>
          <H1>S'inscrire </H1>

          <FormInput setStep={setStep} setLoading={setLoading} />

          <Sidentifbutt onClick={() => setLogType("login")}>
            CONNEXION
          </Sidentifbutt>
          <PX>_______ Ou connectez-vous en utilisant _______</PX>
          <Foote>
            <IM src={google} />
            <IM src={faceb} />
            <IM src={apple} />
          </Foote>

          <Foote>
            <IMA src={gooogle} />
            <IMA src={faaceb} />
            <IMA src={aapple} />
          </Foote>
        </White2>
      )}

      {/* -------------------------------------------------- Login ---------------------------------------- */}

      {LogType === "login" && (
        <White3
          onSubmit={handleSubmit((data) => {
            myPromise(data).then(() => dispatch(getCurrentUser()));
            setPing(!ping);
          })}
        >
          <H1>S'identifier Client</H1>
          <ContainerLog>
            <Input
              type="text"
              placeholder="Email "
              {...register("identifier")}
            />

            <Label>Adresse Email</Label>
          </ContainerLog>
          <ContainerLog>
            <Input
              type="password"
              placeholder="Mot de passe "
              {...register("password")}
            />

            <Label>Mot de passe</Label>
          </ContainerLog>
          <Pi>Mot de passe oublié?</Pi>
          <Buttonn type="submit"> CONNEXION </Buttonn> <HR> -</HR>
          <Sidentifbutt onClick={() => setLogType("register")}>
            S'INSCRIRE
          </Sidentifbutt>
          <HR>____________ </HR>Ou connectez-vous en utilisant{" "}
          <HR>____________</HR>
          <Foote>
            <IM src={google} />
            <IM src={faceb} />
            <IM src={apple} />
          </Foote>
          <Foote>
            <IMA src={gooogle} />
            <IMA src={faaceb} />
            <IMA src={aapple} />
          </Foote>
        </White3>
      )}
    </Container>
  );
};

export default Step4;

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;

  .mainImg {
    width: 15vw;
    @media (max-width: 1150px) {
      width: 40vw;
      display: none;
    }
  }
`;

export const White = styled.section`
  width: 100%;
  height: 100%;
  background: #ffffff;
  box-shadow: 4px 0px 60px rgba(0, 45, 137, 0.02);
  border-radius: 24px 0 0 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;

  // border: 2px solid #F37A1D;
  // border-radius: 24px;
`;

export const Title = styled.h1`
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  line-height: 150%;
  padding-bottom: 20px;
  letter-spacing: 0.02em;
  color: #18365a;
  @media (max-width: 1150px) {
    font-weight: 600;
    font-size: 20px;
    line-height: 100%;
  }
  img {
    width: 5vw;
  }
`;

export const H2 = styled.h2`
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 200%;
  letter-spacing: 0.02em;
  color: #18365a;
  padding-bottom: 20px;
  @media (max-width: 1150px) {
    font-weight: 600;
    font-size: 15px;
  }
`;
export const MButtonn = styled.button`
  width: 15vw;
  font-weight: 700px;
  height: 45px;
  border-radius: 12px;
  color: white;
  font-size: 14px;
  background-color: #18365a;
  letter-spacing: 1px;
  border: none;
  @media (max-width: 1150px) {
    width: 50vw;
  }
`;

export const Buttonn = styled.button`
  width: 15vw;
  font-weight: 700px;
  height: 45px;
  border-radius: 12px;
  color: white;
  font-size: 14px;
  background-color: #18365a;
  letter-spacing: 1px;
  border: none;
  @media (max-width: 1150px) {
    width: 80%;
    color: #18365a;
    background-color: white;
  }
`;

export const MSidentifbutt = styled.button`
  width: 200px;
  height: 45px;
  border-radius: 12px;
  border: 2px solid #18365a;
  color: #18365a;
  font-size: 16px;
  background-color: white;
  @media (max-width: 1150px) {
    width: 50vw;
    /* margin-bottom: 10vh; */
  }
`;

export const Sidentifbutt = styled.button`
  width: 200px;
  height: 45px;
  border-radius: 12px;
  border: 2px solid #18365a;
  color: #18365a;
  font-size: 16px;
  background-color: white;
  @media (max-width: 1150px) {
    width: 50vw;
    margin-bottom: 10vh;
    background-color: #18365a;
    border: 1px solid white;
    color: white;
  }
`;

export const P = styled.p`
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 150%;
  margin-top: 20px;
  margin-bottom: 10px;
  /* or 21px */

  letter-spacing: 0.02em;

  /* dark main color */

  color: #020111;
`;

// ------------------------------------------------      login part --------------------------------------------//////////

export const White2 = styled.section`
  width: 100%;
  height: 100%;
  background: #ffffff;
  box-shadow: 4px 0px 60px rgba(0, 45, 137, 0.02);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media (max-width: 744px) {
    background-color: #18365a;
    color: white;
    width: 100%;
    height: inherit;
    padding-top: 30px;
    gap: 10px;
  }
`;

export const H1 = styled.h1`
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 36px;
  line-height: 44px;
  letter-spacing: 0.02em;
  color: #07122f;
  margin-bottom: 20px;
  @media (max-width: 744px) {
    color: white;
    font-size: 26px;
    font-weight: 900;
    letter-spacing: 1px;
  }
`;

export const PX = styled.p`
  display: none;
  @media (max-width: 744px) {
    color: white;
    width: 100%;
    margin-bottom: 10px;
    display: block;
    font-size: 15px;
    text-align: center;
  }
`;

export const Foote = styled.section`
  margin: 20px;
  margin-top: 40px;
  display: flex;
  justify-content: center;
  gap: 37px;
  @media (max-width: 744px) {
    gap: 10px;
    margin: 0px;
  }
`;
export const IM = styled.img`
  width: 120px;
  @media (max-width: 744px) {
    display: none;
  }
`;

export const IMA = styled.img`
  display: none;
  @media (max-width: 744px) {
    display: block;
    width: 100px;
  }
`;

//-------------------------------------------------------------------------------- login --------------------------------------------------------------------

export const White3 = styled.form`
  width: 100%;
  height: 100%;
  background: #ffffff;
  box-shadow: 4px 0px 60px rgba(0, 45, 137, 0.02);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  align-self: start;
  @media (max-width: 744px) {
    background-color: #18365a;
    color: white;
    width: 100%;
    height: inherit;
    padding-top: 30px;
    gap: 10px;
  }
`;

const ContainerLog = styled.div`
  width: 70%;
  position: relative;
  margin-bottom: 20px;
  justify-content: center;
  align-items: center;
  display: flex;
  @media (max-width: 744px) {
    width: 90%;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  padding: 10px;
  font-size: 16px;
  border: 2px solid #000;
  border-top: 2px solid #000;
  outline: none;
  background-color: transparent;
  border-radius: 8px;
  transition: border-bottom-color 0.3s;
  &::placeholder {
    @media (max-width: 744px) {
      color: #18365a;
    }
  }
  @media (max-width: 744px) {
    width: 90vw;
    color: white;
    border-color: white;
    height: 60px;
    padding: 0px;
  }
`;

const Label = styled.label`
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 16px;
  color: #999;
  pointer-events: none;
  transition:
    transform 0.3s,
    color 0.3s;
  transform: translateY(-100%) translateX(-10%) scale(0.75);
  color: #000;
  background-color: white;
  padding: 0px 12px;
  @media (max-width: 744px) {
    color: white;
    background-color: #18365a;
  }
`;

export const Pi = styled.p`
  color: var(--dark-main-color, #020111);
  font-size: 15px;
  font-family: "Inter", sans-serif;
  line-height: 150%;
  letter-spacing: 0.24px;
  @media (max-width: 744px) {
    color: white;
    align-self: start;
    margin-left: 30px;
  }
`;

export const PA = styled.p`
  color: var(--dark-main-color, #020111);
  text-align: center;
  font-size: 15px;
  font-family: "Inter", sans-serif;
  line-height: 150%;
  letter-spacing: 0.24px;
  @media (max-width: 744px) {
    color: white;
    width: 100%;
    margin-bottom: 10px;
  }
`;

export const HR = styled.p`
  @media (max-width: 744px) {
    display: none;
  }
`;
