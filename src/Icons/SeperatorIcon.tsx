const SeparatorIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="24px"
    height="24px"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="currentColor"
    {...props}
  >
    <path
      d="M3 20C11 20 13 4 21 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);

export default SeparatorIcon;
