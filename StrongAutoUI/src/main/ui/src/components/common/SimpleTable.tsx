import React from 'react';
import styled from 'styled-components';

type StyledTableProps = {
  gap?: React.CSSProperties['gap'];
  rowGap?: React.CSSProperties['rowGap'];
  columnGap?: React.CSSProperties['columnGap'];
  maxWidth?: string;
  cellWidth?: string;
};

const StyledTable = styled.table<StyledTableProps>`
  width: 100%;
  max-width: ${(props) => props.maxWidth};

  td {
    width: ${(props) => props.cellWidth};
  }

  tr:nth-child(n + 2) td {
    padding-top: ${(props) => props.columnGap || props.gap};
  }

  tr td:nth-child(n + 2) {
    padding-left: ${(props) => props.rowGap || props.gap};
  }
`;

type Props = StyledTableProps &
  React.ComponentProps<'table'> & {
    data: React.ReactNode[][];
  };

const SimpleTable: React.FC<Props> = (props) => {
  return (
    <StyledTable {...props}>
      {props.data.map((row, index) => (
        <tr key={index}>
          {row.map((col, index) => (
            <td key={index}>{col}</td>
          ))}
        </tr>
      ))}
    </StyledTable>
  );
};

export default SimpleTable;
