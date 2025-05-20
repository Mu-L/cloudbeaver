import { IconButton, IconSortAsc, IconSortDesc, IconSortUnknown } from '@dbeaver/ui-kit';

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
    <IconButton
      variant="secondary"
      size="small"
      onClick={handleClick}
      tabIndex={tabIndex}
      ref={ref}
      aria-label='Sort'
    >
      {sortState && (sortState === 'asc' ? <IconSortAsc /> : <IconSortDesc />)}
      {!sortState && <IconSortUnknown />}
    </IconButton>
  );
}
