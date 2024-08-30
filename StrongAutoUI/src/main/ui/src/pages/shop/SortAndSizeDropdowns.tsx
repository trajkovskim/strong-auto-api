import { Dropdown } from 'components/common/form';
import { useTranslation } from 'hooks';
import { convertPageSizeToOptions, convertSortByToOptions } from 'pages/utils';
import React from 'react';

type Props = {
  fullwidth?: boolean;

  onSortByChange?: (sortBy: string) => void;
  onPageSizeChange?: (pageSize: number) => void;
  sortBy?: string;
  pageSize: number;
};

const SortAndSizeDropdowns: React.FC<Props> = (props) => {
  const t = useTranslation('inventory');

  return (
    <>
      <Dropdown
        name="sortBy"
        noBorder
        size="md"
        label={t('pagination.sortByInput.label')}
        fullwidth={props.fullwidth}
        value={props.sortBy}
        onChange={(event) => props.onSortByChange && props.onSortByChange(event.target.value)}
        options={convertSortByToOptions(t)}
      />
      <Dropdown
        name="size"
        noBorder
        size="md"
        label={t('pagination.resultSizeInput.label')}
        fullwidth={props.fullwidth}
        value={props.pageSize}
        onChange={(event) => props.onPageSizeChange && props.onPageSizeChange(Number(event.target.value))}
        options={convertPageSizeToOptions(t)}
      />
    </>
  );
};

export default SortAndSizeDropdowns;
