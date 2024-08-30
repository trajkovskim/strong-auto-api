import DpfCleaningImage from 'assets/dpf-cleaning.jpg';
import { Accordion, BoxAnimation, Container, Image, Line, Text, Title } from 'components/common';
import PageHeader from 'components/PageHeader';
import { useTranslation } from 'hooks';
import { DarkBackgroundContainer } from 'pages/common.styled';
import { PAGE_MAX_WIDTH } from 'pages/constants';
import { createList } from 'pages/services/common';
import ContactUs from 'pages/services/ContactUs';
import React from 'react';
import { createListFromTranslations } from 'utils';

const DpfCleaningService: React.FC = () => {
  const t = useTranslation('services.dpfCleaningService');

  const howDoIKnowitNeedsCleaningList = createListFromTranslations('howDoIKnowitNeedsCleaning.list', t);
  const cleaningProcessList = createListFromTranslations('cleaningProcess.list', t);

  return (
    <Container styleConfig={{ gap: '3rem', padding: { bottom: 'xl' } }} lgStyle={{ gap: '9rem' }}>
      <PageHeader imageSrc={DpfCleaningImage}>
        <BoxAnimation>
          <Title fontSize="3xl" title={t('header')} />
        </BoxAnimation>
      </PageHeader>
      <Container
        xs={PAGE_MAX_WIDTH}
        styleConfig={{
          padding: { left: 'md', right: 'md' },
          centered: true,
          direction: 'row',
          wrap: true,
          gap: '3rem',
        }}
        lgStyle={{ direction: 'row-reverse' }}
      >
        <Container xs={12} lg={6}>
          <BoxAnimation>
            <Title
              fontSize={{ title: '2xl', description: 'lg' }}
              title={t('title')}
              description={t('description')}
              gap="3rem"
            />
          </BoxAnimation>
        </Container>
        <Container xs={12} lg={6}>
          <BoxAnimation>
            <Image src={DpfCleaningImage} objectFit="cover" height="100%" rounded />
          </BoxAnimation>
        </Container>
      </Container>
      <DarkBackgroundContainer styleConfig={{ padding: { top: 'xl', bottom: 'xl' } }}>
        <Container
          xs={PAGE_MAX_WIDTH}
          styleConfig={{ padding: { left: 'md', right: 'md' }, centered: true, gap: '3rem' }}
        >
          <BoxAnimation>
            <Title fontSize="xl" title={t('cleaningProcess.title')} />
          </BoxAnimation>
          {createList(
            cleaningProcessList.items.map((item, index) => (
              <Text key={index} fontSize="md">
                {item}
              </Text>
            )),
            true,
            cleaningProcessList.items.map((_, index) => `${index + 1}.`)
          )}
        </Container>
      </DarkBackgroundContainer>
      <Container
        xs={PAGE_MAX_WIDTH}
        styleConfig={{ padding: { left: 'md', right: 'md' }, centered: true, gap: '3rem' }}
      >
        <BoxAnimation>
          <Accordion header={<Text fontSize="xl">{t('howDoIKnowitNeedsCleaning.title')}</Text>} gap="1rem">
            <Container styleConfig={{ gap: '1.2rem' }}>
              <BoxAnimation>
                <Text fontSize="lg">{howDoIKnowitNeedsCleaningList.title}</Text>
              </BoxAnimation>
              {createList(
                howDoIKnowitNeedsCleaningList.items.map((item, index) => (
                  <Text key={index} fontSize="md">
                    {item}
                  </Text>
                ))
              )}
              <Text fontSize="lg">{t('howDoIKnowitNeedsCleaning.descriptionAfter')}</Text>
            </Container>
          </Accordion>
        </BoxAnimation>
        <Line />
        <BoxAnimation>
          <Accordion header={<Text fontSize="xl">{t('whatCausesDpfBlockage.title')}</Text>} gap="1rem">
            <BoxAnimation>
              <Text fontSize="lg">{t('whatCausesDpfBlockage.description')}</Text>
            </BoxAnimation>
          </Accordion>
        </BoxAnimation>
        <Line />
      </Container>
      <ContactUs />
    </Container>
  );
};

export default DpfCleaningService;
