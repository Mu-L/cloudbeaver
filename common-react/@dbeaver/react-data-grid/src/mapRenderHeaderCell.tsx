import type { RenderHeaderCellProps } from 'react-data-grid';
import type { IInnerRow } from './IInnerRow.js';
import { HeaderCellContentRenderer } from './renderers/HeaderCellContentRenderer.js';

export function mapRenderHeaderCell({ column, tabIndex }: RenderHeaderCellProps<IInnerRow, unknown>) {
  return <HeaderCellContentRenderer colIdx={column.idx} tabIndex={tabIndex} />;
}
