import { Button, clsx } from '@dbeaver/ui-kit';

interface OrderButtonProps {
  attributePosition: number;
  sortState?: 'asc' | 'desc' | null;
  onSort: (attributePosition: number) => void;
}

export function OrderButton({ attributePosition, sortState, onSort }: OrderButtonProps) {
  const handleClick = () => {
    onSort(attributePosition);
  };

  return (
    <div className={clsx(sortState ? 'tw:flex' : 'tw:hidden tw:group-hover:flex', 'tw:items-center tw:justify-between tw:gap-1')}>
      <Button size="small" onClick={handleClick}>
        {sortState ? <div className="tw:flex tw:items-center tw:gap-1">{sortState === 'asc' ? 'asc' : 'desc'}</div> : 'unsorted'}
      </Button>
    </div>
  );
}
