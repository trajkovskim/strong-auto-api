import { Divider } from 'antd';
import { Accordion, Button, Container, Text } from 'components/common';
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
import styled from 'styled-components';
import theme from 'theme';
import { goto } from 'utils';

const StyledInnerContainer = styled(Accordion)`
  transition: all 200ms;

  button {
    justify-content: start;
  }
`;

const NavOptions = styled(Container)`
  button {
    height: 1.5rem;
  }
`;

type NavigationOptionCreatorProps = {
  option: NavigationOption;
  close: () => void;
  gap?: React.CSSProperties['gap'];
};

const NavigationOptionCreator: React.FC<NavigationOptionCreatorProps> = ({ option, ...props }) => {
  if (!option.options) {
    return (
      <StyledButton
        fullwidth
        size="md"
        iconSize="lg"
        themeType="link"
        icon={option.icon}
        active={option.active}
        {...props}
        onClick={() => {
          option.navigate?.();
          props.close();
        }}
      >
        {option.label}
      </StyledButton>
    );
  }

  return (
    <StyledInnerContainer
      header={option.label}
      buttonProps={{
        onClick: () => undefined,
        icon: option.icon,
        fullwidth: true,
        size: 'md',
        style: { color: option.active ? theme.navigation.activeColor : undefined },
      }}
    >
      <NavOptions styleConfig={{ gap: props.gap, padding: { top: 'md' } }}>
        {Object.values(option.options).map((option) => (
          <NavigationOptionCreator key={option.label} option={option} {...props} />
        ))}
      </NavOptions>
    </StyledInnerContainer>
  );
};

const StyledSidebar = styled(Sidebar)`
  .ant-drawer-header {
    background-color: #232323;

    svg {
      color: #fff !important;
    }
  }

  .ant-drawer-header-title {
    flex-direction: row-reverse;
  }
`;

const MobileNavigation: React.FC = () => {
  const t = useTranslation();
  const [open, setOpen] = useState(false);

  const navOptions = useNavigationOptions();
  const socialMedias = useSocialMedias();

  const close = () => setOpen(false);

  return (
    <>
      <StyledSidebar placement="left" open={open} onClose={() => setOpen(false)} title={<LogoImage />}>
        <LanguageChanger />
        <Divider />
        <StyledNavigationWrapper>
          <NavOptions styleConfig={{ gap: '1.2rem' }}>
            {Object.values(navOptions).map((option) => (
              <NavigationOptionCreator gap="1.2rem" key={option.label} close={close} option={option} />
            ))}
          </NavOptions>
        </StyledNavigationWrapper>
        <Divider />
        <Container styleConfig={{ gap: '1.5rem' }}>
          <TelephoneButton label size="md" iconSize="lg" />
          <EmailButton label size="md" iconSize="lg" />
          <Button maxContent themeType="link" size="md" iconSize="lg" icon={<FaClock />}>
            {t(OPEN_HOURS)}
          </Button>
        </Container>
        <Divider />
        <Container
          styleConfig={{
            padding: { top: 'sm', bottom: 'sm' },
          }}
        >
          <Container
            styleConfig={{
              gap: '1.2rem',
              direction: 'row',
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
      </StyledSidebar>

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
