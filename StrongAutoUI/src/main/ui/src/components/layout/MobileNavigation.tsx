import { Accordion, Button, Container, Line, Text } from 'components/common';
import LanguageChanger from 'components/LanguageChanger';
import EmailButton from 'components/layout/EmailButton';
import LogoImage from 'components/layout/LogoImage';
import { StyledButton, StyledNavigationWrapper } from 'components/layout/Navigation.styled';
import TelephoneButton from 'components/layout/TelephoneButton';
import { NavigationOption, useNavigationOptions, useSocialMedias, useTranslation } from 'hooks';
import { OPEN_HOURS } from 'pages/constants';
import Sidebar from 'pages/shop/Sidebar';
import React, { useState } from 'react';
import { BiMenu } from 'react-icons/bi';
import { FaClock } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import styled from 'styled-components';
import theme from 'theme';
import { goto } from 'utils';

const StyledContainer = styled(Container)`
  background-color: ${theme.navigation.mobile.backgroundColor};
  color: ${theme.navigation.mobile.color};
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
`;

const StyledInnerContainer = styled(Accordion)<{ opened?: boolean }>`
  background-color: ${(props) =>
    props.opened
      ? theme.navigation.mobile.innerOptionsBackgroundColorOpened
      : theme.navigation.mobile.innerOptionsBackgroundColor};
`;

type InnerOptionsProps = {
  option: NavigationOption;
  close: () => void;
};

const NavigationOptionCreator: React.FC<InnerOptionsProps> = (props) => {
  const [open, setOpen] = useState<boolean>(false);

  if (!props.option.options) {
    return (
      <StyledButton
        padding="sm"
        fullwidth
        size="md"
        iconSize="lg"
        themeType="link"
        icon={props.option.icon}
        active={props.option.active}
        onClick={() => {
          props.option.navigate?.();
          props.close();
        }}
      >
        {props.option.label}
      </StyledButton>
    );
  }

  return (
    <StyledInnerContainer
      opened={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      header={props.option.label}
      buttonProps={{
        padding: { left: 'sm', right: 'sm', top: 'sm', bottom: 'sm' },
        icon: props.option.icon,
        size: 'md',
        style: { color: props.option.active ? theme.navigation.activeColor : undefined },
      }}
      gap="0.5rem"
    >
      {Object.values(props.option.options).map((option) => (
        <NavigationOptionCreator key={option.label} close={props.close} option={option} />
      ))}
    </StyledInnerContainer>
  );
};

const MobileNavigation: React.FC = () => {
  const t = useTranslation();
  const [open, setOpen] = useState(false);

  const navOptions = useNavigationOptions();
  const socialMedias = useSocialMedias();

  const close = () => setOpen(false);

  return (
    <>
      <Sidebar xs="330px" open={open} onClose={() => setOpen(false)}>
        <StyledContainer
          styleConfig={{
            minHeight: '100%',
            padding: { top: 'sm', bottom: 'sm' },
            justifyContent: 'space-between',
          }}
        >
          <Container styleConfig={{ gap: '1rem' }}>
            <Container
              styleConfig={{
                direction: 'row',
                padding: { left: 'sm', right: 'md' },
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Container />
              <LogoImage />
              <Button size="lg" themeType="link" icon={<MdClose />} maxContent onClick={close} />
            </Container>
            <Line />
            <Container styleConfig={{ padding: { left: 'sm', right: 'sm' } }}>
              <LanguageChanger />
            </Container>
            <Line />
            <StyledNavigationWrapper>
              <Container styleConfig={{ gap: '1rem' }}>
                {Object.values(navOptions).map((option) => (
                  <Container key={option.label}>
                    <NavigationOptionCreator close={close} option={option} />
                  </Container>
                ))}
              </Container>
            </StyledNavigationWrapper>
            <Line />
            <Container styleConfig={{ gap: '1.5rem', padding: { left: 'sm', right: 'sm' } }}>
              <TelephoneButton label size="md" />
              <EmailButton label size="md" />
              <Button maxContent themeType="link" size="md" icon={<FaClock />}>
                {t(OPEN_HOURS)}
              </Button>
            </Container>
          </Container>
          <Container styleConfig={{ gap: '1rem' }}>
            <Line />
            <Container
              styleConfig={{
                gap: '1.2rem',
                direction: 'row',
                padding: { left: 'sm', right: 'sm' },
                alignItems: 'center',
              }}
            >
              <Text fontSize="sm">{t('followUs')}</Text>
              {socialMedias.map((socialMedia, index) => (
                <Button
                  key={index}
                  themeType="link"
                  maxContent
                  icon={socialMedia.icon}
                  size="xl"
                  onClick={() => goto(socialMedia.href)}
                />
              ))}
            </Container>
          </Container>
        </StyledContainer>
      </Sidebar>

      <Button maxContent themeType="link" icon={<BiMenu />} iconSize="3xl" onClick={() => setOpen(true)} />
    </>
  );
};

export default MobileNavigation;

// {
//   createPortal(
//     <Transition
//       ref={transitionRef}
//       duration="300ms"
//       timingFunction="ease-in-out"
//       transition={{
//         initial: css`
//           overflow: hidden;
//           opacity: 0;
//           z-index: -99;
//           /* transform: translateY(-100%); */
//         `,
//         final: css`
//           /* transform: translateY(0); */
//           opacity: 1;
//           z-index: 99;
//           overflow: auto;
//         `,
//       }}
//     >
//       <MobileContainer
//         styleConfig={{
//           gap: '1rem',
//           padding: 'md',
//           justifyContent: 'space-between',
//         }}
//       >
//         <Container styleConfig={{ gap: '3rem' }}>
//           <Container xs={12} styleConfig={{ direction: 'row', justifyContent: 'space-between' }}>
//             <Container xs={1} />
//             <LogoImage />
//             <Button maxContent icon={<MdClear />} themeType="link" onClick={close} size="3xl" />
//           </Container>
//           <div>{navigation}</div>
//         </Container>

//         <Container styleConfig={{ gap: '0.8rem', alignItems: 'center' }}>
//           <LanguageChanger />
//           <Container>
//             <Button maxContent themeType="link" size="lg" icon={<FaClock />}>
//               {t('openHours')}
//             </Button>
//           </Container>
//           <Container styleConfig={{ gap: '1.5rem', direction: 'row' }}>
//             {socialMedias.map((socialMedia, index) => (
//               <Button
//                 key={index}
//                 themeType="link"
//                 maxContent
//                 icon={socialMedia.icon}
//                 size="lg"
//                 onClick={() => goto(socialMedia.href)}
//               />
//             ))}
//           </Container>
//         </Container>
//       </MobileContainer>
//     </Transition>,
//     portalsElement
//   );
// }
