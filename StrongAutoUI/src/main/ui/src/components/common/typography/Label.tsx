import { StyledLabel, StyledTextProps } from 'components/common/typography/Text.styled';
import React from 'react';

type Props = React.ComponentProps<'label'> & React.PropsWithChildren & StyledTextProps;
const Label = React.forwardRef<HTMLLabelElement, Props>((props, ref) => {
  return <StyledLabel ref={ref} {...props} hasOnClick={!!props.onClick} />;
});

Label.displayName = 'Label';

export default React.memo(Label);
