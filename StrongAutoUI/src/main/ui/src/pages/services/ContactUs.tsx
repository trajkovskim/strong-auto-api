import { BoxAnimation, Button, Container, Line, Text, Title } from 'components/common';
import { useTranslation } from 'hooks';
import { PAGE_MAX_WIDTH } from 'pages/constants';
import React from 'react';
import { BsTelephone } from 'react-icons/bs';
import { call } from 'utils';

const ContactUs: React.FC = () => {
  const tBase = useTranslation();
  const t = useTranslation('services');

  const telephone = tBase('telephone');

  return (
    <Container
      xs={PAGE_MAX_WIDTH}
      styleConfig={{
        centered: true,
        direction: 'row',
        wrap: true,
        padding: { left: 'md', right: 'md' },
        gap: '3rem',
      }}
    >
      <Container xs={12} lg={6} styleConfig={{ gap: '3rem' }}>
        <BoxAnimation>
          <Title
            fontSize={{ title: '2xl', description: 'lg' }}
            title={t('contactUs.title')}
            description={t('contactUs.description')}
            gap="3rem"
          />
        </BoxAnimation>
        <Line />
        <BoxAnimation>
          <Button
            size="lg"
            iconSize="3xl"
            themeType="link"
            maxContent
            icon={<BsTelephone />}
            onClick={() => call(telephone)}
          >
            <Container styleConfig={{ gap: '0.5rem' }}>
              <Text>Call us now:</Text>
              <Text>{telephone}</Text>
            </Container>
          </Button>
        </BoxAnimation>
      </Container>
      <Container xs={12} lg={6} />
    </Container>
  );
};

export default ContactUs;
