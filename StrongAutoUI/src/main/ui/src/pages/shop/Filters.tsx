import {
  Accordion,
  AccordionHandle,
  Autocomplete,
  AutocompleteOption,
  Button,
  Checkbox,
  Container,
  Form,
  FormContext,
  FormContextType,
  StyledSpinner,
  Text,
} from 'components/common';
import { VehicleFiltersForm } from 'context/vehicles';
import { VehicleBodyType, VehicleState } from 'generated';
import { useFetchMakes, useTranslation } from 'hooks';
import {
  convertMakeModelsToOptions,
  convertMakesToOptions,
  convertPricesToOptions,
  convertVehicleColorsToOptions,
  convertVehicleConditionsToOptions,
  convertVehicleDriveTypesToOptions,
  convertVehicleFuelTypesToOptions,
  convertVehicleTransmissionsToOptions,
} from 'pages/utils';
import React, { useRef } from 'react';
import { BiSearch } from 'react-icons/bi';
import { MdCheck, MdClose, MdRestore } from 'react-icons/md';
import styled from 'styled-components';

const CheckboxWrapper = styled(Container)`
  max-height: 400px;
  overflow-y: auto;
`;

const FiltersHeader = styled(Container)`
  background-color: #075ebb;
  color: white;
`;

const StyledFilterAccordion = styled(Accordion)`
  /* background-color: #075ebb;
  color: white; */
`;

type Props = {
  onSubmit?: (values: VehicleFiltersForm) => void;
  onClose?: () => void;
  onReset?: () => void;
  noCloseButton?: boolean;
  filters?: VehicleFiltersForm;
};

const Filters: React.FC<Props> = (props) => {
  const t = useTranslation('inventory.filters');
  const baseT = useTranslation();
  const yearNow = new Date().getFullYear();
  const years = new Array(30).fill(0).map((_, index) => yearNow - index);
  const { fetchModels, loadingGetVehicleMakeEntryRequest, loadingGetVehicleMakesEntriesRequest, makes } =
    useFetchMakes();
  const accordionBasicRef = useRef<AccordionHandle>(null);
  const accordionTechnicalRef = useRef<AccordionHandle>(null);
  const accordionFeaturesRef = useRef<AccordionHandle>(null);

  const handleMakeChange = (
    option: AutocompleteOption | undefined,
    change: FormContextType<VehicleFiltersForm>['change']
  ) => {
    if (!option?.value) {
      change('model', undefined);
    } else {
      fetchModels(option.value);
    }
  };

  return (
    <Form
      initValues={props.filters}
      onSubmit={(values) => {
        props.onClose && props.onClose();
        props.onSubmit && props.onSubmit(values);
      }}
    >
      <Container styleConfig={{ bordered: { right: true, bottom: true } }}>
        <FiltersHeader
          styleConfig={{ justifyContent: 'space-between', direction: 'row', padding: 'md', userSelect: 'none' }}
        >
          <Text
            fontSize="md"
            onClick={() => {
              const accordions = [accordionBasicRef, accordionTechnicalRef, accordionFeaturesRef];
              const notOpened = accordions.filter((accordion) => !accordion.current?.isOpened());

              (notOpened.length ? notOpened : accordions).forEach((accordion) => accordion.current?.toggle());
            }}
          >
            {t('header')}
          </Text>
          <Container styleConfig={{ gap: '1rem', direction: 'row' }}>
            <Button size="md" fullwidth themeType="delete" icon={<MdRestore />} maxContent onClick={props.onReset} />
            <Button type="submit" size="md" fullwidth themeType="success" icon={<MdCheck />} maxContent />
            {!props.noCloseButton && (
              <Button size="md" fullwidth themeType="link" icon={<MdClose />} maxContent onClick={props.onClose} />
            )}
          </Container>
        </FiltersHeader>
        <Container styleConfig={{ padding: 'md', gap: '1rem' }}>
          <StyledFilterAccordion
            styleConfig={{ gap: '0.5rem' }}
            ref={accordionBasicRef}
            defaultState="open"
            header={<Text>{t('basic.title')}</Text>}
          >
            <Container styleConfig={{ gap: '1rem' }}>
              <FormContext.Consumer>
                {({ change, values }) => (
                  <>
                    <Autocomplete
                      fullwidth
                      name="make"
                      placeholder={t('basic.makeInput.placeholder')}
                      label={t('basic.makeInput.label')}
                      size="md"
                      onOptionChange={(option) => handleMakeChange(option, change)}
                      disabled={!makes}
                      rightContainer={loadingGetVehicleMakesEntriesRequest && <StyledSpinner />}
                      options={convertMakesToOptions(makes)}
                    />

                    <Autocomplete
                      fullwidth
                      name="model"
                      placeholder={t('basic.modelInput.placeholder')}
                      label={t('basic.modelInput.label')}
                      size="md"
                      disabled={!(values.make && makes?.[values.make]?.models)}
                      rightContainer={loadingGetVehicleMakeEntryRequest && <StyledSpinner />}
                      options={convertMakeModelsToOptions(makes, values)}
                    />
                  </>
                )}
              </FormContext.Consumer>
              <Autocomplete
                fullwidth
                name="price"
                placeholder={t('basic.priceInput.placeholder')}
                label={t('basic.priceInput.label')}
                size="md"
                options={convertPricesToOptions(baseT)}
              />
              <Container styleConfig={{ gap: '0.5rem' }}>
                {Object.values(VehicleState).map((checkbox) => (
                  <Checkbox
                    key={checkbox}
                    name="states"
                    value={checkbox}
                    label={baseT(`vehicleState.${checkbox}`)}
                    size="sm"
                  />
                ))}
              </Container>
            </Container>
          </StyledFilterAccordion>
          <StyledFilterAccordion
            styleConfig={{ gap: '0.5rem' }}
            ref={accordionTechnicalRef}
            header={<Text>{t('technical.title')}</Text>}
          >
            <Container styleConfig={{ gap: '1rem' }}>
              <Autocomplete
                fullwidth
                name="condition"
                placeholder={t('technical.conditionInput.placeholder')}
                label={t('technical.conditionInput.label')}
                size="md"
                options={convertVehicleConditionsToOptions(baseT)}
              />
              <Container styleConfig={{ gap: '0.5rem' }}>
                <Text fontSize="md">Body Type</Text>
                {Object.values(VehicleBodyType).map((bodyType) => (
                  <Checkbox
                    name="bodyTypes"
                    key={bodyType}
                    label={baseT(`vehicleBodyType.${bodyType}`)}
                    value={bodyType}
                    size="sm"
                  />
                ))}
              </Container>
              <Autocomplete
                fullwidth
                name="transmission"
                placeholder={t('technical.transmissionInput.placeholder')}
                label={t('technical.transmissionInput.label')}
                size="md"
                options={convertVehicleTransmissionsToOptions(baseT)}
              />
              <Autocomplete
                fullwidth
                name="driveType"
                placeholder={t('technical.driveTypeInput.placeholder')}
                label={t('technical.driveTypeInput.label')}
                size="md"
                options={convertVehicleDriveTypesToOptions(baseT)}
              />
              <Container styleConfig={{ gap: '3px', direction: 'row', alignItems: 'center' }}>
                <Autocomplete
                  name="yearFrom"
                  placeholder={t('technical.yearFromInput.placeholder')}
                  label={t('technical.yearFromInput.label')}
                  size="md"
                  options={years.map((year) => ({ value: year.toString() }))}
                />
                <Autocomplete
                  name="yearTo"
                  placeholder={t('technical.yearToInput.placeholder')}
                  label={t('technical.yearToInput.label')}
                  size="md"
                  options={years.map((year) => ({ value: year.toString() }))}
                />
              </Container>
              <Container styleConfig={{ gap: '3px', direction: 'row', alignItems: 'center' }}>
                <Autocomplete
                  name="mileageFrom"
                  placeholder={t('technical.mileageFromInput.placeholder')}
                  label={t('technical.mileageFromInput.label')}
                  size="md"
                  options={years.map((year) => ({ value: year.toString() }))}
                />
                <Autocomplete
                  name="mileageTo"
                  placeholder={t('technical.mileageToInput.placeholder')}
                  label={t('technical.mileageToInput.label')}
                  size="md"
                  options={years.map((year) => ({ value: year.toString() }))}
                />
              </Container>
              <Autocomplete
                name="fuelType"
                fullwidth
                placeholder={t('technical.fuelTypeInput.placeholder')}
                label={t('technical.fuelTypeInput.label')}
                size="md"
                options={convertVehicleFuelTypesToOptions(baseT)}
              />
              <Autocomplete
                name="color"
                fullwidth
                placeholder="Color"
                label="Color"
                size="md"
                options={convertVehicleColorsToOptions(baseT)}
              />
            </Container>
          </StyledFilterAccordion>
          <StyledFilterAccordion
            styleConfig={{ gap: '0.5rem' }}
            ref={accordionFeaturesRef}
            header={<Text>{t('features.title')}</Text>}
          >
            <CheckboxWrapper styleConfig={{ gap: '0.5rem' }}>
              {[
                { value: 'Air conditioner' },
                { value: 'Apple CarPlay' },
                { value: 'Break Assist' },
                { value: 'Heater' },
                { value: 'Power Steering' },
                { value: 'Traction control' },
                { value: 'Bluetooth' },
                { value: 'Bluetooth' },
                { value: 'Bluetooth' },
                { value: 'Bluetooth' },
                { value: 'Bluetooth' },
                { value: 'Bluetooth' },
                { value: 'Bluetooth' },
                { value: 'Bluetooth' },
                { value: 'Bluetooth' },
              ].map((feature, index) => (
                <Checkbox
                  name="features"
                  key={`${feature.value}-${index}`}
                  label={feature.value}
                  value={feature.value}
                  size="sm"
                />
              ))}
            </CheckboxWrapper>
          </StyledFilterAccordion>
          <Container styleConfig={{ gap: '0.5rem', itemsCentered: true }}>
            <Button type="submit" themeType="ghost" fullwidth iconRight={<BiSearch />} iconSize="lg" size="md">
              {t('searchButton')}
            </Button>
            <Button
              maxContent
              themeType="delete"
              iconRight={<MdRestore />}
              iconSize="lg"
              size="md"
              onClick={props.onReset}
            >
              {t('resetButton')}
            </Button>
          </Container>
        </Container>
      </Container>
    </Form>
  );
};

export default Filters;
