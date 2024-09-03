import ShopProductCard from 'components/card/ShopProductCard';
import { BoxAnimation, Container, Spinner, Text } from 'components/common';
import { setVehicleFiltersAction, VehicleFiltersForm } from 'context/vehicles';
import { VehiclesResponse } from 'generated';
import { useApplicationContext, useLanguage, useRequest, useTranslation } from 'hooks';
import Filters, { FiltersHeader } from 'pages/shop/Filters';
import ListHeader from 'pages/shop/ListHeader';
import Sidebar from 'pages/shop/Sidebar';
import SortAndSizeDropdowns from 'pages/shop/SortAndSizeDropdowns';
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Routes } from 'routes';
import { searchVehicles } from 'services/VehicleService';
import styled from 'styled-components';

const ListActionsMobileWrapper = styled(Container)`
  top: 0;
  background-color: inherit;
  background-color: white;
  box-shadow: 0px -5px 10px 0px rgba(0, 0, 0, 0.2);
`;

const StyledSidebar = styled(Sidebar)`
  .ant-drawer-header {
    background-color: #075ebb;
    color: #fff;
  }

  .ant-drawer-close svg {
    color: #fff !important;
  }

  .ant-drawer-header-title {
    flex-direction: row-reverse;
  }
`;

const Shop: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [pageSize, setPageSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>();

  const [filtersSidebarShow, setFiltersSidebarShow] = useState<boolean>(false);
  const [sortAndSizeSidebarShow, setSortAndSizeSidebarShow] = useState<boolean>(false);
  const { send, loading } = useRequest();

  const [vehiclesResponse, setVehiclesResponse] = useState<VehiclesResponse>();
  const isLastPage = vehiclesResponse?.info?.totalPages === Number(vehiclesResponse?.info?.pageNumber) + 1;

  const { state, dispatch } = useApplicationContext();
  const { language } = useLanguage();
  const t = useTranslation('inventory');

  const filters = state.vehicles.filters;
  const setFilters = useCallback(
    (filters: VehicleFiltersForm) => {
      dispatch(setVehicleFiltersAction(filters));
    },
    [dispatch]
  );

  const sendSearchVehiclesRequest = useCallback(
    (
      filters: VehicleFiltersForm,
      page: number,
      pageSize: number,
      sortBy: string | undefined,
      callback: (response: VehiclesResponse) => void
    ) => {
      return send(
        searchVehicles({
          vehicleFilters: filters,
          page,
          size: pageSize,
          sortBy,
          acceptLanguage: language,
        }).then(callback)
      );
    },
    [language, send]
  );

  useEffect(() => {
    if (location.state?.resetFilters) {
      setFilters({});
      delete location.state?.resetFilters;
      return;
    }

    setVehiclesResponse({ vehicles: [] });

    sendSearchVehiclesRequest(filters, 0, pageSize, sortBy, setVehiclesResponse);
  }, [filters, location.state?.resetFilters, pageSize, sendSearchVehiclesRequest, setFilters, sortBy]);

  const listHeaderComponent = (
    <ListHeader
      onFiltersClick={() => setFiltersSidebarShow(true)}
      filtersOpen={filtersSidebarShow}
      onPaginationClick={() => setSortAndSizeSidebarShow(true)}
      pageInfo={vehiclesResponse?.info}
      resultsShown={vehiclesResponse?.vehicles.length ?? 0}
      loading={loading}
      pageSize={pageSize}
      onPageSizeChange={setPageSize}
      onSortByChange={setSortBy}
    />
  );

  const handleCloseSortAndSizeSidebar = () => setSortAndSizeSidebarShow(false);
  const handleCloseFiltersSidebar = useCallback(() => setFiltersSidebarShow(false), []);
  const clearFilters = useCallback(() => setFilters({}), [setFilters]);

  return (
    <>
      <StyledSidebar
        placement="left"
        open={sortAndSizeSidebarShow}
        onClose={handleCloseSortAndSizeSidebar}
        title={<Text fontSize="md">{t('pagination.title')}</Text>}
      >
        <Container styleConfig={{ gap: '0.5rem', alignItems: 'end' }}>
          <SortAndSizeDropdowns
            fullwidth
            pageSize={pageSize}
            sortBy={sortBy}
            onPageSizeChange={setPageSize}
            onSortByChange={setSortBy}
          />
        </Container>
      </StyledSidebar>

      <StyledSidebar
        placement="left"
        open={filtersSidebarShow}
        onClose={handleCloseFiltersSidebar}
        title={<FiltersHeader onReset={clearFilters} headerProps={{ styleConfig: { padding: { right: 'sm' } } }} />}
      >
        <Filters
          filters={filters}
          onSubmit={setFilters}
          onClose={handleCloseFiltersSidebar}
          onReset={clearFilters}
          noHeader
          innerContainerProps={{ styleConfig: { gap: '1rem', padding: { bottom: 'md' } } }}
        />
      </StyledSidebar>

      <ListActionsMobileWrapper xs={12} lg={0}>
        {listHeaderComponent}
      </ListActionsMobileWrapper>

      <Container xs={12} styleConfig={{ direction: 'row', alignItems: 'flex-start', padding: { bottom: 'xl' } }}>
        <Container xs={0} lg={3} xl={2.5}>
          <Filters
            noCloseButton
            filters={filters}
            onSubmit={setFilters}
            onReset={clearFilters}
            innerContainerProps={{ styleConfig: { gap: '1rem', padding: { left: 'md', right: 'md' } } }}
            headerProps={{ styleConfig: { padding: 'md' } }}
          />
        </Container>
        <Container
          xs={12}
          lg={9}
          xl={9.5}
          styleConfig={{ padding: { left: 'md', right: 'md', top: 'md' }, gap: '2rem' }}
        >
          <Container xs={0} lg={12}>
            {listHeaderComponent}
          </Container>

          <Container styleConfig={{ gap: '1rem', direction: 'row', wrap: true }}>
            {vehiclesResponse?.vehicles.map((product, index, allProducts) => (
              <Container xs={12} lg={6} xl={4} key={product.id}>
                <BoxAnimation
                  onEnter={
                    !loading && !isLastPage && index === allProducts.length - 1
                      ? () =>
                          sendSearchVehiclesRequest(
                            filters,
                            Number(vehiclesResponse.info?.pageNumber) + 1,
                            pageSize,
                            sortBy,
                            (response) => {
                              setVehiclesResponse((prev) => ({
                                ...response,
                                vehicles: [...(prev?.vehicles ?? []), ...response.vehicles],
                              }));
                            }
                          )
                      : undefined
                  }
                >
                  <ShopProductCard
                    key={product.id}
                    onView={() => navigate(Routes.SHOP_VIEW_DETAILS.replace(':id', product.id.toString()))}
                    fullwidth
                    {...product}
                  />
                </BoxAnimation>
              </Container>
            ))}
            {loading && !!vehiclesResponse?.vehicles.length && (
              <Container xs={12} lg={6} xl={4}>
                <Spinner centered />
              </Container>
            )}
          </Container>
          {loading && vehiclesResponse?.vehicles.length === 0 && <Spinner centered />}
          {!loading && isLastPage && (
            <Container styleConfig={{ itemsCentered: true }}>
              <Text fontSize="sm" type="sub">
                All results displayed
              </Text>
            </Container>
          )}
        </Container>
      </Container>
    </>
  );
};

export default Shop;
