import { Accordion, BoxAnimation, Container, Line, Text, Title } from 'components/common';
import { useTranslation } from 'hooks';
import { faqQuestions, PAGE_MAX_WIDTH } from 'pages/constants';
import React from 'react';

type FAQAccordionProps = {
  question: React.ReactNode;
  answer: React.ReactNode;
};

export const FAQAccordion: React.FC<FAQAccordionProps> = (props) => {
  return (
    <BoxAnimation>
      <Accordion header={<Text fontSize="lg">{props.question}</Text>} gap="0.5rem">
        <Text fontSize="lg">{props.answer}</Text>
      </Accordion>
    </BoxAnimation>
  );
};

const FAQ: React.FC = () => {
  const t = useTranslation('home.generalFaq');

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
        {faqQuestions.map((faq) => (
          <>
            <FAQAccordion question={t(faq.question)} answer={t(faq.answer)} />
            <Line />
          </>
        ))}
      </Container>
    </Container>
  );
};

export default FAQ;
