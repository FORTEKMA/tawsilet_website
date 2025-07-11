import React, { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Radio from "../../components/Items/Radio";
import Loader from "../../components/Items/Loader";
import { Button } from "../../components/Items/Button";
import Footer from "../../components/Section/Footer";

const DeleteAccountRequest = () => {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState("");
  const [accountType, setAccountType] = useState("client");
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleRequest = (e) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500);
    }, 2000);
  };

  return (
    <>
      <Container>
        <Title>{t("DeleteAccount.title")}</Title>
        <Form onSubmit={handleRequest}>
          <Label>{t("DeleteAccount.email")}</Label>
          <Input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder={t("DeleteAccount.emailPlaceholder")}
            required
          />
          <Label>{t("DeleteAccount.type")}</Label>
          <RadioGroup>
            <Radio
              label={t("DeleteAccount.client")}
              value="client"
              checked={accountType === "client"}
              onChange={() => setAccountType("client")}
            />
            <Radio
              label={t("DeleteAccount.driver")}
              value="driver"
              checked={accountType === "driver"}
              onChange={() => setAccountType("driver")}
            />
          </RadioGroup>
          <Button type="submit">{t("DeleteAccount.requestBtn")}</Button>
        </Form>
        {showConfirm && (
          <ModalOverlay>
            <ModalBox>
              <ModalTitle>{t("DeleteAccount.confirmTitle")}</ModalTitle>
              <ModalText>{t("DeleteAccount.confirmText")}</ModalText>
              <ModalActions>
                <Button onClick={handleConfirm}>{t("DeleteAccount.confirmBtn")}</Button>
                <Button onClick={() => setShowConfirm(false)}>{t("DeleteAccount.cancelBtn")}</Button>
              </ModalActions>
            </ModalBox>
          </ModalOverlay>
        )}
        {loading && <Loader />}
        {success && (
          <ModalOverlay>
            <ModalBox>
              <ModalTitle>{t("DeleteAccount.successTitle")}</ModalTitle>
              <ModalText>{t("DeleteAccount.successText")}</ModalText>
            </ModalBox>
          </ModalOverlay>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default DeleteAccountRequest;

const Container = styled.div`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #18365a;
  padding: 40px 10px 80px 10px;
`;
const Title = styled.h1`
  color: #ffd400;
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
`;
const Form = styled.form`
  background: rgba(255,255,255,0.05);
  border-radius: 12px;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-width: 320px;
  box-shadow: 0 2px 16px 0 rgba(24,54,90,0.1);
`;
const Label = styled.label`
  color: #fff;
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;
const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #bdbdbd;
  font-size: 1rem;
  background: transparent;
  color: #fff;
  margin-bottom: 1rem;
  &::placeholder {
    color: #959ead;
  }
`;
const RadioGroup = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
`;
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(24,54,90,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
`;
const ModalBox = styled.div`
  background: #fff;
  color: #18365a;
  border-radius: 10px;
  padding: 32px 24px;
  min-width: 320px;
  box-shadow: 0 2px 16px 0 rgba(24,54,90,0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ModalTitle = styled.h2`
  color: #18365a;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;
const ModalText = styled.p`
  color: #18365a;
  font-size: 1rem;
  margin-bottom: 2rem;
  text-align: center;
`;
const ModalActions = styled.div`
  display: flex;
  gap: 1rem;
`; 