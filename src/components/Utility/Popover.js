import React from 'react';
import styled from 'styled-components';

const PopoverWrapper = styled.div`

  display: flex;
  justify-content:center;
`;

const PopoverContent = styled.div`


  top: 100%;
  left: 0;
  width: 200px;
  padding: 8px;
  background-color: rgb(255, 212, 0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  z-index: 1;
  color:black;
  opacity: ${({ visible }) => (visible ? '1' : '0')};
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

const PopoverTrigger = styled.div`
  display: inline-block;
  cursor: pointer;
  background-color : gray;

  &:hover + ${PopoverContent} {
    opacity: 1;
    visibility: visible;
  }
`;

const Popover = ({ content, children }) => {
  return (
    <PopoverWrapper>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent visible={false}>{content}</PopoverContent>
    </PopoverWrapper>
  );
};

export default Popover;
