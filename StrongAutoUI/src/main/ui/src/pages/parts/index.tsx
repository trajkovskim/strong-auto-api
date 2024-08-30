import AudiA4Image from 'assets/audi-a4.png';
import AudiLogo from 'assets/audi-logo.png';
import { Button, Container, List, Text, Title } from 'components/common';
import Tile from 'pages/parts/Tile';
import React, { useState } from 'react';
import { MdArrowBackIos } from 'react-icons/md';

type GenericTileOption = {
  key: string;
  title: string;
  imageSrc: string;
};

const Parts: React.FC = () => {
  const [selectedMake, setSelectedMake] = useState<string>();
  const [selectedModel, setSelectedModel] = useState<string>();

  const makes: GenericTileOption[] = [
    {
      key: 'audi',
      title: 'Audi',
      imageSrc: AudiLogo,
    },
    {
      key: 'bmw',
      title: 'BMW',
      imageSrc: AudiLogo,
    },
    {
      key: 'fiat',
      title: 'Fiat',
      imageSrc: AudiLogo,
    },
    {
      key: 'mercedes',
      title: 'Mercedes',
      imageSrc: AudiLogo,
    },
    {
      key: 'alfaRomeo',
      title: 'Alfa Romeo',
      imageSrc: AudiLogo,
    },
    {
      key: 'Opel',
      title: 'opel',
      imageSrc: AudiLogo,
    },
  ];

  const models: Record<string, GenericTileOption[]> = {
    audi: [
      { key: 'b7', title: 'B7', imageSrc: AudiA4Image },
      { key: 'b8', title: 'B8', imageSrc: AudiA4Image },
      { key: 'b9', title: 'B9', imageSrc: AudiA4Image },
    ],
    bmw: [
      { key: 'b7', title: 'B7', imageSrc: AudiA4Image },
      { key: 'b7', title: 'B8', imageSrc: AudiA4Image },
      { key: 'b7', title: 'B9', imageSrc: AudiA4Image },
    ],
    fiat: [
      { key: '300', title: '300', imageSrc: AudiA4Image },
      { key: 'albea', title: 'Albea', imageSrc: AudiA4Image },
    ],
  };

  const goBack = () => {
    if (selectedModel) {
      setSelectedModel(undefined);
    } else if (selectedMake) {
      setSelectedMake(undefined);
    }
  };

  return (
    <Container>
      <Container
        sm="1600px"
        styleConfig={{
          centered: true,
          gap: '1rem',
          padding: 'sm',
          relative: true,
        }}
      >
        <Container>
          <Text fontSize="md">Home / Parts </Text>
          <Title
            centered
            title="Parts"
            description={'Get parts for your car'}
            fontSize={{ title: 'xl', description: 'md' }}
            bold={{ title: true }}
          />
        </Container>
        <Button themeType="link" size="md" icon={<MdArrowBackIos />} onClick={goBack}>
          Go back
        </Button>
        {!selectedMake && (
          <List sm={2} md={2} lg={3} xl={5} gap="1rem" justifyContent="center">
            {makes.map((make) => (
              <Tile {...make} key={make.key} onClick={() => setSelectedMake(make.key)} />
            ))}
          </List>
        )}
        {!selectedModel && selectedMake && (
          <List sm={2} md={2} lg={3} xl={5} gap="1rem" justifyContent="center">
            {models[selectedMake].map((model) => (
              <Tile {...model} key={model.key} onClick={() => setSelectedModel(model.key)} />
            ))}
          </List>
        )}
        <List />
      </Container>
    </Container>
  );
};

export default Parts;
