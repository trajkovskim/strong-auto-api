import { Button } from 'components/common';
import { useTranslation } from 'hooks';
import React from 'react';
import { MdOutlinePhoneIphone } from 'react-icons/md';
import { call } from 'utils';

type Props = React.ComponentProps<typeof Button> & {
  label?: boolean;
};

const TelephoneButton: React.FC<Props> = (props) => {
  const t = useTranslation();

  const telephone = t('telephone');
  return (
    <Button
      maxContent
      themeType="link"
      size="lg"
      icon={<MdOutlinePhoneIphone />}
      onClick={() => call(telephone)}
      {...props}
    >
      {props.label && telephone}
    </Button>
  );
};

export default TelephoneButton;
