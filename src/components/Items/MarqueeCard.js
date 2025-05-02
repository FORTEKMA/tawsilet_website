import styled from "styled-components";


function MarqueeCard({ description, title, tag, imageSrc, span }) {
    return (
      <>
       
      <CardContainer>
        <CardDescription>{description}</CardDescription>
        <BottomSection>
          <TitleTagContainer>
            <Title>{title}</Title>
            <Tag>{tag}</Tag>
           
          </TitleTagContainer>
          <Image src={imageSrc} alt={title} />
        </BottomSection>
      </CardContainer>
      </>
    );
  }

  export default MarqueeCard;

  const CardContainer = styled.div`

  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  max-width: 450px;
  max-height: 300px;
  box-shadow: 3.11px 3.11px 0px 0px rgba(24, 54, 90, 1);
  background-color: #fff;


padding: 14px ;
gap: 30px;
border-radius: 5px;
border: 1px solid rgba(24, 54, 90, 1);
opacity: 0px;

`;

// Description paragraph
const CardDescription = styled.p`
font-family: Inter;
font-size: 16px;
font-weight: 400;
line-height: 22.4px;
text-align: left;
 color: rgba(24, 54, 90, 1);
 /* margin-bottom: 30px; */
`;

// Bottom section that holds the title, tag, and image
const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// Title and tag container (aligned to the left)
const TitleTagContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

// Title styling
const Title = styled.h3`

  color: rgba(7, 33, 48, 1);
  margin: 0;
  font-family: Inter;
font-size: 16px;
font-weight: 700;
line-height: 22.4px;
text-align: left;

`;

// Tag styling
const Tag = styled.span`

  color: #888;
  margin-top: 4px;
  font-family: Inter;
font-size: 14px;
font-weight: 400;
line-height: 16.8px;
text-align: left;

`;
const Span = styled.span`

  color: #888;
  margin-top: 4px;
  font-family: Inter;
font-size: 14px;
font-weight: 400;
line-height: 16.8px;
text-align: left;

`;
// Image styling (aligned to the right)
const Image = styled.img`


  object-fit: cover;
  width: 64px;
height: 64px;
gap: 0px;
border-radius: 32px ;
opacity: 0px;

`;
