import {
  BoxAnimation,
  Carousel,
  Container,
  ElementIntersection,
  Icon,
  Line,
  Spinner,
  Text,
  Title,
} from 'components/common';
import { Review } from 'generated/strongauto-reviews';
import { useTranslation } from 'hooks';
import useFetchReviews from 'hooks/useFetchReviews';
import { WhiteBackgroundContainer } from 'pages/common.styled';
import { PAGE_MAX_WIDTH } from 'pages/constants';
import React, { useMemo } from 'react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import styled from 'styled-components';

const StarsWrapper = styled(Container)`
  color: #232323;
`;

const createStars = (rating: number) => (
  <Container styleConfig={{ gap: '0.5rem', direction: 'row' }}>
    {new Array(5).fill(0).map((_, index) => {
      const remainingRating = rating - index;

      if (remainingRating >= 1) {
        return <Icon icon={<BsStarFill />} width="18px" key={index} />;
      } else if (remainingRating > 0 && remainingRating < 1) {
        return <Icon icon={<BsStarHalf />} width="18px" key={index} />;
      } else {
        return <Icon icon={<BsStar />} width="18px" key={index} />;
      }
    })}
  </Container>
);

type SingleReviewProps = {
  review: Review;
};

const SingleReview: React.FC<SingleReviewProps> = (props) => {
  const t = useTranslation('home.reviews');
  const tBase = useTranslation();

  const createdStars = useMemo(() => createStars(props.review.rating ?? 0), [props.review.rating]);

  return (
    <Container
      styleConfig={{ gap: '2rem', direction: 'column', alignItems: 'center', textAlign: 'center' }}
      mdStyle={{
        gap: '2rem',
        direction: 'row',
        alignItems: 'start',
        textAlign: 'start',
        padding: { left: 'lg', right: 'lg' },
      }}
    >
      <Container styleConfig={{ gap: '1rem' }}>
        <Container>
          <Text fontSize="lg" bold>
            {props.review?.reviewer?.displayName}
          </Text>
          <Text fontSize="sm">{props.review?.publishTime}</Text>
        </Container>
        <Container
          xs="max-content"
          styleConfig={{ gap: '0.5rem', alignSelf: 'center' }}
          mdStyle={{ alignSelf: 'start' }}
        >
          <StarsWrapper>{createdStars}</StarsWrapper>
          <Text fontSize="sm">{t('starRating', { stars: props.review.rating })}</Text>
        </Container>
      </Container>
      <Container styleConfig={{ gap: '1rem' }}>
        <Text fontSize="lg" bold>
          {props.review.text}
        </Text>
        <Text>{t('via', { platform: tBase(`reviewPlatform.${props.review.platform}`) })}</Text>
      </Container>
    </Container>
  );
};

const StyledCarousel = styled(Carousel)`
  .slick-prev,
  .slick-next {
    color: #232323;
  }
`;

const StyledLine = styled(Line)`
  border-color: #232323;
  border-width: 4px;
  border-image: none;
`;

const Reviews: React.FC = () => {
  const t = useTranslation('home.reviews');
  const { fetch, reviews, loading } = useFetchReviews();

  return (
    <>
      <ElementIntersection onEnter={fetch}>
        <WhiteBackgroundContainer>
          <Container
            xs={PAGE_MAX_WIDTH}
            styleConfig={{ gap: '3rem', padding: { left: 'md', right: 'md' }, centered: true, userSelect: 'none' }}
            lgStyle={{ gap: '6rem' }}
          >
            <BoxAnimation>
              <Title centered fontSize="2xl" title={t('title')} />
            </BoxAnimation>
            {loading && <Spinner centered />}
            {reviews && (
              <BoxAnimation>
                <StyledCarousel draggable arrows dots={false}>
                  {reviews?.reviews?.map((review, index) => {
                    return <SingleReview key={index} review={review} />;
                  })}
                </StyledCarousel>
              </BoxAnimation>
            )}
          </Container>
        </WhiteBackgroundContainer>
      </ElementIntersection>
      <StyledLine />
    </>
  );
};

export default Reviews;
