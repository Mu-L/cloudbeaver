import { use, useRef } from 'react';
import { DataGridCellHeaderContext } from '../DataGridHeaderCellContext.js';
import { useGridReactiveValue } from '../useGridReactiveValue.js';
import { OrderButton } from './OrderButton.js';

interface Props {
  colIdx: number;
  tabIndex?: number;
}
export function HeaderCellContentRenderer({ colIdx, tabIndex }: Props) {
  const attributePosition = colIdx - 1;
  const cellHeaderContext = use(DataGridCellHeaderContext);
  const headerElement = useGridReactiveValue(cellHeaderContext?.headerElement, colIdx);
  const getHeaderText = useGridReactiveValue(headerElement ? undefined : cellHeaderContext?.headerText, colIdx);
  const constraints = useGridReactiveValue(cellHeaderContext?.constraints);
  const isColumnSortable = cellHeaderContext?.getColumnSortable?.(colIdx);
  const onColumnSort = cellHeaderContext?.onColumnSort;
  const sortingState = cellHeaderContext?.getColumnSortingState?.(attributePosition);

  const orderButtonRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab' && !e.shiftKey && isColumnSortable && onColumnSort && orderButtonRef.current !== document.activeElement) {
      e.preventDefault();
      e.stopPropagation();
      orderButtonRef.current?.focus();
    }
  };

  return (
    <div tabIndex={tabIndex} onKeyDown={handleKeyDown} className="tw:w-full tw:flex tw:items-center tw:justify-between tw:gap-1 tw:outline-none">
      <span className="tw:overflow-hidden tw:text-ellipsis">{headerElement ?? getHeaderText ?? ''}</span>
      {isColumnSortable && onColumnSort && (
        <OrderButton
          ref={orderButtonRef}
          attributePosition={attributePosition}
          sortState={sortingState}
          onSort={onColumnSort}
          constraints={constraints || []}
        />
      )}
    </div>
  );
}
