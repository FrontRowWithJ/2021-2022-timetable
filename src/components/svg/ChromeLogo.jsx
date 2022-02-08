import "../../css/chrome-svg.css";

const ChromeLogo = ({ style, onmouseover, onmouseout, onClick }) => {
  return (
    <svg
      style={style}
      onMouseOver={onmouseover}
      onMouseOut={onmouseout}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="1 1 176 176"
    >
      <defs>
        <circle id="A" cx="96" cy="96" r="88" />
        <path id="B" d="M8 184h83.77l38.88-38.88V116h-69.3L8 24.48z" />
      </defs>
      <clipPath id="C">
        <use xlinkHref="#A" />
      </clipPath>
      <g className="B" transform="translate(-7 -7)">
        <path d="M21.97 8v108h39.4L96 56h88V8z" fill="#db4437" />
        <linearGradient
          id="D"
          x1="29.34"
          x2="81.84"
          y1="75.02"
          y2="44.35"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#a52714" stopOpacity=".6" offset="0" />
          <stop stopColor="#a52714" stopOpacity="0" offset=".66" />
        </linearGradient>
        <path d="M21.97 8v108h39.4L96 56h88V8z" fill="url(#D)" />
        <path d="M62.3 115.6L22.48 47.3l-.58 1 39.54 67.8z" className="C D" />
        <use xlinkHref="#B" fill="#0f9d58" />
        <linearGradient
          id="E"
          x1="110.9"
          x2="52.54"
          y1="164.5"
          y2="130.3"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#055524" stopOpacity=".4" offset="0" />
          <stop stopColor="#055524" stopOpacity="0" offset=".33" />
        </linearGradient>
        <path d="M8 184h83.77l38.88-38.88V116h-69.3L8 24.48z" fill="url(#E)" />
        <path
          d="M129.8 117.3l-.83-.48-38.4 67.15h1.15l38.1-66.64z"
          fill="#263238"
          className="D"
        />
        <defs>
          <path id="F" d="M8 184h83.77l38.88-38.88V116h-69.3L8 24.48z" />
        </defs>
        <clipPath id="G">
          <use xlinkHref="#F" />
        </clipPath>
        <g clipPath="url(#G)">
          <path d="M96 56l34.65 60-38.88 68H184V56z" fill="#ffcd40" />
          <linearGradient
            id="H"
            x1="121.9"
            x2="136.6"
            y1="49.8"
            y2="114.1"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#ea6100" stopOpacity=".3" offset="0" />
            <stop stopColor="#ea6100" stopOpacity="0" offset=".66" />
          </linearGradient>
          <path d="M96 56l34.65 60-38.88 68H184V56z" fill="url(#H)" />
        </g>
        <path d="M96 56l34.65 60-38.88 68H184V56z" fill="#ffcd40" />
        <path d="M96 56l34.65 60-38.88 68H184V56z" fill="url(#H)" />
        <defs>
          <path id="I" d="M96 56l34.65 60-38.88 68H184V56z" />
        </defs>
        <clipPath id="J">
          <use xlinkHref="#I" />
        </clipPath>
        <g clipPath="url(#J)">
          <path d="M21.97 8v108h39.4L96 56h88V8z" fill="#db4437" />
          <path d="M21.97 8v108h39.4L96 56h88V8z" fill="url(#D)" />
        </g>
      </g>
      <radialGradient
        id="K"
        cx="668.2"
        cy="55.95"
        r="84.08"
        gradientTransform="translate(-576)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#3e2723" stopOpacity=".2" offset="0" />
        <stop stopColor="#3e2723" stopOpacity="0" offset="1" />
      </radialGradient>
      <g transform="translate(-7 -7)">
        <path d="M96 56v20.95L174.4 56z" fill="url(#K)" className="B" />
        <g className="B">
          <defs>
            <path id="L" d="M21.97 8v40.34L61.36 116 96 56h88V8z" />
          </defs>
          <clipPath id="M">
            <use xlinkHref="#L" />
          </clipPath>
          <g clipPath="url(#M)">
            <use xlinkHref="#B" fill="#0f9d58" />
            <path
              d="M8 184h83.77l38.88-38.88V116h-69.3L8 24.48z"
              fill="url(#E)"
            />
          </g>
        </g>
      </g>
      <radialGradient
        id="N"
        cx="597.9"
        cy="48.52"
        r="78.04"
        gradientTransform="translate(-576)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#3e2723" stopOpacity=".2" offset="0" />
        <stop stopColor="#3e2723" stopOpacity="0" offset="1" />
      </radialGradient>
      <path
        transform="translate(-7 -7)"
        d="M21.97 48.45l57.25 57.24L61.36 116z"
        fill="url(#N)"
        className="B"
      />
      <radialGradient
        id="O"
        cx="671.8"
        cy="96.14"
        r="87.87"
        gradientTransform="translate(-576)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#263238" stopOpacity=".2" offset="0" />
        <stop stopColor="#263238" stopOpacity="0" offset="1" />
      </radialGradient>
      <g transform="translate(-7 -7)">
        <path
          d="M91.83 183.9l20.96-78.2 17.86 10.3z"
          fill="url(#O)"
          className="B"
        />
        <g className="B">
          <circle cx="96" cy="96" r="40" fill="#f1f1f1" />
          <circle cx="96" cy="96" r="32" fill="#4285f4" />
          <path
            d="M96 55c-22.1 0-40 17.9-40 40v1c0-22.1 17.9-40 40-40h88v-1H96z"
            className="C E"
          />
          <path
            d="M130.6 116c-6.92 11.94-19.8 20-34.6 20-14.8 0-27.7-8.06-34.6-20h-.04L8 24.48v1L61.4 117c6.92 11.94 19.8 20 34.6 20 14.8 0 27.68-8.05 34.6-20h.05v-1h-.06z"
            fill="#fff"
            fillOpacity=".1"
          />
          <path
            d="M97 56c-.17 0-.33.02-.5.03C118.36 56.3 136 74.08 136 96s-17.64 39.7-39.5 39.97c.17 0 .33.03.5.03 22.1 0 40-17.9 40-40s-17.9-40-40-40z"
            opacity=".1"
            className="C"
          />
          <path
            d="M131 117.3c3.4-5.88 5.37-12.68 5.37-19.96a39.87 39.87 0 0 0-1.87-12.09c.95 3.42 1.5 7 1.5 10.73 0 7.28-1.97 14.08-5.37 19.96l.02.04-38.88 68h1.16L131 117.3z"
            fill="#fff"
            className="E"
          />
          <path
            d="M96 9c48.43 0 87.72 39.13 88 87.5 0-.17.01-.33.01-.5 0-48.6-39.4-88-88-88S8 47.4 8 96c0 .17.01.33.01.5C8.28 48.13 47.57 9 96 9z"
            fill="#fff"
            className="E"
          />
          <path
            d="M96 183c48.43 0 87.72-39.13 88-87.5 0 .17.01.33.01.5 0 48.6-39.4 88-88 88S8 144.6 8 96c0-.17.01-.33.01-.5.27 48.37 39.56 87.5 88 87.5z"
            className="C D"
          />
        </g>
      </g>
    </svg>
  );
};

export default ChromeLogo;
