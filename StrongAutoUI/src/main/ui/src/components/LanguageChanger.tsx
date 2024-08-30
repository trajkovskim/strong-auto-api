import { Container, Dropdown, DropdownOption, Icon } from 'components/common';
import { Language } from 'context/base';
import { useLanguage, useTranslation } from 'hooks';
import React from 'react';
import { CiGlobe } from 'react-icons/ci';
import styled from 'styled-components';

const StyledDropdown = styled(Dropdown)`
  background-color: transparent;
  color: inherit;

  option {
    color: #000;
  }
`;

const LanguageChanger: React.FC = () => {
  const t = useTranslation('languages');
  const { language, changeLanguage } = useLanguage();

  const languageOptions: DropdownOption[] = Object.values(Language).map((value) => ({
    value,
    label: t(value),
  }));

  return (
    <Container styleConfig={{ gap: '0.5rem', direction: 'row', alignItems: 'center' }}>
      <Icon icon={<CiGlobe />} size="sm" />
      <StyledDropdown
        noBorder
        size="default"
        name="lang"
        value={language}
        onChange={(event) => {
          changeLanguage(event.target.value as Language);
        }}
        options={languageOptions}
      />
    </Container>
  );
};

export default LanguageChanger;
