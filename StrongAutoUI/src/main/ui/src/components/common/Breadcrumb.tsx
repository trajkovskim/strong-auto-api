import Button from 'components/common/Button';
import Container from 'components/common/Container';
import Text from 'components/common/typography/Text';
import { useTranslation } from 'hooks';
import React from 'react';
import { FaHome } from 'react-icons/fa';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Routes } from 'routes';

const Breadcrumb: React.FC = () => {
  const t = useTranslation('breadcrumb');
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const paths: {
    label: string;
    pathname?: string;
    icon?: React.ReactNode;
  }[] = [
    {
      label: t('home'),
      pathname: Routes.INDEX,
      icon: <FaHome />,
    },
  ];

  if (location.pathname.startsWith(Routes.SHOP)) {
    paths.push({ label: t('shop'), pathname: Routes.SHOP });
  }

  if (location.pathname.startsWith(Routes.CONTACT)) {
    paths.push({ label: t('contact'), pathname: Routes.CONTACT });
  }

  if (location.pathname.startsWith(Routes.ABOUT_US)) {
    paths.push({ label: t('aboutUs'), pathname: Routes.ABOUT_US });
  }

  if (location.pathname.startsWith(Routes.TOWING_SERVICE)) {
    paths.push({ label: t('towingService'), pathname: Routes.TOWING_SERVICE });
  }

  if (location.pathname.startsWith(Routes.DPF_CLEANING_SERVICE)) {
    paths.push({ label: t('dpfCleaningService'), pathname: Routes.DPF_CLEANING_SERVICE });
  }

  if (location.pathname.startsWith(Routes.CAR_SERVICE)) {
    paths.push({ label: t('carService'), pathname: Routes.CAR_SERVICE });
  }

  if (id) {
    paths.push({ label: id });
  }

  return (
    <Container styleConfig={{ direction: 'row', gap: '0.3rem', alignItems: 'center' }}>
      {paths.map((path, index) => (
        <>
          {index !== paths.length - 1 ? (
            <Button
              key={path.pathname}
              size="md"
              maxContent
              themeType="link"
              icon={path.icon}
              onClick={() => navigate({ pathname: path.pathname })}
            >
              {path.label}
            </Button>
          ) : (
            <Text fontSize="md">{path.label}</Text>
          )}

          {index !== paths.length - 1 && <Text>{'>'}</Text>}
        </>
      ))}
    </Container>
  );
};

export default Breadcrumb;
