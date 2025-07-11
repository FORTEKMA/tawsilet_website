import React from "react";
import styled from "styled-components";
import penIcon from "../../../assets/icons/fleshrightblue.svg";

const CardContainer = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 16px;
  width: 100%;
  &:hover {
    background-color: rgba(240, 240, 240, 0.4);
    /* border: 1px solid rgba(255, 212, 0, 0.4); */
  }
  /* border: 1px solid #ccc; */
  border-radius: 8px;
  /* box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); */
  /* margin-bottom: 16px; */
`;

const IconContainer = styled.div`
  flex-shrink: 0;
  margin-right: 16px;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
`;

const TextContainer = styled.div`
  /* flex-grow: 1; */
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: auto;
`;

const Title = styled.h3`
  width: 50%;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  font-weight: 400;
  /* margin-bottom: 4px; */
  color: #333;
`;

const Description = styled.p`
  font-size: 12px;
  color: #999;
`;

const EditIcon = styled.img`
  align-self: center;
  width: 10px;
  height: 10px;
  margin-left: 10px;
  cursor: pointer;
`;

const Card = ({
  
  content = "",
  iconSrc,
  title = null,
  description,
  onEdit,
  setShowModalEdit = () => null,
}) => {
  return (
    <CardContainer
      
    >
      <IconContainer>
        <Icon src={iconSrc} alt="Icon" />
      </IconContainer>
      <TextContainer>
        {title ? <Title>{title}</Title> : null}
        <Description>{description}</Description>
      </TextContainer>
    
    </CardContainer>
  );
};

export default Card;
