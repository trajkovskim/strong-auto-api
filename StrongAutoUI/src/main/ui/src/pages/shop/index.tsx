import ShopProductCard from 'components/card/ShopProductCard';
import { Button, Container, Spinner, Text } from 'components/common';
import { setVehicleFiltersAction, VehicleFiltersForm } from 'context/vehicles';
import { VehiclesResponse } from 'generated';
import { useApplicationContext, useRequest } from 'hooks';
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
  const totalContentNumber = 34792;
  const [page] = useState<number>(0);
  const [totalPages] = useState<number>();
  const [filtersSidebarShow, setFiltersSidebarShow] = useState<boolean>(false);
  const [sortAndSizeSidebarShow, setSortAndSizeSidebarShow] = useState<boolean>(false);
  const { send, loading } = useRequest();
  const [vehiclesResponse, setVehiclesResponse] = useState<VehiclesResponse>();
  const { getState, dispatch } = useApplicationContext();

  const filters = getState().vehicles.filters;
  const setFilters = useCallback(
    (filters: VehicleFiltersForm) => dispatch(setVehicleFiltersAction(filters)),
    [dispatch]
  );

  useEffect(() => {
    if (location.state?.resetFilters) {
      setFilters({});
      delete location.state?.resetFilters;
      return;
    }

    const priceSplit = filters.price?.split('-');

    send(
      searchVehicles({
        vehicleFilters: {
          ...filters,
          priceFrom: priceSplit?.[0],
          priceTo: priceSplit?.[1] === 'any' ? undefined : priceSplit?.[1],
        },
        page,
        size: pageSize,
        sortBy: sortBy ? [sortBy] : undefined,
      }).then(setVehiclesResponse)
    );
  }, [filters, location.state?.resetFilters, page, pageSize, send, setFilters, sortBy]);

  const listHeaderComponent = (
    <ListHeader
      onFiltersClick={() => setFiltersSidebarShow(true)}
      filtersOpen={filtersSidebarShow}
      onPaginationClick={() => setSortAndSizeSidebarShow(true)}
      page={page}
      pageSize={pageSize}
      onPageSizeChange={setPageSize}
      onSortByChange={setSortBy}
      totalContentNumber={totalContentNumber}
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
            <Text fontSize="md">Pagination</Text>
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
          {loading && <Spinner centered />}
          {!loading && (
            <Container styleConfig={{ gap: '1rem', direction: 'row', wrap: true }}>
              {vehiclesResponse?.vehicles.map((product) => (
                <Container xs={12} lg={6} xl={4} key={product.id}>
                  <ShopProductCard
                    key={product.id}
                    onView={() => navigate(Routes.SHOP_VIEW_DETAILS.replace(':id', product.id.toString()))}
                    fullwidth
                    {...product}
                  />
                </Container>
              ))}
            </Container>
          )}
          {!loading && page === totalPages && (
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
