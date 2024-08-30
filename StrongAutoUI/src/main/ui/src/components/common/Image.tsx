import React from 'react';
import { styled } from 'styled-components';

type StyledImageProps = {
  centered?: boolean;
  verticalCentered?: boolean;
  objectFit?: React.CSSProperties['objectFit'];
  objectPosition?: React.CSSProperties['objectPosition'];
  shadow?: boolean;
  rounded?: boolean;
};

const StyledImage = styled.img<StyledImageProps & { pointer?: boolean }>`
  display: block;
  object-fit: ${(props) => props.objectFit};
  object-position: ${(props) => props.objectPosition};
  border-radius: ${(props) => props.rounded && '5px'};

  filter: ${(props) => props.shadow && 'drop-shadow(0 0 0.06rem #aaa5a5)'};

  user-select: none;
  max-width: ${(props) => props.width};
  height: ${(props) => props.height};

  width: 100%;

  margin-top: ${(props) => props.verticalCentered && 'auto'};
  margin-bottom: ${(props) => props.verticalCentered && 'auto'};

  margin-left: ${(props) => props.centered && 'auto'};
  margin-right: ${(props) => props.centered && 'auto'};
  cursor: ${(props) => props.pointer && 'pointer'};

  transition: 0.25s;
`;

export type Props = React.ComponentProps<'img'> & StyledImageProps;

const Image: React.FC<Props> = (props) => {
  return <StyledImage draggable="false" rounded={props.rounded} pointer={!!props.onClick} {...props} />;
};

export default Image;
