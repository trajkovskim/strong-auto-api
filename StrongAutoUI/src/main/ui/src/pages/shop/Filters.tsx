import {
  Autocomplete,
  AutocompleteOption,
  Button,
  Checkbox,
  Collapse,
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
import useFetchFeatures from 'hooks/useFetchFeatures';
import {
  convertFeaturesToOptions,
  convertMakeModelsToOptions,
  convertMakesToOptions,
  convertPricesToOptions,
  convertVehicleColorsToOptions,
  convertVehicleConditionsToOptions,
  convertVehicleDriveTypesToOptions,
  convertVehicleFuelTypesToOptions,
  convertVehicleTransmissionsToOptions,
  convertYearsToOptions,
} from 'pages/utils';
import React from 'react';
import { BiSearch } from 'react-icons/bi';
import { MdCheck, MdRestore } from 'react-icons/md';
import styled from 'styled-components';

const CheckboxWrapper = styled(Container)`
  max-height: 400px;
  overflow-y: auto;
`;

const StyledFiltersHeader = styled(Container)`
  background-color: #075ebb;
  color: white;
`;

type FiltersHeaderProps = {
  onReset?: () => void;
  onSubmit?: (values: VehicleFiltersForm) => void;
  headerProps?: React.ComponentProps<typeof Container>;
};

export const FiltersHeader: React.FC<FiltersHeaderProps> = (props) => {
  const t = useTranslation('inventory.filters');

  return (
    <StyledFiltersHeader
      {...props.headerProps}
      styleConfig={{
        justifyContent: 'space-between',
        direction: 'row',
        userSelect: 'none',
        ...props.headerProps?.styleConfig,
      }}
    >
      <Text fontSize="md">{t('header')}</Text>
      <Container styleConfig={{ gap: '1rem', direction: 'row' }}>
        <Button size="md" fullwidth themeType="delete" icon={<MdRestore />} maxContent onClick={props.onReset} />
        <Button
          type="submit"
          form="vehicle-filters-form"
          size="md"
          fullwidth
          themeType="success"
          icon={<MdCheck />}
          maxContent
        />
      </Container>
    </StyledFiltersHeader>
  );
};

type Props = {
  onSubmit?: (values: VehicleFiltersForm) => void;
  onClose?: () => void;
  onReset?: () => void;
  noCloseButton?: boolean;
  filters?: VehicleFiltersForm;
  noHeader?: boolean;
  headerProps?: Omit<React.ComponentProps<typeof Container>, 'ref'>;
  innerContainerProps?: Omit<React.ComponentProps<typeof Container>, 'ref'>;
};

const Filters: React.FC<Props> = (props) => {
  const t = useTranslation('inventory.filters');
  const baseT = useTranslation();
  const { fetchModels, loadingGetVehicleMakeEntryRequest, loadingGetVehicleMakesEntriesRequest, makes } =
    useFetchMakes();
  const { features, loadingGetVehicleFeatureEntriesRequest } = useFetchFeatures();

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

  const handleReset = () => {
    props.onReset && props.onReset();
    props.onClose && props.onClose();
  };

  return (
    <Form
      initValues={props.filters}
      onSubmit={(values) => {
        console.log(values);
        props.onClose && props.onClose();
        props.onSubmit && props.onSubmit(values);
      }}
      id="vehicle-filters-form"
    >
      <Container styleConfig={{ gap: '1rem' }}>
        {!props.noHeader && <FiltersHeader onReset={handleReset} headerProps={props.headerProps} />}
        <Container {...props.innerContainerProps}>
          <Collapse
            gap="1rem"
            expandIconPosition="end"
            ghost
            defaultActiveKey="basic"
            items={[
              {
                key: 'basic',
                label: <Text fontSize="md">{t('basic.title')}</Text>,
                children: (
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
                          valueAsArray
                          label={baseT(`vehicleState.${checkbox}`)}
                          size="sm"
                        />
                      ))}
                    </Container>
                  </Container>
                ),
              },
              {
                key: 'technical',
                label: <Text fontSize="md">{t('technical.title')}</Text>,
                children: (
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
                          valueAsArray
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
                        options={convertYearsToOptions()}
                      />
                      <Autocomplete
                        name="yearTo"
                        placeholder={t('technical.yearToInput.placeholder')}
                        label={t('technical.yearToInput.label')}
                        size="md"
                        options={convertYearsToOptions()}
                      />
                    </Container>
                    <Container styleConfig={{ gap: '3px', direction: 'row', alignItems: 'center' }}>
                      <Autocomplete
                        name="mileageFrom"
                        placeholder={t('technical.mileageFromInput.placeholder')}
                        label={t('technical.mileageFromInput.label')}
                        size="md"
                        options={convertYearsToOptions()}
                      />
                      <Autocomplete
                        name="mileageTo"
                        placeholder={t('technical.mileageToInput.placeholder')}
                        label={t('technical.mileageToInput.label')}
                        size="md"
                        options={convertYearsToOptions()}
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
                ),
              },
              {
                key: 'features',
                label: <Text fontSize="md">{t('features.title')}</Text>,
                children: (
                  <CheckboxWrapper styleConfig={{ gap: '0.5rem' }}>
                    {loadingGetVehicleFeatureEntriesRequest && <StyledSpinner />}
                    {convertFeaturesToOptions(features ?? [])?.map((feature) => (
                      <Checkbox
                        name="features"
                        key={feature.value}
                        label={feature.label}
                        value={feature.value}
                        valueAsArray
                        size="sm"
                      />
                    ))}
                  </CheckboxWrapper>
                ),
              },
            ]}
          />
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
              onClick={handleReset}
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
