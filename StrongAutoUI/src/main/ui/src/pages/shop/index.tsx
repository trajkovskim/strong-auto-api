import ShopProductCard from 'components/card/ShopProductCard';
import { Button, Container, Spinner, Text } from 'components/common';
import { setVehicleFiltersAction, VehicleFiltersForm } from 'context/vehicles';
import { VehiclesResponse } from 'generated';
import { useApplicationContext, useLanguage, useRequest, useTranslation } from 'hooks';
import Filters from 'pages/shop/Filters';
import ElementIntersectionObserver from 'pages/shop/LastElementObserver';
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

  const [page, setPage] = useState<number>(0);

  const [filtersSidebarShow, setFiltersSidebarShow] = useState<boolean>(false);
  const [sortAndSizeSidebarShow, setSortAndSizeSidebarShow] = useState<boolean>(false);
  const { send, loading } = useRequest();
  const [vehiclesResponse, setVehiclesResponse] = useState<VehiclesResponse>();
  const { getState, dispatch } = useApplicationContext();
  const { language } = useLanguage();
  const t = useTranslation('inventory');

  const resetPagination = () => {
    setPage(0);
  };

  const filters = getState().vehicles.filters;
  const setFilters = useCallback(
    (filters: VehicleFiltersForm) => {
      dispatch(setVehicleFiltersAction(filters));
      resetPagination();
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

    sendSearchVehiclesRequest(filters, 0, pageSize, sortBy, setVehiclesResponse);
  }, [filters, location.state?.resetFilters, pageSize, sendSearchVehiclesRequest, setFilters, sortBy]);

  const listHeaderComponent = (
    <ListHeader
      onFiltersClick={() => setFiltersSidebarShow(true)}
      filtersOpen={filtersSidebarShow}
      onPaginationClick={() => setSortAndSizeSidebarShow(true)}
      page={page}
      pageSize={pageSize}
      onPageSizeChange={(pageSize) => {
        setPageSize(pageSize);
        resetPagination();
      }}
      onSortByChange={(sortBy) => {
        setSortBy(sortBy);
        resetPagination();
      }}
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
              onSortByChange={setSortBy}
              onPageSizeChange={setPageSize}
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

          {!loading && (
            <Container styleConfig={{ gap: '1rem', direction: 'row', wrap: true }}>
              {vehiclesResponse?.vehicles?.map((product, index, allProducts) => {
                const productCard = (
                  <ShopProductCard
                    key={product.id}
                    onView={() => navigate(Routes.SHOP_VIEW_DETAILS.replace(':id', product.id.toString()))}
                    fullwidth
                    {...product}
                  />
                );

                return (
                  <Container xs={12} lg={6} xl={4} key={product.id}>
                    {vehiclesResponse?.info?.totalPages === page + 1 && index === allProducts.length - 1 ? (
                      productCard
                    ) : (
                      <ElementIntersectionObserver
                        callback={() => {
                          setPage((prev) => prev + 1);
                          sendSearchVehiclesRequest(filters, page + 1, pageSize, sortBy, (response) => {
                            setVehiclesResponse((prev) => ({
                              ...response,
                              vehicles: [...(prev?.vehicles ?? [], response.vehicles)],
                            }));
                          });
                        }}
                      >
                        {productCard}
                      </ElementIntersectionObserver>
                    )}
                  </Container>
                );
              })}
            </Container>
          )}
          {loading && <Spinner centered />}
          {!loading && page + 1 === vehiclesResponse?.info?.totalPages && (
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
