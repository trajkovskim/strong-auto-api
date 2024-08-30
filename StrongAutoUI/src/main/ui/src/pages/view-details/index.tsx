import { MiniProductCard } from 'components/card';
import {
  BoxAnimation,
  Button,
  Carousel,
  CarouselHandle,
  Container,
  HorizontalList,
  Icon,
  Image,
  Line,
  List,
  SimpleTable,
  Spinner,
  Text,
  Title,
} from 'components/common';
import PageHeader from 'components/PageHeader';
import { Vehicle, VehiclesResponse, VehicleState } from 'generated';
import { useRequest, useTranslation } from 'hooks';
import { PAGE_MAX_WIDTH } from 'pages/constants';
import React, { useEffect, useRef, useState } from 'react';
import { BiCalendar, BiCheckCircle, BiColorFill, BiPhoneCall } from 'react-icons/bi';
import { BsFuelPump } from 'react-icons/bs';
import { FaCar } from 'react-icons/fa';
import { GiSteeringWheel } from 'react-icons/gi';
import { MdEmail } from 'react-icons/md';
import { SlSpeedometer } from 'react-icons/sl';
import { TbDoor, TbEngine, TbManualGearbox } from 'react-icons/tb';
import { useNavigate, useParams } from 'react-router-dom';
import { Routes } from 'routes';
import { getVehicleEntry, searchVehicles } from 'services/VehicleService';
import styled from 'styled-components';
import { call, formatMoney, formatNumber, mailTo } from 'utils';

const StyledButton = styled(Button)`
  border-radius: 5px;
`;

const CarouselWrapper = styled(Container)`
  border-radius: 5px;
  overflow: hidden;
`;

const ViewDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { send, loading } = useRequest();
  const [product, setProduct] = useState<Vehicle>();
  const [vehiclesResponse, setVehiclesResponse] = useState<VehiclesResponse>();
  const carouselRef = useRef<CarouselHandle>(null);
  const t = useTranslation('viewDetails');
  const tBase = useTranslation();

  useEffect(() => {
    if (!id) {
      return;
    }

    send(
      getVehicleEntry({ id: Number(id) }).then(setProduct),
      searchVehicles({ vehicleFilters: { states: [VehicleState.Featured] } }).then(setVehiclesResponse)
    );
  }, [id, send]);

  if (loading) {
    return <Spinner centered />;
  }

  if (!product) {
    return null;
  }

  const featuresMap = new Map<string, string[]>();
  const featuresWithoutClass = [];

  product.features
    ?.map((feature) => feature.split(':'))
    .forEach((feature) => {
      if (feature.length > 2) {
        return;
      }

      if (feature.length === 2) {
        const featureTitleKey = feature[0];
        const featureValueKey = feature[1];

        if (!featuresMap.has(featureTitleKey)) {
          featuresMap.set(featureTitleKey, []);
        }

        featuresMap.get(featureTitleKey)?.push(featureValueKey);
      } else {
        featuresWithoutClass.push(feature[0]);
      }
    });

  const createTextIcon = (icon: React.ReactNode, text: string) => {
    return (
      <Text fontSize="lg">
        {icon} {text}
      </Text>
    );
  };

  const handleImageClick = (imageIndex: number) => carouselRef.current?.next(imageIndex);

  const imagesHorizontalList = (
    <HorizontalList noAutoScroll gap="10px" chunkGap="1rem" chunkSize={{ xs: 6 }}>
      {product?.images?.map((image, index) => (
        <BoxAnimation key={index}>
          <Image onClick={() => handleImageClick(index)} rounded src={image} height="150px" objectFit="cover" />
        </BoxAnimation>
      ))}
    </HorizontalList>
  );

  return (
    <>
      <PageHeader
        imageSrc={product.images?.length ? product.images[0] : ''}
        styleConfig={{ textAlign: 'center' }}
        lgStyle={{ textAlign: 'left' }}
      >
        <Container styleConfig={{ gap: '2rem' }}>
          <BoxAnimation>
            <Title
              title={product.title}
              description={product.summary}
              fontSize={{ title: 'xl', description: 'md' }}
              bold={{ title: true }}
            />
          </BoxAnimation>
          <BoxAnimation>
            <Container styleConfig={{ wrap: true, direction: 'row', gap: '1rem' }}>
              {product.year && (
                <Button maxContent size="md" themeType="link" icon={<BiCalendar />} iconSize="lg">
                  {product.year}
                </Button>
              )}
              {product.transmission && (
                <Button maxContent size="md" themeType="link" icon={<TbManualGearbox />} iconSize="lg">
                  {tBase(`vehicleTransmission.${product.transmission}`)}
                </Button>
              )}
              {product.fuelType && (
                <Button maxContent size="md" themeType="link" icon={<BsFuelPump />} iconSize="lg">
                  {tBase(`vehicleFuelType.${product.fuelType}`)}
                </Button>
              )}
              {product.mileage && (
                <Button maxContent size="md" themeType="link" icon={<SlSpeedometer />} iconSize="lg">
                  {tBase('vehicleMileage', { mileage: formatNumber(product.mileage) })}
                </Button>
              )}
            </Container>
          </BoxAnimation>
        </Container>
      </PageHeader>
      <Container
        xs={PAGE_MAX_WIDTH}
        styleConfig={{
          centered: true,
          gap: '3rem',
          padding: { bottom: 'xl', top: 'lg' },
          direction: 'row',
          wrap: true,
          relative: true,
          alignItems: 'start',
        }}
        lgStyle={{
          padding: { top: 'xl' },
          gap: '0.5rem',
        }}
      >
        <Container xs={12} lg={8} styleConfig={{ gap: '2rem' }} lgStyle={{ padding: { left: 'md' } }}>
          <BoxAnimation>
            <CarouselWrapper>
              <Carousel minHeight="400px" maxHeight="400px" ref={carouselRef}>
                {product?.images?.map((image, index) => (
                  <BoxAnimation fullheight key={index}>
                    <Image key={index} src={image} height="100%" objectFit="cover" />
                  </BoxAnimation>
                ))}
              </Carousel>
            </CarouselWrapper>
          </BoxAnimation>

          <Container xs={12} lg={0} styleConfig={{ padding: { left: 'md', right: 'md' } }}>
            {imagesHorizontalList}
          </Container>

          <BoxAnimation>
            <Container styleConfig={{ gap: '0.5rem', padding: { left: 'md', right: 'md' } }}>
              <Text fontSize="2xl">{t('description.title')}</Text>
              <Text fontSize="md">{product.description}</Text>
            </Container>
          </BoxAnimation>

          <BoxAnimation>
            <Container
              styleConfig={{ gap: '1rem', direction: 'row', wrap: true, padding: { left: 'md', right: 'md' } }}
            >
              <Container xs={12}>
                <Text fontSize="2xl">{t('carOverview.title')}</Text>
              </Container>
              <Container xs={12} lg={6}>
                <BoxAnimation>
                  <SimpleTable
                    rowGap="1rem"
                    gap="0.5rem"
                    cellWidth="50%"
                    data={[
                      [
                        createTextIcon(<FaCar />, t('carOverview.bodyType')),
                        tBase(`vehicleBodyType.${product.bodyType}`),
                      ],
                      [
                        createTextIcon(<SlSpeedometer />, t('carOverview.mileage')),
                        `${product.mileage && tBase('vehicleMileage', { mileage: formatNumber(product.mileage) })}`,
                      ],
                      [
                        createTextIcon(<BsFuelPump />, t('carOverview.fuelType')),
                        tBase(`vehicleFuelType.${product.fuelType}`),
                      ],
                      [createTextIcon(<BiCalendar />, t('carOverview.year')), product.year],
                      [
                        createTextIcon(<TbManualGearbox />, t('carOverview.transmission')),
                        tBase(`vehicleTransmission.${product.transmission}`),
                      ],
                      [
                        createTextIcon(<GiSteeringWheel />, t('carOverview.driveType')),
                        tBase(`vehicleDriveType.${product.driveType}`),
                      ],
                    ]}
                  />
                </BoxAnimation>
              </Container>
              <Container xs={12} lg={6}>
                <BoxAnimation>
                  <SimpleTable
                    rowGap="1rem"
                    gap="0.5rem"
                    cellWidth="50%"
                    data={[
                      [
                        createTextIcon(<FaCar />, t('carOverview.condition')),
                        tBase(`vehicleCondition.${product.condition}`),
                      ],
                      [createTextIcon(<TbEngine />, t('carOverview.engineSize')), product.engineSize],
                      [createTextIcon(<TbDoor />, t('carOverview.doors')), product.doors],
                      [createTextIcon(<BiColorFill />, t('carOverview.color')), tBase(`color.${product.color}`)],
                    ]}
                  />
                </BoxAnimation>
              </Container>
            </Container>
          </BoxAnimation>

          <Line />

          <BoxAnimation>
            <Container styleConfig={{ gap: '1rem', padding: { left: 'md', right: 'md' } }}>
              <Text fontSize="2xl">{t('features.title')}</Text>
              <List gap="2rem" xs={1} sm={2} justifyContent="space-between">
                {Array.from(featuresMap).map(([featureTitleKey, featureValueKeys]) => (
                  <Container xs={12} key={featureTitleKey} styleConfig={{ gap: '0.5rem', alignItems: 'flex-start' }}>
                    <Container styleConfig={{ gap: '0.3rem' }}>
                      <Text fontSize="xl">{featureTitleKey}</Text>
                      {featureValueKeys.map((valueKey) => (
                        <div key={valueKey}>
                          <Icon icon={<BiCheckCircle />} size="md" />
                          <Text fontSize="md">{valueKey}</Text>
                        </div>
                      ))}
                    </Container>
                  </Container>
                ))}
              </List>
            </Container>
          </BoxAnimation>
        </Container>
        <Container
          xs={12}
          lg={4}
          style={{ position: 'sticky', top: 100 }}
          styleConfig={{ gap: '2rem', padding: { left: 'md', right: 'md' } }}
          lgStyle={{ padding: { right: 'md' } }}
        >
          <Container xs={0} lg={12}>
            {imagesHorizontalList}
          </Container>

          <BoxAnimation>
            <Container styleConfig={{ rounded: true, padding: 'md', gap: '1rem', bordered: true }}>
              <Container styleConfig={{ gap: '0.3rem' }}>
                <Text fontSize="lg">{t('offer')}</Text>
                {product.amount?.totalPromo && (
                  <Container styleConfig={{ gap: '0.5rem', direction: 'row', alignItems: 'end' }}>
                    <Text fontSize="lg" textDecoration="line-through">
                      {formatMoney(product.amount.total)}
                    </Text>
                    <Text fontSize="3xl" bold>
                      {formatMoney(product.amount.totalPromo)}
                    </Text>
                  </Container>
                )}
                {!product.amount?.totalPromo && (
                  <div>
                    <Text fontSize="3xl" bold>
                      {formatMoney(product.amount.total)}
                    </Text>
                  </div>
                )}
                {product.amount?.saving && (
                  <div>
                    <Text fontSize="lg">{t('saving', { saving: formatNumber(product.amount.saving) })}</Text>
                  </div>
                )}
              </Container>
              <StyledButton fullwidth themeType="ghost" size="xl">
                {t('sendMessageButton')}
              </StyledButton>
            </Container>
          </BoxAnimation>

          <BoxAnimation>
            <Container styleConfig={{ rounded: true, gap: '1rem', padding: 'md' }}>
              <Button
                themeType="link"
                maxContent
                icon={<BiPhoneCall />}
                size="lg"
                iconSize="3xl"
                onClick={() => call('+38977648648')}
              >
                +38977648648
              </Button>
              <Button
                themeType="link"
                maxContent
                icon={<MdEmail />}
                size="lg"
                iconSize="3xl"
                onClick={() => mailTo('vane.stamenov@gmail.com')}
              >
                vane.stamenov@gmail.com
              </Button>
            </Container>
          </BoxAnimation>
        </Container>
      </Container>
      <Container
        xs={PAGE_MAX_WIDTH}
        styleConfig={{ centered: true, gap: '3rem', padding: { left: 'md', right: 'md', bottom: 'xl' } }}
      >
        <Line />
        <Title fontSize="xl" title={t('featuredProducts.title')} />
        <HorizontalList gap="2rem" chunkGap="1rem" chunkSize={{ xs: 12, md: 6, lg: 4, xl: 3 }} centered>
          {vehiclesResponse?.vehicles.map((product) => (
            <MiniProductCard
              key={product.id}
              amount={product.amount}
              title={product.title}
              images={product.images}
              summary={product.summary}
              onView={() => navigate(Routes.SHOP_VIEW_DETAILS.replace(':id', product.id.toString()))}
            />
          ))}
        </HorizontalList>
      </Container>
    </>
  );
};

export default ViewDetails;
