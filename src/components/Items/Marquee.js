import React from "react";
import styled, { css, keyframes } from "styled-components";

// Define marquee animations
const marquee = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(-100% - var(--gap)));
  }
`;

const marqueeVertical = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(calc(-100% - var(--gap)));
  }
`;

// Styled container for the marquee
const MarqueeContainer = styled.div`
  display: flex;
  overflow: hidden;
  padding: 2rem;
  --duration: 40s;
  --gap: 1rem;
  gap: var(--gap);
  ${({ vertical }) =>
    vertical ? `flex-direction: column;` : `flex-direction: row;`}

  &:hover {
    ${({ pauseOnHover }) => pauseOnHover && `animation-play-state: paused;`}
  }
  @media (max-width: 744px) {
  margin-bottom: 20px;

}
`;

// Styled item for the marquee animation
const MarqueeItem = styled.div`
  display: flex;
  justify-content: space-around;
  flex-shrink: 0;
  gap: var(--gap);
  ${({ vertical }) =>
    vertical ? `flex-direction: column;` : `flex-direction: row;`}

  animation: ${({ vertical }) =>
    vertical
      ? css`
          ${marqueeVertical} var(--duration) linear infinite
        `
      : css`
          ${marquee} var(--duration) linear infinite
        `};

  ${({ reverse }) => reverse && `animation-direction: reverse;`};
  ${({ pauseOnHover }) => pauseOnHover && `animation-play-state: paused;`};
`;

export function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}) {
  return (
    <MarqueeContainer
      vertical={vertical}
      pauseOnHover={pauseOnHover}
      className={className}
      {...props}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <MarqueeItem
            key={i}
            vertical={vertical}
            reverse={reverse}
            pauseOnHover={pauseOnHover}
          >
           {children}
          </MarqueeItem>
        ))}
    </MarqueeContainer>
  );
}

export default Marquee;
