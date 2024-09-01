import ShopProductCard from 'components/card/ShopProductCard';
import { BoxAnimation, Button, Container, Spinner, Text } from 'components/common';
import { setVehicleFiltersAction, VehicleFiltersForm } from 'context/vehicles';
import { VehiclesResponse } from 'generated';
import { useApplicationContext, useLanguage, useRequest, useTranslation } from 'hooks';
import Filters from 'pages/shop/Filters';
import ListHeader from 'pages/shop/ListHeader';
import Sidebar from 'pages/shop/Sidebar';
import SortAndSizeDropdowns from 'pages/shop/SortAndSizeDropdowns';
import React, { useCallback, useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';
import { Routes } from 'routes';
import { searchVehicles } from 'services/VehicleService';
import styled from 'styled-components';

const ListActionsMobileWrapper = styled(Container)`
  /* position: sticky; */
  top: 0;
  background-color: inherit;
  background-color: white;
  box-shadow: 0px -5px 10px 0px rgba(0, 0, 0, 0.2);
`;

const PaginationHeader = styled(Container)`
  background-color: #075ebb;
  color: white;
`;

const FiltersContainer = styled(Container)`
  /* position: sticky;
  top: 80px; */
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

  const { getState, dispatch } = useApplicationContext();
  const { language } = useLanguage();
  const t = useTranslation('inventory');

  const filters = getState().vehicles.filters;
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
      <Sidebar xs="350px" sm="400px" open={sortAndSizeSidebarShow} onClose={handleCloseSortAndSizeSidebar}>
        <Container styleConfig={{ gap: '0.5rem', alignItems: 'end', minHeight: '100dvh' }}>
          <PaginationHeader xs={12} styleConfig={{ direction: 'row', justifyContent: 'space-between', padding: 'md' }}>
            <Text fontSize="md">{t('pagination.title')}</Text>
            <Button size="md" themeType="link" icon={<MdClose />} maxContent onClick={handleCloseSortAndSizeSidebar} />
          </PaginationHeader>
          <Container xs={12} styleConfig={{ padding: 'md' }}>
            <SortAndSizeDropdowns
              fullwidth
              pageSize={pageSize}
              sortBy={sortBy}
              onPageSizeChange={setPageSize}
              onSortByChange={setSortBy}
            />
          </Container>
        </Container>
      </Sidebar>

      <Sidebar xs="350px" sm="400px" open={filtersSidebarShow} onClose={handleCloseFiltersSidebar}>
        <Filters filters={filters} onSubmit={setFilters} onClose={handleCloseFiltersSidebar} onReset={clearFilters} />
      </Sidebar>

      <ListActionsMobileWrapper xs={12} lg={0}>
        {listHeaderComponent}
      </ListActionsMobileWrapper>

      <Container xs={12} styleConfig={{ direction: 'row', alignItems: 'flex-start', padding: { bottom: 'xl' } }}>
        <FiltersContainer xs={0} lg={3} xl={2.5}>
          <Filters noCloseButton filters={filters} onSubmit={setFilters} onReset={clearFilters} />
        </FiltersContainer>
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
