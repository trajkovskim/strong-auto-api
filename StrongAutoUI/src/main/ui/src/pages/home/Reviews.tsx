import { BoxAnimation, Carousel, Container, Icon, Line, List, Text, Title } from 'components/common';
import { useTranslation } from 'hooks';
import { PAGE_MAX_WIDTH, reviews } from 'pages/constants';
import { WhiteBackgroundContainer } from 'pages/common.styled';
import React, { useMemo } from 'react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import styled from 'styled-components';

const StarsWrapper = styled(Container)`
  color: #232323;
`;

type ReviewProps = {
  review: (typeof reviews)[number];
};

const Review: React.FC<ReviewProps> = (props) => {
  const t = useTranslation('home.reviews');

  const createdStars = useMemo(
    () => (
      <Container styleConfig={{ gap: '0.5rem', direction: 'row' }}>
        {new Array(5).fill(0).map((_, index) => {
          const remainingRating = props.review.rating - index;

          if (remainingRating >= 1) {
            return <Icon icon={<BsStarFill />} width="18px" key={index} />;
          } else if (remainingRating > 0 && remainingRating < 1) {
            return <Icon icon={<BsStarHalf />} width="18px" key={index} />;
          } else {
            return <Icon icon={<BsStar />} width="18px" key={index} />;
          }
        })}
      </Container>
    ),
    [props.review.rating]
  );

  return (
    <List key={props.review.id} xs={1} lg={2} elementWidth="auto" gap="3rem">
      <Container styleConfig={{ gap: '1rem' }}>
        <Container>
          <Text fontSize="lg" bold>
            {props.review.username}
          </Text>
          <Text fontSize="sm">{props.review.creationDate.toUTCString()}</Text>
        </Container>
        <Container styleConfig={{ gap: '0.5rem' }}>
          <StarsWrapper sm="max-content">{createdStars}</StarsWrapper>
          <Text fontSize="sm">{t('starRating', { stars: props.review.rating })}</Text>
        </Container>
      </Container>
      <Container styleConfig={{ gap: '1rem' }}>
        <Text fontSize="lg" bold>
          {props.review.comment ??
            // eslint-disable-next-line max-len
            'Wanted to say how amazing my experience was at [CarShop]. We did everything online, and the truck was delivered to my door... Awesome!'}
        </Text>
        <Text>{t('via', { platform: props.review.platform })}</Text>
      </Container>
    </List>
  );
};

const StyledLine = styled(Line)`
  border-color: #232323;
  border-width: 4px;
  border-image: none;
`;

const Reviews: React.FC = () => {
  const t = useTranslation('home.reviews');

  return (
    <>
      <WhiteBackgroundContainer>
        <Container
          xs={PAGE_MAX_WIDTH}
          styleConfig={{ gap: '3rem', padding: { left: 'md', right: 'md' }, centered: true }}
          lgStyle={{ gap: '6rem' }}
        >
          <BoxAnimation>
            <Title centered fontSize="2xl" title={t('title')} />
          </BoxAnimation>
          <BoxAnimation>
            <Carousel noArrows noChangeOptions>
              {reviews.map((review) => {
                return <Review key={review.id} review={review} />;
              })}
            </Carousel>
          </BoxAnimation>
        </Container>
      </WhiteBackgroundContainer>
      <StyledLine />
    </>
  );
};

export default Reviews;
