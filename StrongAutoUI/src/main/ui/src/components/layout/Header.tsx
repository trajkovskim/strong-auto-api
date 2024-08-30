import { Button, Container, Text } from 'components/common';
import LanguageChanger from 'components/LanguageChanger';
import EmailButton from 'components/layout/EmailButton';
import TelephoneButton from 'components/layout/TelephoneButton';
import { useSocialMedias, useTranslation } from 'hooks';
import React from 'react';
import { FaClock } from 'react-icons/fa';
import styled from 'styled-components';
import { goto } from 'utils';

const StyledHeader = styled.header`
  background-color: #3d4246;
  color: white;
`;

const Header: React.FC = () => {
  const t = useTranslation();
  const socialMedias = useSocialMedias();

  const openHours = t('openHours');

  return (
    <StyledHeader>
      <Container
        xs={12}
        styleConfig={{
          justifyContent: 'space-between',
          alignItems: 'center',
          direction: 'row',
          gap: '1.5rem',
          padding: { top: 'md', bottom: 'md', left: 'md', right: 'md' },
        }}
      >
        <Container styleConfig={{ gap: '1.5rem', direction: 'row', alignItems: 'center' }}>
          <Text fontSize="sm">{t('followUs')}</Text>
          {socialMedias.map((socialMedia, index) => (
            <Button
              key={index}
              themeType="link"
              maxContent
              icon={socialMedia.icon}
              size="sm"
              onClick={() => goto(socialMedia.href)}
            />
          ))}
        </Container>
        <Container styleConfig={{ direction: 'row', gap: '1.5rem' }}>
          <Container>
            <TelephoneButton label size="sm" />
          </Container>
          <Container>
            <EmailButton label size="sm" />
          </Container>
          <Container>
            <Button maxContent themeType="link" size="sm" icon={<FaClock />}>
              {openHours}
            </Button>
          </Container>
        </Container>
        <Container>
          <LanguageChanger />
        </Container>
      </Container>
    </StyledHeader>
  );
};

export default Header;
