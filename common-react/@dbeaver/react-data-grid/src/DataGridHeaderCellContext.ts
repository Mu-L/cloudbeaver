import { createContext } from 'react';
import type { IGridReactiveValue } from './IGridReactiveValue.js';

export interface ITableConstraint {
  attributePosition: number;
  orderPosition: number;
}

export interface ITableOrderConstraint extends ITableConstraint {
  orderAsc: boolean;
}

export interface IDataGridHeaderCellContext {
  headerElement?: IGridReactiveValue<React.ReactNode, [colIdx: number]>;
  headerText?: IGridReactiveValue<string, [colIdx: number]>;
  getHeaderWidth?: (colIdx: number) => number | string | null;
  getHeaderResizable?: (colIdx: number) => boolean;
  getHeaderHeight?: () => number;
  getHeaderPinned?: (colIdx: number) => boolean;
  getColumnSortingState?: (colIdx: number) => 'asc' | 'desc' | null;
  getColumnSortable?: (colIdx: number) => boolean;
  onColumnSort?: (colIdx: number, multiple: boolean, constraints: (ITableConstraint | ITableOrderConstraint)[]) => void;
  constraints?: IGridReactiveValue<(ITableConstraint | ITableOrderConstraint)[], []>;
}

export const DataGridCellHeaderContext = createContext<IDataGridHeaderCellContext | null>(null);
