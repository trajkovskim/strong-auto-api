import { Button, Container, Text } from 'components/common';
import { useTranslation } from 'hooks';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes } from 'routes';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  user-select: none;

  &:hover::before {
    width: 100%;
  }

  &::before {
    content: '';
    border-bottom: 9px #075ebb solid;
    display: block;
    width: 44%;
    height: 10px;
    margin-bottom: 10px;

    transition: 200ms all;
  }

  *:first-child {
    font-size: 5rem;
  }

  *:last-child {
    font-size: 2.5rem;
  }
`;

const NotFound: React.FC = () => {
  const t = useTranslation('notFound');
  const navigate = useNavigate();

  return (
    <Container xs="max-content" styleConfig={{ centered: true, gap: '3rem', itemsCentered: true }}>
      <StyledContainer>
        <Container styleConfig={{ alignItems: 'center' }} lgStyle={{ direction: 'row', gap: '1rem' }}>
          <Text>404</Text>
          <Text nowrap>Not Found</Text>
        </Container>
      </StyledContainer>
      <Button maxContent size="lg" onClick={() => navigate(Routes.INDEX)}>
        {t('backToHomePageButton')}
      </Button>
    </Container>
  );
};

export default NotFound;
