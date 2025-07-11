import React, { useState, useRef } from "react";
import styled from "styled-components";

const DraggableCard = ({ children }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragContainerRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragContainerRef.current = {
      offsetX: e.clientX - position.x,
      offsetY: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const parentRect = e.target.parentNode.getBoundingClientRect();
    const newX = e.clientX - dragContainerRef.current.offsetX;
    const newY = e.clientY - dragContainerRef.current.offsetY;

    // Ensure the element stays within the parent's bounds
    const boundedX = Math.max(
      0,
      Math.min(newX, parentRect.width - e.target.offsetWidth)
    );
    const boundedY = Math.max(
      0,
      Math.min(newY, parentRect.height - e.target.offsetHeight)
    );

    setPosition({ x: boundedX, y: boundedY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <ParentContainer onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <DraggableDiv
        onMouseDown={handleMouseDown}
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      >
        {children}
      </DraggableDiv>
    </ParentContainer>
  );
};

export default DraggableCard;

// Styled components
const ParentContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  background-color: #f0f0f0;
  overflow: hidden;
`;

const DraggableDiv = styled.div`
  width: 150px;
  height: 100px;
  background-color: #d8b56c;
  border-radius: 8px;
  position: absolute;
  cursor: grab;
  user-select: none;
`;
