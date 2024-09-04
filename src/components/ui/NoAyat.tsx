type PropsType = {
  no_ayat: number;
  height?: number;
  width?: number;
  className?: string;
};
function NoAyat(props: PropsType) {
  const { no_ayat, height, width, className = "" } = props;
  return (
    <div
      className={`relative flex items-center justify-center ${className} row-start-1 row-end-3`}
    >
      <svg
        width={height ? height : 28.25}
        height={width ? width : 32.25}
        viewBox="0 0 38 43"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.3036 2.10426C18.0868 0.850113 19.9132 0.850113 20.6964 2.10426L24.5063 8.20509C25.2111 9.33361 26.4309 10.0378 27.7606 10.0839L34.949 10.333C36.4267 10.3842 37.3399 11.9659 36.6454 13.2712L33.2669 19.6212C32.642 20.7958 32.642 22.2042 33.2669 23.3788L36.6454 29.7288C37.3399 31.0341 36.4267 32.6158 34.949 32.667L27.7606 32.9161C26.4309 32.9622 25.2111 33.6664 24.5063 34.7949L20.6964 40.8957C19.9132 42.1499 18.0868 42.1499 17.3036 40.8957L13.4937 34.7949C12.7889 33.6664 11.5691 32.9622 10.2394 32.9161L3.05099 32.667C1.57325 32.6158 0.660093 31.0341 1.35461 29.7288L4.7331 23.3788C5.35804 22.2042 5.35805 20.7958 4.7331 19.6212L1.35461 13.2712C0.660093 11.9659 1.57325 10.3842 3.05099 10.333L10.2394 10.0839C11.5691 10.0378 12.7889 9.33361 13.4937 8.20509L17.3036 2.10426Z"
          stroke="currentColor"
          strokeWidth="2"
        ></path>
      </svg>
      <span className="absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-sm">
        {no_ayat}
      </span>
    </div>
  );
}

export default NoAyat;
