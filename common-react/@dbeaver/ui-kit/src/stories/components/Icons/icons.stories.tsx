import { IconSortAsc, IconSortDesc, IconSortUnknown } from '../../../Icon/index.js';

export const Icons = () => {
  return (
    <div>
      <h1>Icons</h1>
      <div className="tw:flex tw:gap-4 tw:mb-4">
        <IconSortAsc />
        <IconSortDesc />
        <IconSortUnknown />
      </div>
      <div style={{ display: 'flex', gap: '20px', fontSize: '24px' }}>
        <IconSortAsc />
        <IconSortDesc />
        <IconSortUnknown />
      </div>
    </div>
  );
};
