import { use } from 'react';
import { DataGridCellHeaderContext } from '../DataGridHeaderCellContext.js';
import { useGridReactiveValue } from '../useGridReactiveValue.js';
import { OrderButton } from './OrderButton.js';

interface Props {
  colIdx: number;
}
export function HeaderCellContentRenderer({ colIdx }: Props) {
  const idx = colIdx - 1;
  const cellHeaderContext = use(DataGridCellHeaderContext);
  const headerElement = useGridReactiveValue(cellHeaderContext?.headerElement, idx);
  const getHeaderText = useGridReactiveValue(headerElement ? undefined : cellHeaderContext?.headerText, idx);
  const isColumnSortable = cellHeaderContext?.getColumnSortable?.(idx);
  const onColumnSort = cellHeaderContext?.onColumnSort;
  const sortingState = cellHeaderContext?.getColumnSortingState?.(idx);

  return (
    <div className="tw:flex tw:items-center tw:justify-between tw:gap-1 tw:group">
      <span className="tw:overflow-hidden tw:text-ellipsis">{headerElement ?? getHeaderText ?? ''}</span>
      {isColumnSortable && onColumnSort && <OrderButton attributePosition={idx} sortState={sortingState} onSort={onColumnSort} />}
    </div>
  );
}
