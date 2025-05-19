import type { SVGProps } from "react";
const SvgIconCross = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      fillRule="evenodd"
      d="M3.316 3.316a1.08 1.08 0 0 0 0 1.526L10.474 12l-7.158 7.158a1.08 1.08 0 0 0 1.526 1.526L12 13.526l7.158 7.158a1.08 1.08 0 0 0 1.526-1.526L13.526 12l7.158-7.158a1.08 1.08 0 0 0-1.526-1.526L12 10.474 4.842 3.316a1.08 1.08 0 0 0-1.526 0"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgIconCross;
