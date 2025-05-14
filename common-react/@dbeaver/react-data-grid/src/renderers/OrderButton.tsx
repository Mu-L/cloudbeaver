import { Button, clsx } from '@dbeaver/ui-kit';

interface OrderButtonProps {
  attributePosition: number;
  sortState?: 'asc' | 'desc' | null;
  onSort: (attributePosition: number, multiple?: boolean) => void;
}

export function OrderButton({ attributePosition, sortState, onSort }: OrderButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onSort(attributePosition, e.ctrlKey || e.metaKey);
  };

  return (
    <div className={clsx(sortState ? 'tw:flex' : 'tw:hidden tw:group-hover:flex', 'tw:items-center tw:justify-between tw:gap-1')}>
      <Button size="small" onClick={handleClick}>
        {sortState ? <div className="tw:flex tw:items-center tw:gap-1">{sortState === 'asc' ? '↑' : '↓'}</div> : 'unsorted'}
      </Button>
    </div>
  );
}
