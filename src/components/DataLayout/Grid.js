import React from 'react';
import styled from 'styled-components';
import * as style from "../../constants/StyleSheets";
const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  
  width: ${(props) => props.containerwidth ? props.containerwidth : "100%"};
  padding: ${(props) => props.containerpadding ? props.containerpadding : style.spacing.PADDING_SMALL};
  justify-content: ${( props ) => (props.justify? props.justify : 'space-evenly')};
 
`;

const GridItem = styled.div`
  width: 200px;
  height: 200px;
  background-color: #f2f2f2;
  margin-bottom: 20px;
 margin-right: 20px;

`;

const Grid = ({ containerwidth, containerpadding, justify}) => {
  return (
    <GridContainer containerwidth={containerwidth} containerpadding={containerpadding} justify={justify}>
      <GridItem>Item 1</GridItem>
      <GridItem>Item 2</GridItem>
      <GridItem>Item 3</GridItem>
      <GridItem>Item 4</GridItem>
      <GridItem>Item 1</GridItem>
      <GridItem>Item 2</GridItem>
      <GridItem>Item 3</GridItem>
      <GridItem>Item 4</GridItem>
      <GridItem>Item 4</GridItem>
      <GridItem>Item 1</GridItem>
      <GridItem>Item 2</GridItem>
      <GridItem>Item 3</GridItem>
      <GridItem>Item 4</GridItem>
      {/* Add more GridItems as needed */}
    </GridContainer>
  );
};

export default Grid;
