const CodeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
      d="M13.5 6L10 18.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
    <path
      d="M6.5 8.5L3 12L6.5 15.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
    <path
      d="M17.5 8.5L21 12L17.5 15.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);

export default CodeIcon;
