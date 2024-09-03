import { Collapse, Container, Text, Title } from 'components/common';
import { useTranslation } from 'hooks';
import { faqQuestions, PAGE_MAX_WIDTH } from 'pages/constants';
import React from 'react';

const FAQ: React.FC = () => {
  const t = useTranslation('home.generalFaq');

  const createQAItem = (faq: (typeof faqQuestions)[number]) => ({
    key: faq.id,
    label: <Text fontSize="lg">{t(faq.question)}</Text>,
    children: <Text fontSize="lg">{t(faq.answer)}</Text>,
  });

  return (
    <Container
      xs={PAGE_MAX_WIDTH}
      styleConfig={{
        centered: true,
        gap: '3rem',
        direction: 'row',
        wrap: true,
        padding: { left: 'md', right: 'md' },
      }}
    >
      <Container xs={12} lg={6}>
        <Title
          fontSize={{ title: '2xl', description: 'lg' }}
          title={t('title')}
          description={t('description')}
          gap="2rem"
        />
      </Container>
      <Container xs={12} lg={6} styleConfig={{ gap: '2rem' }}>
        <Collapse ghost items={faqQuestions.map(createQAItem)} gap="1.5rem" linesBetween />
      </Container>
    </Container>
  );
};

export default FAQ;
