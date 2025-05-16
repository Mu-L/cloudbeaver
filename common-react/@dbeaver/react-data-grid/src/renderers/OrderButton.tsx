import { Button, clsx } from '@dbeaver/ui-kit';
import type { ITableConstraint, ITableOrderConstraint } from '../DataGridHeaderCellContext.js';

function isOrderConstraint(constraint: ITableConstraint | ITableOrderConstraint | undefined): constraint is ITableOrderConstraint {
  return !!constraint && 'orderAsc' in constraint && typeof constraint.orderAsc === 'boolean' && typeof constraint.orderPosition === 'number';
}

function getMaxOrderPosition(constraints: (ITableConstraint | ITableOrderConstraint)[]) {
  return Math.max(0, ...constraints.map(constraint => (constraint.orderPosition !== undefined ? constraint.orderPosition + 1 : -1)));
}

function createOrderConstraint(attributePosition: number, orderPosition: number, orderAsc: boolean): ITableOrderConstraint {
  return {
    attributePosition,
    orderPosition,
    orderAsc,
  };
}

function handleSingleColumnSort(
  attributePosition: number,
  constraints: (ITableConstraint | ITableOrderConstraint)[],
): (ITableConstraint | ITableOrderConstraint)[] {
  const existingConstraintIndex = constraints.findIndex(constraint => constraint.attributePosition === attributePosition);
  const hasCurrentConstraint = existingConstraintIndex !== -1;
  const currentConstraint = hasCurrentConstraint ? constraints[existingConstraintIndex] : undefined;
  const newOrderAsc = !currentConstraint ? true : isOrderConstraint(currentConstraint) && currentConstraint.orderAsc ? false : null;

  return newOrderAsc !== null ? [createOrderConstraint(attributePosition, 0, newOrderAsc)] : [];
}

function handleMultiColumnSort(
  attributePosition: number,
  constraints: (ITableConstraint | ITableOrderConstraint)[],
): (ITableConstraint | ITableOrderConstraint)[] {
  const newConstraints = [...constraints];
  const existingConstraintIndex = newConstraints.findIndex(constraint => constraint.attributePosition === attributePosition);

  if (existingConstraintIndex === -1) {
    newConstraints.push(createOrderConstraint(attributePosition, getMaxOrderPosition(newConstraints), true));
  } else {
    const existingConstraint = newConstraints[existingConstraintIndex];
    if (isOrderConstraint(existingConstraint) && existingConstraint.orderAsc) {
      newConstraints[existingConstraintIndex] = {
        ...existingConstraint,
        orderAsc: false,
      };
    } else {
      return reindexOrderPositions(newConstraints.filter((_, index) => index !== existingConstraintIndex));
    }
  }

  return newConstraints;
}

function reindexOrderPositions(constraints: (ITableConstraint | ITableOrderConstraint)[]): (ITableConstraint | ITableOrderConstraint)[] {
  return constraints.map((constraint, index) => {
    if (isOrderConstraint(constraint)) {
      return { ...constraint, orderPosition: index };
    }
    return constraint;
  });
}

interface OrderButtonProps {
  attributePosition: number;
  sortState?: 'asc' | 'desc' | null;
  constraints: (ITableConstraint | ITableOrderConstraint)[];
  onSort: (attributePosition: number, multiple: boolean, constraints: (ITableConstraint | ITableOrderConstraint)[]) => void;
  tabIndex?: number;
  ref: React.Ref<HTMLButtonElement>;
}

export function OrderButton({ attributePosition, sortState, constraints, onSort, tabIndex, ref }: OrderButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const isMultiColumnSort = e.ctrlKey || e.metaKey;
    const currentConstraints = constraints;
    const newConstraints = isMultiColumnSort
      ? handleMultiColumnSort(attributePosition, currentConstraints)
      : handleSingleColumnSort(attributePosition, currentConstraints);
    onSort(attributePosition, isMultiColumnSort, newConstraints);
  };

  return (
    <Button
      variant={sortState ? 'primary' : 'secondary'}
      className={clsx('tw:flex tw:items-center tw:justify-between tw:gap-1')}
      size="small"
      onClick={handleClick}
      tabIndex={tabIndex}
      ref={ref}
    >
      {sortState ? <div className="tw:flex tw:items-center tw:gap-1">{sortState === 'asc' ? '↑' : '↓'}</div> : 'unsorted'}
    </Button>
  );
}
