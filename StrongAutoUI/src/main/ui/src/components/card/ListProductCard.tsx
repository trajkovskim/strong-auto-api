import ProductCardPrice from 'components/card/ProductCardPrice';
import ProductTitle from 'components/card/ProductTitle';
import { ribbons } from 'components/card/constants';
import { ProductProps as ProductCardProps } from 'components/card/types';
import { Button, Card, Carousel, Container, List, Ribbon, StyledIcon, StyledImage, Text } from 'components/common';
import { Vehicle } from 'generated';
import React from 'react';
import { BiCalendar, BiShare } from 'react-icons/bi';
import { BsBookmark, BsBookmarkCheckFill, BsFuelPumpFill } from 'react-icons/bs';
import { FaRoad } from 'react-icons/fa';
import { FaGear } from 'react-icons/fa6';
import { TbManualGearbox } from 'react-icons/tb';
import { formatNumber } from 'utils';

type Props = ProductCardProps & {
  driveType?: Vehicle['driveType'];
  year?: Vehicle['year'];
};

const ListProductCard: React.FC<Props> = (props) => {
  const attributeStyleConfig = { gap: '5px', alignItems: 'flex-start', padding: 'sm', direction: 'row' } as never;
  const productAttributes = (
    <List gap="1rem" sm={2} md={2} lg={2} xl={3} {...{ '2xl': 5 }} justifyContent="flex-start">
      {props.fuelType && (
        <Container styleConfig={attributeStyleConfig} xs="max-content">
          <StyledIcon size="lg" icon={<BsFuelPumpFill />} />
          <Container>
            <Text type="sub" fontSize="sm">
              Fuel type
            </Text>
            <Text fontSize="md">{props.fuelType}</Text>
          </Container>
        </Container>
      )}
      {props.transmission && (
        <Container styleConfig={attributeStyleConfig} xs="max-content">
          <StyledIcon size="lg" icon={<TbManualGearbox />} />
          <Container>
            <Text type="sub" fontSize="sm">
              Transmission
            </Text>
            <Text fontSize="md">{props.transmission}</Text>
          </Container>
        </Container>
      )}
      {props.mileage && (
        <Container styleConfig={attributeStyleConfig} xs="max-content">
          <StyledIcon size="lg" icon={<FaRoad />} />
          <Container>
            <Text type="sub" fontSize="sm">
              Mileage
            </Text>
            <Text fontSize="md">{formatNumber(props.mileage)}km</Text>
          </Container>
        </Container>
      )}
      {props.year && (
        <Container styleConfig={attributeStyleConfig} xs="max-content">
          <StyledIcon size="lg" icon={<BiCalendar />} />
          <Container>
            <Text type="sub" fontSize="sm">
              Year
            </Text>
            <Text fontSize="md">{props.year}</Text>
          </Container>
        </Container>
      )}
      {props.driveType && (
        <Container styleConfig={attributeStyleConfig} xs="max-content">
          <StyledIcon size="lg" icon={<FaGear />} />
          <Container>
            <Text type="sub" fontSize="sm">
              Year
            </Text>
            <Text fontSize="md">{props.driveType}</Text>
          </Container>
        </Container>
      )}
    </List>
  );

  const body = (
    <Container styleConfig={{ gap: '0.5rem', justifyContent: 'space-between' }} style={{ flex: '1 0 100%' }}>
      <Container>
        <Container styleConfig={{ direction: 'row', padding: { left: 'md' }, justifyContent: 'space-between' }}>
          <ProductTitle title={props.title} summary={props.summary} onView={props.onView} />
          <ProductCardPrice amount={props.amount} />
        </Container>
        <Container styleConfig={{ padding: { left: 'md' } }} xs="max-content">
          {props.state && <Ribbon {...ribbons[props.state]} />}
        </Container>
      </Container>
      <Container styleConfig={{ direction: 'row', gap: '1rem', justifyContent: 'space-between' }}>
        <Container styleConfig={{ padding: { left: 'md' } }}>{productAttributes}</Container>
        <Container
          styleConfig={{
            padding: { left: 'md', right: 'md', top: 'sm', bottom: 'sm' },
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            gap: '1rem',
            direction: 'row',
          }}
        >
          <Button
            themeType="white"
            maxContent
            icon={props.bookmarked ? <BsBookmarkCheckFill /> : <BsBookmark />}
            size="sm"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            Add to favorites
          </Button>
          <Button maxContent icon={<BiShare />} size="md" themeType="white">
            Share this
          </Button>
        </Container>
      </Container>
    </Container>
  );

  const image = (
    <Carousel noArrows minHeight="170px">
      {props.images?.map((image, index) => (
        <StyledImage key={index} shadow objectFit="cover" width="320px" height="100%" src={image} />
      ))}
    </Carousel>
  );

  return (
    <Card styleConfig={{ direction: 'row', bordered: true }} fullwidth={props.fullwidth} body={body} image={image} />
  );
};

export default ListProductCard;
