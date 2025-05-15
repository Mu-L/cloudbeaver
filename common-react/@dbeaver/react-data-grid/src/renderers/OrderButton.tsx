import { Button, clsx } from '@dbeaver/ui-kit';

interface OrderButtonProps {
  attributePosition: number;
  sortState?: 'asc' | 'desc' | null;
  onSort: (attributePosition: number, multiple?: boolean) => void;
  tabIndex?: number;
  ref: React.Ref<HTMLButtonElement>;
}

export function OrderButton({ attributePosition, sortState, onSort, tabIndex, ref }: OrderButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onSort(attributePosition, e.ctrlKey || e.metaKey);
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
