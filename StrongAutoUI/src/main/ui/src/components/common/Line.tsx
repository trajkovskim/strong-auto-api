import styled, { css } from 'styled-components';

const Line = styled.div<{
  type?: 'horizontal' | 'vertical';
  height?: string;
  width?: string;
}>`
  --border-color: #bdb9b976;

  ${(props) =>
    (props.type === 'horizontal' || !props.type) &&
    css`
      border-bottom: 1px solid var(--border-color);
      border-image: linear-gradient(to right, black 0%, #ccc 50%, transparent 100%) 1;
      width: 100%;
      max-width: ${props.width ?? '100%'};
    `}
  ${(props) =>
    props.type === 'vertical' &&
    css`
      border-right: 1px solid var(--border-color);
      min-height: ${props.height ?? '100%'};
    `};
`;

export default Line;
