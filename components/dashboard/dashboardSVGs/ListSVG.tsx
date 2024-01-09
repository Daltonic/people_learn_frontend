import React from "react";

interface CustomIconProps {
  color?: string;
}

const ListSVG: React.FC<CustomIconProps> = ({
  color = "#6A7A99",
  ...props
}) => {
  return (
    <svg
      width="20"
      height="18"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_445_1449)">
        <path
          d="M5.33149 20.1613C4.4485 20.1596 3.60214 19.8053 2.97777 19.1759C2.3534 18.5465 2.0019 17.6933 2.00024 16.8032V3.35809C2.0019 2.46798 2.3534 1.61479 2.97777 0.985385C3.60214 0.355977 4.4485 0.00164177 5.33149 -2.35627e-05H12.0002C12.0931 -0.00910209 12.1868 0.00149398 12.2753 0.031084C12.3638 0.0606739 12.4452 0.108604 12.5143 0.171794C12.5833 0.234984 12.6385 0.312037 12.6763 0.398004C12.7141 0.483971 12.7336 0.576951 12.7336 0.67097C12.7336 0.764988 12.7141 0.857968 12.6763 0.943935C12.6385 1.0299 12.5833 1.10696 12.5143 1.17015C12.4452 1.23334 12.3638 1.28127 12.2753 1.31086C12.1868 1.34045 12.0931 1.35104 12.0002 1.34196H5.33149C4.80106 1.34196 4.29235 1.55438 3.91728 1.93247C3.54221 2.31057 3.33149 2.82338 3.33149 3.35809V16.8032C3.33149 17.3379 3.54221 17.8507 3.91728 18.2288C4.29235 18.6069 4.80106 18.8193 5.33149 18.8193C5.42433 18.8102 5.51801 18.8208 5.60654 18.8504C5.69507 18.88 5.77648 18.9279 5.84554 18.9911C5.9146 19.0543 5.96978 19.1313 6.00755 19.2173C6.04531 19.3033 6.06482 19.3963 6.06482 19.4903C6.06482 19.5843 6.04531 19.6773 6.00755 19.7632C5.96978 19.8492 5.9146 19.9263 5.84554 19.9895C5.77648 20.0526 5.69507 20.1006 5.60654 20.1302C5.51801 20.1598 5.42433 20.1704 5.33149 20.1613Z"
          fill="#6A7A99"
        />
        <path
          d="M14.6689 20.1613H8.00017C7.90734 20.1704 7.81365 20.1598 7.72512 20.1302C7.6366 20.1006 7.55519 20.0526 7.48613 19.9895C7.41707 19.9263 7.36188 19.8492 7.32412 19.7632C7.28635 19.6773 7.26685 19.5843 7.26685 19.4903C7.26685 19.3963 7.28635 19.3033 7.32412 19.2173C7.36188 19.1313 7.41707 19.0543 7.48613 18.9911C7.55519 18.9279 7.6366 18.88 7.72512 18.8504C7.81365 18.8208 7.90734 18.8102 8.00017 18.8193H14.6689C15.1994 18.8193 15.7081 18.6069 16.0831 18.2288C16.4582 17.8507 16.6689 17.3379 16.6689 16.8032V3.35809C16.6689 2.82338 16.4582 2.31057 16.0831 1.93247C15.7081 1.55438 15.1994 1.34196 14.6689 1.34196C14.5761 1.35104 14.4824 1.34045 14.3939 1.31086C14.3053 1.28127 14.2239 1.23334 14.1549 1.17015C14.0858 1.10696 14.0306 1.0299 13.9929 0.943935C13.9551 0.857968 13.9356 0.764988 13.9356 0.67097C13.9356 0.576951 13.9551 0.483971 13.9929 0.398004C14.0306 0.312037 14.0858 0.234984 14.1549 0.171794C14.2239 0.108604 14.3053 0.0606739 14.3939 0.031084C14.4824 0.00149398 14.5761 -0.00910209 14.6689 -2.35627e-05C15.5519 0.00164177 16.3983 0.355977 17.0226 0.985385C17.647 1.61479 17.9985 2.46798 18.0002 3.35809V16.8032C17.9985 17.6933 17.647 18.5465 17.0226 19.1759C16.3983 19.8053 15.5519 20.1596 14.6689 20.1613Z"
          fill="#6A7A99"
        />
        <path
          d="M13.3318 16.4631H9.3756C9.21019 16.4469 9.05668 16.3692 8.94499 16.2452C8.8333 16.1211 8.77142 15.9596 8.77142 15.7921C8.77142 15.6245 8.8333 15.463 8.94499 15.339C9.05668 15.2149 9.21019 15.1372 9.3756 15.1211H13.3443C13.4372 15.112 13.5309 15.1226 13.6194 15.1522C13.7079 15.1818 13.7893 15.2297 13.8584 15.2929C13.9275 15.3561 13.9826 15.4331 14.0204 15.5191C14.0582 15.6051 14.0777 15.698 14.0777 15.7921C14.0777 15.8861 14.0582 15.9791 14.0204 16.065C13.9826 16.151 13.9275 16.228 13.8584 16.2912C13.7893 16.3544 13.7079 16.4024 13.6194 16.4319C13.5309 16.4615 13.4372 16.4721 13.3443 16.4631H13.3318Z"
          fill="#6A7A99"
        />
        <path
          d="M13.3318 12.4306H9.3756C9.21019 12.4144 9.05668 12.3367 8.94499 12.2127C8.8333 12.0886 8.77142 11.9271 8.77142 11.7596C8.77142 11.5921 8.8333 11.4305 8.94499 11.3065C9.05668 11.1825 9.21019 11.1048 9.3756 11.0886H13.3443C13.4372 11.0795 13.5309 11.0901 13.6194 11.1197C13.7079 11.1493 13.7893 11.1972 13.8584 11.2604C13.9275 11.3236 13.9826 11.4007 14.0204 11.4866C14.0582 11.5726 14.0777 11.6656 14.0777 11.7596C14.0777 11.8536 14.0582 11.9466 14.0204 12.0326C13.9826 12.1185 13.9275 12.1956 13.8584 12.2588C13.7893 12.322 13.7079 12.3699 13.6194 12.3995C13.5309 12.4291 13.4372 12.4397 13.3443 12.4306H13.3318Z"
          fill="#6A7A99"
        />
        <path
          d="M13.3318 8.39836H9.3756C9.21019 8.38218 9.05668 8.3045 8.94499 8.18046C8.8333 8.05641 8.77142 7.89489 8.77142 7.72737C8.77142 7.55984 8.8333 7.39832 8.94499 7.27427C9.05668 7.15023 9.21019 7.07255 9.3756 7.05637H13.3443C13.4372 7.04729 13.5309 7.05789 13.6194 7.08748C13.7079 7.11707 13.7893 7.165 13.8584 7.22819C13.9275 7.29138 13.9826 7.36843 14.0204 7.4544C14.0582 7.54037 14.0777 7.63335 14.0777 7.72737C14.0777 7.82139 14.0582 7.91436 14.0204 8.00033C13.9826 8.0863 13.9275 8.16335 13.8584 8.22654C13.7893 8.28973 13.7079 8.33766 13.6194 8.36725C13.5309 8.39684 13.4372 8.40744 13.3443 8.39836H13.3318Z"
          fill="#6A7A99"
        />
        <path
          d="M6.69323 16.4628C6.52782 16.4467 6.37431 16.369 6.26262 16.2449C6.15093 16.1209 6.08905 15.9594 6.08905 15.7918C6.08905 15.6243 6.15093 15.4628 6.26262 15.3388C6.37431 15.2147 6.52782 15.137 6.69323 15.1208C6.87176 15.1208 7.04317 15.1914 7.17058 15.3175C7.29798 15.4436 7.3712 15.615 7.37448 15.795C7.38028 15.8858 7.36648 15.9769 7.33403 16.0619C7.30158 16.1468 7.25125 16.2237 7.1865 16.2871C7.12175 16.3506 7.04413 16.3992 6.95897 16.4295C6.87382 16.4599 6.78316 16.4712 6.69323 16.4628Z"
          fill="#6A7A99"
        />
        <path
          d="M6.69323 12.4306C6.52782 12.4144 6.37431 12.3368 6.26262 12.2127C6.15093 12.0887 6.08905 11.9271 6.08905 11.7596C6.08905 11.5921 6.15093 11.4306 6.26262 11.3065C6.37431 11.1825 6.52782 11.1048 6.69323 11.0886C6.87176 11.0886 7.04317 11.1592 7.17058 11.2853C7.29798 11.4114 7.3712 11.5828 7.37448 11.7628C7.38028 11.8536 7.36648 11.9447 7.33403 12.0296C7.30158 12.1146 7.25125 12.1914 7.1865 12.2549C7.12175 12.3184 7.04413 12.367 6.95897 12.3973C6.87382 12.4276 6.78316 12.439 6.69323 12.4306Z"
          fill="#6A7A99"
        />
        <path
          d="M6.69323 8.39838C6.52782 8.38221 6.37431 8.30453 6.26262 8.18048C6.15093 8.05644 6.08905 7.89491 6.08905 7.72739C6.08905 7.55987 6.15093 7.39834 6.26262 7.2743C6.37431 7.15025 6.52782 7.07257 6.69323 7.0564C6.87176 7.05637 7.04317 7.12699 7.17058 7.25306C7.29798 7.37914 7.3712 7.5506 7.37448 7.73054C7.38028 7.82139 7.36648 7.91244 7.33403 7.9974C7.30158 8.08236 7.25125 8.15922 7.1865 8.2227C7.12175 8.28617 7.04413 8.33474 6.95897 8.36507C6.87382 8.3954 6.78316 8.40676 6.69323 8.39838Z"
          fill="#6A7A99"
        />
        <path
          d="M12.0002 4.03215H8.00017C7.90734 4.04123 7.81365 4.03063 7.72512 4.00104C7.6366 3.97145 7.55519 3.92352 7.48613 3.86033C7.41707 3.79714 7.36188 3.72009 7.32412 3.63412C7.28635 3.54815 7.26685 3.45517 7.26685 3.36115C7.26685 3.26714 7.28635 3.17416 7.32412 3.08819C7.36188 3.00222 7.41707 2.92517 7.48613 2.86198C7.55519 2.79879 7.6366 2.75086 7.72512 2.72127C7.81365 2.69168 7.90734 2.68108 8.00017 2.69016H12.0002C12.093 2.68108 12.1867 2.69168 12.2752 2.72127C12.3637 2.75086 12.4452 2.79879 12.5142 2.86198C12.5833 2.92517 12.6385 3.00222 12.6762 3.08819C12.714 3.17416 12.7335 3.26714 12.7335 3.36115C12.7335 3.45517 12.714 3.54815 12.6762 3.63412C12.6385 3.72009 12.5833 3.79714 12.5142 3.86033C12.4452 3.92352 12.3637 3.97145 12.2752 4.00104C12.1867 4.03063 12.093 4.04123 12.0002 4.03215Z"
          fill="#6A7A99"
        />
      </g>
      <defs>
        <clipPath id="clip0_445_1449">
          <rect width="20" height="20.1613" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
export default ListSVG;
