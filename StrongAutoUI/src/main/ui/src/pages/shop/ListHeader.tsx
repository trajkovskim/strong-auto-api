import { Breadcrumb, Button, Container, Line, Text } from 'components/common';
import { PageInfo } from 'generated/strongauto';
import { useTranslation } from 'hooks';
import SortAndSizeDropdowns from 'pages/shop/SortAndSizeDropdowns';
import React from 'react';
import { BiMenu } from 'react-icons/bi';
import { HiFilter, HiOutlineFilter } from 'react-icons/hi';
import styled from 'styled-components';

const Wrapper = styled(Container)`
  background-color: white;
  box-shadow: rgba(79, 139, 173, 0.12) 0px 4px 20px;
`;

type Props = {
  filtersOpen?: boolean;
  onFiltersClick: () => void;
  onPaginationClick: () => void;
  pageInfo: PageInfo | undefined;
  resultsShown: number;
  loading?: boolean;
} & Omit<React.ComponentProps<typeof SortAndSizeDropdowns>, 'fullwidth'>;

const ListHeader: React.FC<Props> = (props) => {
  const t = useTranslation('inventory');
  const tBase = useTranslation();

  const loadingText = tBase('loading');
  return (
    <Wrapper styleConfig={{ padding: 'md', gap: '1.5rem', bordered: true, rounded: true }} lgStyle={{ padding: 'lg' }}>
      <Container xs={12} styleConfig={{ gap: '1rem' }}>
        <Breadcrumb />
        <Text type="sub" fontSize="sm">
          {t('pagination.resultsShown', {
            results: props.loading ? loadingText : props.resultsShown,
            totalResults: props.loading ? loadingText : props.pageInfo?.totalElements,
          })}
        </Text>
        <Container xs={0} lg={12} styleConfig={{ gap: '1rem', direction: 'row', justifyContent: 'space-between' }}>
          <SortAndSizeDropdowns
            pageSize={props.pageSize}
            sortBy={props.sortBy}
            onSortByChange={props.onSortByChange}
            onPageSizeChange={props.onPageSizeChange}
          />
        </Container>
      </Container>
      <Container styleConfig={{ direction: 'row', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
        <Container xs={'max-content'} lg={0} styleConfig={{ gap: '1rem', direction: 'row' }}>
          <Button
            maxContent
            onClick={props.onFiltersClick}
            icon={props.filtersOpen ? <HiFilter /> : <HiOutlineFilter />}
            themeType="link"
            size="md"
          >
            <Container xs={0} sm="max-content">
              {t('filters.header')}
            </Container>
          </Button>
          <Line type="vertical" />
        </Container>
        <Container xs="max-content" lg={0} styleConfig={{ gap: '1rem', direction: 'row' }}>
          <Line type="vertical" />
          <Button maxContent icon={<BiMenu />} size="xl" themeType="link" onClick={props.onPaginationClick} />
        </Container>
      </Container>
    </Wrapper>
  );
};

export default ListHeader;
