import React from "react";

export const FileIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 384 512"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.3 0-24-10.7-24-24zm121-31L279 7c-4.5-4.5-10.6-7-17-7h-6.1v128H368v-6.1c0-6.4-2.5-12.5-7-17z" />
  </svg>
);

export const TrashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 448 512"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path d="M135.2 17.7C140.8 7 151.8 0 164 0h120c12.2 0 23.2 7 28.8 17.7L328 32H432c8.8 0 16 7.2 16 16s-7.2 16-16 16h-16l-21.2 339.5c-1.6 25.6-22.8 45.5-48.5 45.5H101.7c-25.7 0-46.9-19.9-48.5-45.5L32 64H16C7.2 64 0 56.8 0 48s7.2-16 16-16H120l15.2-14.3zM176 416c8.8 0 16-7.2 16-16V176c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16zm96 0c8.8 0 16-7.2 16-16V176c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16z" />
  </svg>
);

export const FallbackUserIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    viewBox="0 0 448 512"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="User avatar fallback"
    {...props}
  >
    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 0 0 0 256zm89.6 32h-11.7c-22.2 10.3-46.8 16-73.9 16s-51.7-5.7-73.9-16h-11.7A134.4 134.4 0 0 0 8 422.4V464c0 26.5 21.5 48 48 48h336c26.5 0 48-21.5 48-48v-41.6c0-60.9-49.5-110.4-110.4-110.4z" />
  </svg>
);

export const SeparatorIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="4"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="breadcrumbs_separator_icon"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export const ArrowUpIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 320 512"
    fill="currentColor"
    width="20"
    height="20"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path d="M217 136l119 118c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L195 179 84.4 289.1c-9.4 9.4-24.6 9.3-33.9 0s-9.4-24.6 0-33.9L180 130c11-10 17-18 38 7z" />
  </svg>
);

export const CloseIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 24 24">
    <path
      d="M18 6L6 18M6 6l12 12"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);

export const ArrowLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    viewBox="0 0 320 512"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path d="M34.1 239l136-136c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9L101.9 256l102.1 102.1c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-136-136c-9.4-9.4-9.4-24.6 0-34z" />
  </svg>
);

export const ArrowRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    viewBox="0 0 320 512"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path d="M285.9 273L149.9 409c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9L218.1 256 116 153.9c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l136 136c9.4 9.4 9.4 24.6 0 33.9z" />
  </svg>
);

export const StarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 576 512"
    width="20"
    height="20"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path d="M327 34l47 108 121.6 29.5c26.2 3.8 36.7 36 17.7 54.6l-108 86.2 25.9 151.2c4.5 26.2-23 46-46.4 33.7L288 439.6l-96.8 50.6c-23.4 12.3-50.9-7.5-46.4-33.7l25.9-151.2-108-79.2c-19-18.6-8.5-50.8 17.7-54.6L202 142 261 18c11.7-23.6 45.6-23.9 57.3 0z" />
  </svg>
);

export const ChevronDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    viewBox="0 0 448 512"
    fill="currentColor"
    width="10"
    height="10"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path d="M207.029 381.476L12.686 187.132C4.878 179.324 0 168.696 0 157.373 0 146.05 4.878 135.422 12.686 127.614l22.627-22.627c15.164-15.165 39.768-15.165 54.932 0L224 239.314l133.755-134.327c15.164-15.165 39.768-15.165 54.932 0l22.627 22.627c15.165 15.164 15.165 39.768 0 54.932L240.971 381.476c-7.808 7.808-18.436 12.686-29.764 12.686s-21.956-4.878-29.764-12.686z" />
  </svg>
);

export const EyeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 576 512"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    width="5"
    height="5"
    {...props}
  >
    <path d="M572.5 241.4C518.5 135.5 407.5 64 288 64S57.5 135.5 3.5 241.4a48.4 48.4 0 0 0 0 29.1C57.5 376.5 168.5 448 288 448s230.5-71.5 284.5-177.4a48.4 48.4 0 0 0 0-29.2zM288 400c-88.4 0-160-71.6-160-160s71.6-160 160-160 160 71.6 160 160-71.6 160-160 160zm0-272a112 112 0 1 0 112 112A112.1 112.1 0 0 0 288 128z" />
  </svg>
);

export const EyeSlashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    viewBox="0 0 640 512"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    aria-hidden="true"
    focusable="false"
    width="1em"
    height="1em"
    {...props}
  >
    <path d="M320 400c-70.7 0-128-57.3-128-128 0-15.1 2.6-29.6 7.4-43.1L129.4 150.3C75.9 186.8 37.5 240.6 18.4 280.2a48.4 48.4 0 0 0 0 43.6C72.4 429.5 183.4 501 303.9 501c38.2 0 74.6-7.8 108.2-21.5l-70.1-55.4c-7.7 1.3-15.6 2-23.9 2zm317.4-144.8C582.4 82.5 471.4 11 351 11c-33.4 0-66 6.5-96.2 18.2l70.1 55.4C356.7 76.2 370.2 80 384 80c70.7 0 128 57.3 128 128 0 15.1-2.6 29.6-7.4 43.1l69.1 54.8c53.5-36.5 91.9-90.3 111-129.9a48.4 48.4 0 0 0 .7-38.8zM633.8 458.1 34.9 3.4a16 16 0 0 0-22.6 2.6L3.4 25.4a16 16 0 0 0 2.6 22.6l598.9 454.7a16 16 0 0 0 22.6-2.6l8.9-19.4a16 16 0 0 0-2.6-22.6z" />
  </svg>
);

export const BoldIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 512 512"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    aria-hidden="true"
    {...props}
  >
    <path d="M314.5 238.2c26.2-23.5 41.5-57.2 41.5-94.2 0-70.7-57.3-128-128-128H48C39.2 16 32 23.2 32 32v416c0 8.8 7.2 16 16 16h189.5c75.1 0 136.5-61.1 136.5-136 0-38.9-16.1-74.2-42.5-97.8zM112 80h116c30.9 0 56 25.1 56 56s-25.1 56-56 56H112V80zm120 352H112V272h120c30.9 0 56 25.1 56 56s-25.1 56-56 56z" />
  </svg>
);

export const ItalicIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 512 512"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    aria-hidden="true"
    {...props}
  >
    <path d="M204.758 32h-96c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h36.941l-70.524 332H64c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h96c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-36.941l70.524-332H204.758c6.627 0 12-5.373 12-12V44c0-6.627-5.373-12-12-12z" />
  </svg>
);

export const StrikethroughIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    viewBox="0 0 512 512"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    aria-hidden="true"
    {...props}
  >
    <path d="M496 224H336V160h96c8.837 0 16-7.163 16-16v-32c0-8.837-7.163-16-16-16H80c-8.837 0-16 7.163-16 16v32c0 8.837 7.163 16 16 16h96v64H16c-8.837 0-16 7.163-16 16v32c0 8.837 7.163 16 16 16h464c8.837 0 16-7.163 16-16v-32c0-8.837-7.163-16-16-16zm-80 96H160c-8.837 0-16 7.163-16 16v32c0 53.02 42.98 96 96 96h80c53.02 0 96-42.98 96-96v-32c0-8.837-7.163-16-16-16z" />
  </svg>
);

export const CodeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 512 512"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    aria-hidden="true"
    {...props}
  >
    <path d="M414.8 97.1c-7.6-6.9-19.3-6.4-26.2 1.2s-6.4 19.3 1.2 26.2L497.9 256l-108.1 131.5c-6.9 7.6-6.4 19.3 1.2 26.2s19.3 6.4 26.2-1.2l120-144c6-7.2 6-17.6 0-24.8l-120-144zM225.3 134.5c-10.3-2.9-21 3.1-23.8 13.5l-80 288c-2.9 10.3 3.1 21 13.5 23.8s21-3.1 23.8-13.5l80-288c2.9-10.3-3.1-21-13.5-23.8zM210.2 124.5c6.9-7.6 6.4-19.3-1.2-26.2s-19.3-6.4-26.2 1.2l-120 144c-6 7.2-6 17.6 0 24.8l120 144c7.6 6.9 19.3 6.4 26.2-1.2s6.4-19.3-1.2-26.2L70.1 256l140.1-131.5z" />
  </svg>
);

export const ListUlIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 512 512"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    aria-hidden="true"
    {...props}
  >
    <path d="M96 96c0 17.7-14.3 32-32 32S32 113.7 32 96s14.3-32 32-32 32 14.3 32 32zm0 160c0 17.7-14.3 32-32 32s-32-14.3-32-32 14.3-32 32-32 32 14.3 32 32zm0 160c0 17.7-14.3 32-32 32s-32-14.3-32-32 14.3-32 32-32 32 14.3 32 32zM128 112h416c8.8 0 16-7.2 16-16s-7.2-16-16-16H128c-8.8 0-16 7.2-16 16s7.2 16 16 16zm416 128H128c-8.8 0-16 7.2-16 16s7.2 16 16 16h416c8.8 0 16-7.2 16-16s-7.2-16-16-16zm0 160H128c-8.8 0-16 7.2-16 16s7.2 16 16 16h416c8.8 0 16-7.2 16-16s-7.2-16-16-16z" />
  </svg>
);

export const ListOlIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 512 512"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    aria-hidden="true"
    {...props}
  >
    <path d="M96 96H48V80h16c8.8 0 16-7.2 16-16s-7.2-16-16-16H48c-17.7 0-32 14.3-32 32v32c0 8.8 7.2 16 16 16h64c8.8 0 16-7.2 16-16s-7.2-16-16-16zm0 160H58.7l22.2-13.3c7.6-4.6 10-14.5 5.4-22.1s-14.5-10-22.1-5.4l-40 24c-5.1 3-8.2 8.5-8.2 14.4V272c0 8.8 7.2 16 16 16h64c8.8 0 16-7.2 16-16s-7.2-16-16-16zm0 160H80v-16h16c8.8 0 16-7.2 16-16s-7.2-16-16-16H80v-16h16c8.8 0 16-7.2 16-16s-7.2-16-16-16H64c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16zM128 112h416c8.8 0 16-7.2 16-16s-7.2-16-16-16H128c-8.8 0-16 7.2-16 16s7.2 16 16 16zm416 128H128c-8.8 0-16 7.2-16 16s7.2 16 16 16h416c8.8 0 16-7.2 16-16s-7.2-16-16-16zm0 160H128c-8.8 0-16 7.2-16 16s7.2 16 16 16h416c8.8 0 16-7.2 16-16s-7.2-16-16-16z" />
  </svg>
);

export const UndoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 512 512"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    aria-hidden="true"
    {...props}
  >
    <path d="M255.545 8c-66.269.01-129.839 25.803-177.1 72.019L33.941 124.595c-9.058 8.512-2.841 23.161 9.595 23.161h93.6c6.627 0 12 5.373 12 12v36.171c0 8.379-8.093 14.24-16.038 11.579C67.392 179.351 0 230.504 0 288c0 70.692 100.287 160 256 160 91.62 0 192-48.465 192-128 0-39.378-27.498-80.21-83.446-109.76-7.927-4.18-17.806-1.168-21.494 6.484l-17.085 34.17c-4.215 8.428.315 18.693 9.236 22.165C372.002 290.678 384 311.134 384 320c0 35.29-54.98 64-128 64-106.039 0-160-58.6-160-96 0-22.55 24.646-45.189 62.849-60.571C171.866 221.9 192 201.309 192 177.926v-36.17c0-6.627 5.373-12 12-12h93.6c12.436 0 18.653-14.649 9.595-23.161L315.645 80.02C287.774 52.344 252.759 8 255.545 8z" />
  </svg>
);

export const RedoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 512 512"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    aria-hidden="true"
    {...props}
  >
    <path d="M383.9 150.6c0 6.6-5.4 12-12 12h-92.8c-6.6 0-12 5.4-12 12v56.2c0 27.9-20.3 52-48 60.4-38.4 11.9-64 39.1-64 63.7 0 37.4 53.1 96 160 96 73 0 128-28.7 128-64 0-8.9-12-29.4-44.8-45.1-8.9-4.2-12.6-14.9-7.7-23.3l17.1-29.6c4.3-7.4 13.6-10.1 21.2-6.1 54.3 29.4 83.3 70.4 83.3 112.7 0 62.6-86.1 112-192 112-155.6 0-256-89.3-256-160 0-57.5 67.4-108.6 132.1-120.7 7.9-1.5 13.9-8.3 13.9-16.3v-36.2c0-6.6-5.4-12-12-12h-93.6c-12.4 0-18.6-14.9-9.7-23.4l44.5-41.3C153.6 33.6 217.3 8 288 8c9.5 0 18.9 3.4 26.1 9.6l53.5 50.5c9 8.5 2.7 23.4-9.7 23.4h-92.8c-6.6 0-12 5.4-12 12v36.2c0 8 6 14.8 13.9 16.3 64.7 12.1 132.1 63.2 132.1 120.7z" />
  </svg>
);

export const EraserIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 512 512"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    aria-hidden="true"
    {...props}
  >
    <path d="M497.9 273.1 278.6 53.7c-18.7-18.7-49-18.7-67.6 0L17.7 247c-18.7 18.7-18.7 49 0 67.6L185.5 482c18.7 18.7 49 18.7 67.6 0l230.3-230.3c18.8-18.7 18.8-49.1.5-67.6zM244.5 430.5c-6.2 6.2-16.4 6.2-22.6 0L53.5 262.1c-6.2-6.2-6.2-16.4 0-22.6l32-32 209 209-50 50zm72.5-72.5-209-209 49-49c6.2-6.2 16.4-6.2 22.6 0l209 209-72.6 72.6zM480 448H288c-8.8 0-16 7.2-16 16s7.2 16 16 16h192c8.8 0 16-7.2 16-16s-7.2-16-16-16z" />
  </svg>
);
