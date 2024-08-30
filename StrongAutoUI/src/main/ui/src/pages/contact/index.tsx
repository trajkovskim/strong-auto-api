import MapLocationImage from 'assets/map-location.jpg';
import {
  BoxAnimation,
  Breadcrumb,
  Button,
  Container,
  Form,
  Image,
  Input,
  List,
  Text,
  Textarea,
  Title,
} from 'components/common';
import { useSocialMedias, useTranslation } from 'hooks';
import { PAGE_MAX_WIDTH } from 'pages/constants';
import React from 'react';
import { BiPhoneCall } from 'react-icons/bi';
import { MdEmail } from 'react-icons/md';
import { call, goto, mailTo } from 'utils';

const Contact: React.FC = () => {
  const t = useTranslation('contact');
  const tBase = useTranslation();
  const socialMedias = useSocialMedias();

  const handleSend = (values: unknown) => {
    console.log(values);
  };

  const telephone = tBase('telephone');
  const email = tBase('email');
  const openHours = tBase('openHours');

  return (
    <Container styleConfig={{ gap: '2rem' }} lgStyle={{ gap: '10rem' }}>
      <Container
        xs={PAGE_MAX_WIDTH}
        styleConfig={{ centered: true, gap: '2rem', padding: { top: 'xl', left: 'md', right: 'md' } }}
        lgStyle={{ gap: '3rem' }}
      >
        <Container
          styleConfig={{ gap: '1rem' }}
          lgStyle={{ gap: '6.5rem', direction: 'row', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Container xs={12} lg={4} lgStyle={{ order: 2 }}>
            <Breadcrumb />
          </Container>
          <Container xs={12} lg={8} lgStyle={{ order: 1 }}>
            <Title title={t('title')} fontSize="2xl" />
          </Container>
        </Container>

        <Container styleConfig={{ gap: '4rem', direction: 'row', wrap: true }}>
          <Container xs={12} lg={8} styleConfig={{ gap: '2rem' }}>
            <Title
              title={t('giveUsAMessage.title')}
              description={t('giveUsAMessage.description')}
              fontSize={{ title: 'xl', description: 'md' }}
              gap="1rem"
            />
            <Form onSubmit={handleSend}>
              <Container styleConfig={{ gap: '1rem' }}>
                <List lg={2} gap="1rem">
                  <Input name="name" size="lg" fullwidth placeholder={t('giveUsAMessage.nameInput.placeholder')} />
                  <Input
                    type="email"
                    name="email"
                    size="lg"
                    fullwidth
                    placeholder={t('giveUsAMessage.emailInput.placeholder')}
                  />
                  <Input
                    type="tel"
                    name="phone"
                    size="lg"
                    fullwidth
                    placeholder={t('giveUsAMessage.phoneInput.placeholder')}
                  />
                  <Input
                    name="subject"
                    size="lg"
                    fullwidth
                    placeholder={t('giveUsAMessage.subjectInput.placeholder')}
                  />
                </List>
                <Container>
                  <Textarea
                    name="message"
                    size="lg"
                    fullwidth
                    rows={10}
                    placeholder={t('giveUsAMessage.messageInput.placeholder')}
                  />
                </Container>
                <Container styleConfig={{ alignSelf: 'end' }}>
                  <Button type="submit" maxContent size="md">
                    {t('giveUsAMessage.sendMessageButton')}
                  </Button>
                </Container>
              </Container>
            </Form>
          </Container>
          <Container xs={12} lg={4} styleConfig={{ gap: '3rem' }}>
            <Container styleConfig={{ gap: '1rem' }}>
              <Text fontSize="xl" bold>
                {t('location.title')}
              </Text>
              <Text fontSize="md">{t('location.description')}</Text>
            </Container>
            <Button
              themeType="link"
              maxContent
              icon={<BiPhoneCall />}
              size="md"
              iconSize="lg"
              onClick={() => call(telephone)}
            >
              <Container styleConfig={{ gap: '0.2rem' }}>
                <Text fontSize="lg">{t('callUs.title')}</Text>
                {telephone}
              </Container>
            </Button>
            <Button
              themeType="link"
              maxContent
              icon={<MdEmail />}
              size="md"
              iconSize="lg"
              onClick={() => mailTo(email)}
            >
              <Container styleConfig={{ gap: '0.2rem' }}>
                <Text fontSize="lg">{t('sendUsAnEmail.title')}</Text>
                {email}
              </Container>
            </Button>
            <Container styleConfig={{ gap: '1rem' }}>
              <Text fontSize="lg" bold>
                {t('socialMedia.title')}
              </Text>
              <Container styleConfig={{ gap: '1rem', direction: 'row' }}>
                {socialMedias.map((socialMedia) => (
                  <Button
                    key={socialMedia.type}
                    themeType="link"
                    maxContent
                    icon={socialMedia.icon}
                    size="lg"
                    iconSize="lg"
                    onClick={() => goto(socialMedia.href)}
                  />
                ))}
              </Container>
            </Container>
            <Container styleConfig={{ gap: '1rem' }}>
              <Text fontSize="lg" bold>
                {t('openHours.title')}
              </Text>
              <Text fontSize="md">{openHours}</Text>
            </Container>
          </Container>
        </Container>
      </Container>
      <Container xs={12}>
        <BoxAnimation>
          <Image height="600px" src={MapLocationImage} objectFit="cover" objectPosition="center center" alt="Map" />
        </BoxAnimation>
      </Container>
    </Container>
  );
};

export default Contact;
