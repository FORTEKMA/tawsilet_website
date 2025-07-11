import styled, { css } from "styled-components";
import * as style from "../../constants/StyleSheets";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import ErrorMessage from "../../components/Form/ErrorMessage";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const DeleteAccount = ({ setLoading, currentUser }) => {
  const { t, i18n } = useTranslation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      deleteOptions: {
        account: true,
        personalInfo: true,
        documents: false,
        activityHistory: false,
      },
    },
  });
  
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isOptionsExpanded, setIsOptionsExpanded] = useState(false);
  const deleteOptions = watch("deleteOptions");

  const handleDeleteAccount = (data) => {
    console.log("Account deletion request:", data);
    setLoading(true);
    
    fetch(`${process.env.REACT_APP_API_URL}/users/me`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) throw new Error('Failed to delete account');
      return response.json();
    })
    .then(() => {
      localStorage.removeItem('jwt');
      localStorage.removeItem('user');
      window.location.href = '/';
    })
    .catch(error => {
      console.error('Error:', error);
      alert(error.message);
    })
    .finally(() => setLoading(false));
  };

  return (
    <div style={{ paddingBottom: 50, paddingTop: 30, backgroundColor: "#18365a" }}>
      <Content
        right={i18n.language === "ar-AR"}
        onSubmit={handleSubmit(handleDeleteAccount)}
      >
        <User style={{ marginBottom: 20, marginTop: 30 }}>Supprimer le compte</User>
        
        <InfoText>
          La suppression de votre compte est permanente. Sélectionnez les données que vous souhaitez supprimer.
        </InfoText>

        <Address>
          <Input
            name="password"
            autoComplete="false"
            autoSave="false"
            type={passwordVisible ? "text" : "password"}
            className="oinput"
            placeholder="Mot de passe actuel"
            {...register("password", {
              required: "Veuillez entrer votre mot de passe actuel",
            })}
          />
          {passwordVisible ? (
            <IconContainer onClick={() => setPasswordVisible(false)}>
              <AiOutlineEyeInvisible />
            </IconContainer>
          ) : (
            <IconContainer onClick={() => setPasswordVisible(true)}>
              <AiOutlineEye />
            </IconContainer>
          )}
          {errors?.password && (
            <ErrorMessage>{errors?.password?.message}</ErrorMessage>
          )}
        </Address>

        <DeleteOptionsContainer>
          <OptionBlock>
            <OptionHeader onClick={() => setIsOptionsExpanded(!isOptionsExpanded)}>
              <OptionTitle>Options de suppression</OptionTitle>
              <ExpandIcon>
                {isOptionsExpanded ? <FiChevronUp /> : <FiChevronDown />}
              </ExpandIcon>
            </OptionHeader>
            {isOptionsExpanded && (
              <OptionContent>
                <OptionItem>
                  <OptionCheckbox
                    type="checkbox"
                    id="deleteAccount"
                    {...register("deleteOptions.account")}
                    defaultChecked
                  />
                  <OptionLabel htmlFor="deleteAccount">
                    <OptionTitle>Compte utilisateur</OptionTitle>
                    <OptionDescription>
                      Suppression définitive de votre compte. Vous ne pourrez plus vous connecter.
                    </OptionDescription>
                  </OptionLabel>
                </OptionItem>
                
                <OptionItem>
                  <OptionCheckbox
                    type="checkbox"
                    id="deletePersonalInfo"
                    {...register("deleteOptions.personalInfo")}
                    defaultChecked
                  />
                  <OptionLabel htmlFor="deletePersonalInfo">
                    <OptionTitle>Informations personnelles</OptionTitle>
                    <OptionDescription>
                      Nom, prénom, email, numéro de téléphone, adresse, etc.
                    </OptionDescription>
                  </OptionLabel>
                </OptionItem>
                
                <OptionItem>
                  <OptionCheckbox
                    type="checkbox"
                    id="deleteDocuments"
                    {...register("deleteOptions.documents")}
                  />
                  <OptionLabel htmlFor="deleteDocuments">
                    <OptionTitle>Documents uploadés</OptionTitle>
                    <OptionDescription>
                      Tous les fichiers que vous avez téléchargés sur notre plateforme.
                    </OptionDescription>
                  </OptionLabel>
                </OptionItem>
                
                <OptionItem>
                  <OptionCheckbox
                    type="checkbox"
                    id="deleteActivityHistory"
                    {...register("deleteOptions.activityHistory")}
                  />
                  <OptionLabel htmlFor="deleteActivityHistory">
                    <OptionTitle>Historique d'activité</OptionTitle>
                    <OptionDescription>
                      Historique de vos messages et interactions.
                    </OptionDescription>
                  </OptionLabel>
                </OptionItem>
              </OptionContent>
            )}
          </OptionBlock>
        </DeleteOptionsContainer>

        <ConfirmationContainer>
          <CheckboxInput
            type="checkbox"
            id="confirmDelete"
            checked={isConfirmed}
            onChange={(e) => setIsConfirmed(e.target.checked)}
          />
          <ConfirmationLabel htmlFor="confirmDelete">
            Je comprends que cette action est irréversible et que les données sélectionnées seront définitivement supprimées.
          </ConfirmationLabel>
        </ConfirmationContainer>

        <Button
          hasBackground
          type="submit"
          disabled={!isConfirmed || !deleteOptions.account}
          onSubmit={(e) => e.preventDefault()}
        >
          Supprimer les données sélectionnées
        </Button>
      </Content>
    </div>
  );
};

export default DeleteAccount;

const Content = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100vw;
  height: 100vh;
  align-items: center;
  @media (max-width: 1151px) {
    width: 100vw;
    margin: 0;
    padding: 8px;
  }
`;

const User = styled.div`
  font-family: ${style.font.FONT_FAMILY};
  color: var(--white, #fff);
  font-size: 2rem;
  font-style: normal;
  font-weight: 600;
  line-height: 2.25rem;
  @media (max-width: 1151px) {
    font-size: 1.6rem;
  }
`;

const Address = styled.div`
  position: relative;
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  @media (max-width: 1151px) {
    width: 90%;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 2rem;
  border-radius: 10px;
  border: transparent;
  padding-right: 2.5rem;
  padding: 1.5rem;
  color: var(--body-text-2, #666);
  font-family: ${style.font.FONT_FAMILY};
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5rem;
  @media (max-width: 1151px) {
    width: 100%;
  }
`;

const IconContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 16px;
  cursor: pointer;
  color: black;
  @media (max-width: 1050px) {
    color: white;
    top: 20px;
  }
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.BACKGROUND_COLOR};
  border-radius: 5px;
  width: 400px;
  height: 3rem;
  border-width: 2px;
  background-color: ${(props) => props.theme.PRIMARY_COLOR};
  border-color: #d8b56c;
  font-family: ${style.font.FONT_FAMILY};
  font-weight: 600;
  font-size: 0.875rem;
  border-radius: 0.75rem;
  color: ${(props) => props.theme.BACKGROUND_COLOR};
  padding: 0.75rem 1.5rem;
  justify-content: center;
  align-items: center;
  margin-top: 1.25rem;
  &:hover {
    background-color: ${(props) =>
      props.variant !== "outline"
        ? props.theme.BACKGROUND_COLOR
        : props.theme.PRIMARY_COLOR};
    color: ${(props) =>
      props.variant !== "outline"
        ? props.theme.PRIMARY_COLOR
        : props.theme.BACKGROUND_COLOR};
  }
  @media (max-width: 1151px) {
    width: 90%;
    padding: 2px;
  }
`;

const InfoText = styled.p`
  font-family: ${style.font.FONT_FAMILY};
  color: var(--white, #fff);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5rem;
  text-align: center;
  margin-bottom: 2rem;
  max-width: 50%;
  @media (max-width: 1151px) {
    width: 90%;
    max-width: 100%;
  }
`;

const ConfirmationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin: 1rem 0;
  width: 80%;
  @media (max-width: 1151px) {
    width: 90%;
  }
`;

const CheckboxInput = styled.input`
  margin-top: 0.25rem;
`;

const ConfirmationLabel = styled.label`
  font-family: ${style.font.FONT_FAMILY};
  color: var(--white, #fff);
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.25rem;
`;

const DeleteOptionsContainer = styled.div`
  width: 50%;
  margin-bottom: 2rem;
  @media (max-width: 1151px) {
    width: 90%;
  }
`;

const OptionBlock = styled.div`
  width: 100%;
  margin-bottom: 0.5rem;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  overflow: hidden;
`;

const OptionHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }
`;

const OptionContent = styled.div`
  padding: 0 1rem;
`;

const ExpandIcon = styled.div`
  margin-left: auto;
  color: #d8b56c;
  font-size: 1.2rem;
`;

const OptionItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
`;

const OptionCheckbox = styled.input`
  margin-top: 0.3rem;
`;

const OptionLabel = styled.label`
  flex: 1;
  cursor: pointer;
`;

const OptionTitle = styled.div`
  font-family: ${style.font.FONT_FAMILY};
  color: var(--white, #fff);
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const OptionDescription = styled.div`
  font-family: ${style.font.FONT_FAMILY};
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.4;
`;