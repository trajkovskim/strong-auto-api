import Logo from 'assets/logo.png';
import { Button, Container, Form, Image, Input, Line, Text, Title } from 'components/common';
import { useSocialMedias, useTranslation } from 'hooks';
import { EMAIL, OPEN_HOURS, PAGE_MAX_WIDTH, TELEPHONE } from 'pages/constants';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes } from 'routes';
import { styled } from 'styled-components';
import { call, goto, mailTo } from 'utils';

const StyledFooter = styled.footer`
  background-color: #232323;
  padding-top: 2rem;
  padding-bottom: 3rem;
  box-shadow: 0px -3px 7px -6px #e5ffc5;
  color: #fff;
`;

const SocialMedias = styled(Container)`
  > svg {
    height: 30px;
    width: 30px;
    filter: drop-shadow(0 0 0.1rem #aaa5a5);
  }
`;

const StyledNewsLetterFormContainer = styled(Container)`
  background-color: #fff;
  border-radius: 5px;
`;

const Footer: React.FC = () => {
  const t = useTranslation('footer');
  const tBase = useTranslation();
  const navigate = useNavigate();
  const socialMedias = useSocialMedias();

  const handleSubmit = (values: unknown) => {
    console.log(values);
  };

  const telephone = tBase(TELEPHONE);
  const email = tBase(EMAIL);
  const openHours = tBase(OPEN_HOURS);

  return (
    <StyledFooter>
      <Container
        xs={PAGE_MAX_WIDTH}
        styleConfig={{ centered: true, gap: '2rem', padding: { left: 'md', right: 'md', top: 'lg', bottom: 'lg' } }}
      >
        <Container
          xs={12}
          styleConfig={{
            direction: 'row',
            wrap: true,
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '2rem',
          }}
        >
          <Container xs={12} lg="max-content">
            <Title title={t('newsLetter.title')} description={t('newsLetter.description')} fontSize="md" />
          </Container>
          <Container xs={12} lg="max-content">
            <Form onSubmit={handleSubmit}>
              <StyledNewsLetterFormContainer
                styleConfig={{
                  padding: 'sm',
                  direction: 'row',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <Input fullwidth size="sm" type="email" placeholder={t('newsLetter.emailInput.placeholder')} noBorder />
                <Button type="submit" size="sm" maxContent>
                  {t('newsLetter.subscribeButton')}
                </Button>
              </StyledNewsLetterFormContainer>
            </Form>
          </Container>
        </Container>
        <Line />
        <Container styleConfig={{ gap: '3rem', wrap: true, direction: 'row' }}>
          <Container xs={12} lg={3.5} styleConfig={{ gap: '2rem', itemsCentered: true }}>
            <Image alt="Logo" shadow objectFit="contain" width="200px" src={Logo} />
            <Text>{t('description')}</Text>
          </Container>
          <Container sm={4} lg={3} styleConfig={{ gap: '2rem' }}>
            <Text type="sub" bold fontSize="sm">
              {t('findUs.title')}
            </Text>
            <Text fontSize="md">{t('findUs.location')}</Text>
            <Text fontSize="md">
              {t('findUs.openHours.title')}
              <br />
              {openHours}
            </Text>
            <SocialMedias styleConfig={{ gap: '1.5rem', direction: 'row', alignItems: 'center' }}>
              <Text fontSize="sm">{tBase('followUs')}</Text>
              {socialMedias.map((socialMedia, index) => (
                <Button
                  key={index}
                  themeType="link"
                  maxContent
                  icon={socialMedia.icon}
                  size="lg"
                  iconSize="xl"
                  onClick={() => goto(socialMedia.href)}
                />
              ))}
            </SocialMedias>
          </Container>
          <Container sm={4} lg={3} styleConfig={{ gap: '2rem' }}>
            <Text type="sub" bold fontSize="sm">
              {t('contacts.title')}
            </Text>
            <Button size="md" maxContent themeType="link" onClick={() => call(telephone)}>
              {t('contacts.general.title')}
              <br />
              {telephone}
            </Button>
            <Button size="md" maxContent themeType="link" onClick={() => mailTo(email)}>
              {t('contacts.email.title')}
              <br />
              {email}
            </Button>
          </Container>
          <Container sm={4} lg={2.5} styleConfig={{ gap: '2rem' }}>
            <Text type="sub" bold fontSize="sm">
              {t('usefulLinks.title')}
            </Text>
            <Container styleConfig={{ gap: '0.5rem' }}>
              <Button size="md" maxContent themeType="link" onClick={() => navigate(Routes.INDEX)}>
                {t('usefulLinks.home')}
              </Button>
              <Button size="md" maxContent themeType="link" onClick={() => navigate(Routes.SHOP)}>
                {t('usefulLinks.shop')}
              </Button>
              <Button size="md" maxContent themeType="link" onClick={() => navigate(Routes.ABOUT_US)}>
                {t('usefulLinks.aboutUs')}
              </Button>
              <Button size="md" maxContent themeType="link" onClick={() => navigate(Routes.CONTACT)}>
                {t('usefulLinks.contact')}
              </Button>
            </Container>
          </Container>
        </Container>
      </Container>
    </StyledFooter>
  );
};
export default Footer;
