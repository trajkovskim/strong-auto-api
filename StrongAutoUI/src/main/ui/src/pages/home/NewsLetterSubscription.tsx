import CarInEnvelope from 'assets/car-in-envelope.png';
import { BoxAnimation, Button, Container, Form, Image, Input, Title } from 'components/common';
import { useTranslation } from 'hooks';
import { PAGE_MAX_WIDTH } from 'pages/constants';
import React from 'react';
import styled from 'styled-components';

const StyledCarInEnvelopeImage = styled(Image)`
  border-top-right-radius: 150px;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 150px;
  border-bottom-right-radius: 50px;
`;

const NewsLetterSubscription: React.FC = () => {
  const t = useTranslation('home.newsLetterSubscription');

  const handleSubmit = (values: unknown) => {
    console.log(values);
  };

  return (
    <Container
      xs={PAGE_MAX_WIDTH}
      styleConfig={{
        centered: true,
        direction: 'row',
        wrap: true,
        gap: '3rem',
        padding: { right: 'md', left: 'md' },
      }}
    >
      <Container xs={12} lg={6} xl={5.5} styleConfig={{ gap: '2rem' }}>
        <BoxAnimation>
          <Title
            title={t('title')}
            description={t('description')}
            fontSize={{ title: '2xl', description: 'lg' }}
            gap="2rem"
          />
        </BoxAnimation>
        <BoxAnimation>
          <Form onSubmit={handleSubmit}>
            <Container styleConfig={{ gap: '1rem', alignItems: 'end' }} lgStyle={{ direction: 'row' }}>
              <Input size="md" type="email" fullwidth placeholder={t('emailInput.placeholder')} />
              <Button size="md">{t('subscribeButton')}</Button>
            </Container>
          </Form>
        </BoxAnimation>
      </Container>
      <Container xs={12} lg={6} xl={6.5}>
        <BoxAnimation>
          <StyledCarInEnvelopeImage shadow src={CarInEnvelope} height="400px" objectFit="cover" />
        </BoxAnimation>
      </Container>
    </Container>
  );
};

export default NewsLetterSubscription;
