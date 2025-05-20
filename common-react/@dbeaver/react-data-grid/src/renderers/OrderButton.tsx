import { clsx, IconButton } from '@dbeaver/ui-kit';

import icons from '@dbeaver/ui-kit/assets/icons/icons.svg?url';

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

  const svgSortAsc = icons + '#icon-sort-asc';
  const svgSortDesc = icons + '#icon-sort-desc';
  const svgSortUnknown = icons + '#icon-sort-unknown';

  const iconSrc = sortState === 'asc' ? svgSortAsc : sortState === 'desc' ? svgSortDesc : svgSortUnknown;

  return (
    <IconButton variant="secondary" size="small" onClick={handleClick} tabIndex={tabIndex} ref={ref} aria-label="Sort">
      <svg className={clsx(sortState && 'tw:text-(--dbv-kit-icon-btn-primary-foreground)')} width="16" height="16" viewBox="0 0 16 16">
        <use width={16} height={16} href={iconSrc} />
      </svg>
    </IconButton>
  );
}
