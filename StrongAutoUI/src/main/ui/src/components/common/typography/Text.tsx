import { NEW_LINE_DELIMITER } from 'components/common/typography/constants';
import { StyledText, StyledTextProps } from 'components/common/typography/Text.styled';
import React from 'react';

type Props = React.ComponentProps<'span'> & React.PropsWithChildren & StyledTextProps;
const Text = React.forwardRef<HTMLSpanElement | HTMLLabelElement, Props>(({ children, ...props }, ref) => {
  return (
    <StyledText ref={ref} {...props} hasOnClick={!!props.onClick}>
      {typeof children === 'string' && children.includes(NEW_LINE_DELIMITER)
        ? children.split(NEW_LINE_DELIMITER).map((line, index, allLines) => (
            <span key={index}>
              {line}
              {index !== allLines.length - 1 && <br />}
            </span>
          ))
        : children}
    </StyledText>
  );
});

Text.displayName = 'Text';

export default React.memo(Text);
