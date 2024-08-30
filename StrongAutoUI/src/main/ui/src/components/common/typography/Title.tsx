import Container from 'components/common/Container';
import Text from 'components/common/typography/Text';
import { titleFontSize } from 'components/common/typography/constants';
import { FontSize, TitleAndDescription } from 'components/common/typography/types';
import React from 'react';
import { css, styled } from 'styled-components';

type StyledTitleProps = {
  centered?: boolean;
  line?: boolean;
  bold?: boolean;
  fontSize?: FontSize;
  textAlign?: React.CSSProperties['textAlign'];
};

export const StyledTitle = styled.span<StyledTitleProps>`
  font-size: ${(props) => props.fontSize && titleFontSize[props.fontSize]};
  padding-top: 5px;
  position: relative;
  font-weight: ${(props) => props.bold && 'bold'};
  text-align: ${(props) => props.textAlign};

  ${(props) =>
    props.line &&
    css`
      &::before {
        content: '';
        position: absolute;
        width: 40%;
        bottom: 0;
        border-bottom: 2px solid #dcdcdc;
        left: ${props.centered && '50%'};
        transform: translateX(${props.centered ? '-50%' : '0'});
      }
    `}
`;

type Props = Omit<StyledTitleProps, 'bold' | 'fontSize' | 'textAlign'> & {
  title: string;
  description?: string;
  gap?: string;
  bold?: TitleAndDescription<boolean> | boolean;
  fontSize?: TitleAndDescription<FontSize> | FontSize;
  textAlign?: TitleAndDescription<React.CSSProperties['textAlign']> | React.CSSProperties['textAlign'];
  maxWidth?: TitleAndDescription<string> | string;
  relative?: boolean;
};

const Title: React.FC<Props> = (props) => {
  return (
    <Container
      xs={typeof props.maxWidth === 'string' ? props.maxWidth : undefined}
      styleConfig={{
        relative: props.relative,
        gap: props.gap ?? '0.5rem',
        itemsCentered: props.centered,
        textCentered: props.centered,
        centered: props.centered,
      }}
    >
      <Container xs={typeof props.maxWidth === 'object' ? props.maxWidth.title : undefined}>
        <StyledTitle
          textAlign={typeof props.textAlign === 'object' ? props.textAlign?.title : props.textAlign}
          fontSize={typeof props.fontSize === 'object' ? props.fontSize?.title : props.fontSize}
          bold={typeof props.bold === 'object' ? props.bold?.title : props.bold}
          line={props.line}
          centered={props.centered}
        >
          {props.title}
        </StyledTitle>
      </Container>
      {props.description && (
        <Container xs={typeof props.maxWidth === 'object' ? props.maxWidth.description : undefined}>
          <Text
            textAlign={typeof props.textAlign === 'object' ? props.textAlign?.description : props.textAlign}
            fontSize={typeof props.fontSize === 'object' ? props.fontSize?.description : props.fontSize}
            bold={typeof props.bold === 'object' ? props.bold?.description : props.bold}
          >
            {props.description}
          </Text>
        </Container>
      )}
    </Container>
  );
};

export default React.memo(Title);
