import { Button } from 'components/common';
import React from 'react';
import { MdArrowBackIosNew } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';
import { Routes } from 'routes';

const BackButton: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    const lastSlashIndex = location.pathname.lastIndexOf('/');

    if (lastSlashIndex === -1) {
      navigate(Routes.INDEX);
      return;
    }

    const backLocation = location.pathname.substring(0, lastSlashIndex);
    navigate(backLocation);
  };

  return (
    <Button
      icon={<MdArrowBackIosNew />}
      size="md"
      themeType="link"
      style={{ position: 'relative', left: '16px' }}
      onClick={handleClick}
    >
      Back
    </Button>
  );
};

export default BackButton;
