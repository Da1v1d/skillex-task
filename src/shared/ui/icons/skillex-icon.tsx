import type { SVGProps } from "react";

type SkillexIconProps = SVGProps<SVGSVGElement>;

const SkillexIcon = ({ className, ...rest }: SkillexIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 100 89.89"
      className={className}
      aria-hidden
      {...rest}
    >
      <defs>
        <linearGradient
          id="skillex-linear-gradient"
          x1="44.76"
          y1="-4.92"
          x2="45.13"
          y2="91.7"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#ffff54" />
          <stop offset="1" stopColor="#d1f253" />
        </linearGradient>
      </defs>
      <path
        fill="url(#skillex-linear-gradient)"
        d="M75,0H14.89C6.67,0,0,6.66,0,14.89v60.11c0,8.23,6.67,14.89,14.89,14.89h60.11c8.22,0,14.89-6.67,14.89-14.89V14.89c0-8.23-6.67-14.89-14.89-14.89ZM30.55,53.42l-14.66-16.22,14.74-16.22h6.19l-13.61,16.22,13.68,16.22h-6.34ZM23.56,37.19l13.61-16.22h9.19l-14.74,16.3,14.74,16.14h-9.11l-13.69-16.22ZM43.13,68.92l14.74-16.14-14.74-16.3h9.52l13.63,16.23-13.68,16.21h-9.46ZM58.94,68.92h-5.99l13.68-16.21-13.62-16.23h5.86l14.74,16.22-14.65,16.22Z"
      />
    </svg>
  );
};

export default SkillexIcon;
