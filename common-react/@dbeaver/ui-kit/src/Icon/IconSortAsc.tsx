import type { SVGProps } from "react";
const SvgIconSortAsc = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    {...props}
  >
    <defs>
      <style>{".icon-sort-asc_svg__cls-1{fill:#3387c5}"}</style>
    </defs>
    <path d="M2 10h6.79l-3.4-4z" className="icon-sort-asc_svg__cls-1" />
    <path
      d="M4.71 7.33h1.36V18H4.71zM10.14 6H21v1.33H10.14zM10.14 11.33h8.14v1.33h-8.14zM10.14 16.67h5.43V18h-5.43z"
      className="icon-sort-asc_svg__cls-1"
    />
  </svg>
);
export default SvgIconSortAsc;
