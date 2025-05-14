import { use } from 'react';
import { DataGridCellHeaderContext } from '../DataGridHeaderCellContext.js';
import { useGridReactiveValue } from '../useGridReactiveValue.js';
import { OrderButton } from './OrderButton.js';

interface Props {
  colIdx: number;
}
export function HeaderCellContentRenderer({ colIdx }: Props) {
  const cellHeaderContext = use(DataGridCellHeaderContext);
  const headerElement = useGridReactiveValue(cellHeaderContext?.headerElement, colIdx);
  const getHeaderText = useGridReactiveValue(headerElement ? undefined : cellHeaderContext?.headerText, colIdx);
  const isColumnSortable = cellHeaderContext?.getColumnSortable?.(colIdx);
  const onColumnSort = cellHeaderContext?.onColumnSort;
  const sortingState = cellHeaderContext?.getColumnSortingState?.(colIdx);

  return (
    <div className="tw:flex tw:items-center tw:justify-between tw:gap-1 tw:group">
      {headerElement ?? getHeaderText ?? ''}
      {isColumnSortable && onColumnSort && <OrderButton attributePosition={colIdx} sortState={sortingState} onSort={onColumnSort} />}
    </div>
  );
}
