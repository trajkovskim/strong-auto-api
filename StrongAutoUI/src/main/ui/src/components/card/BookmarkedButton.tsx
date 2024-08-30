import { Button } from 'components/common';
import React from 'react';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';

type Props = {
  bookmarked?: boolean;
  onClick?: React.ComponentProps<typeof Button>['onClick'];
};

const BookmarkedButton: React.FC<Props> = (props) => {
  return (
    <Button
      maxContent
      themeType="link"
      iconSize="lg"
      icon={props.bookmarked ? <MdFavorite /> : <MdFavoriteBorder />}
      onClick={props.onClick}
    />
  );
};

export default BookmarkedButton;
