export const device = {
  mobileS: `(max-width:360px)`,
  mobile: `(max-width:480px)`,
  tablet: `(max-width:768px)`,
  laptop: `(max-width:1024px)`,
  desktop: `(min-width:1025px)`,
};

export const theme = {
  colors: {
    main: "#00e5fd", // 메인 색상
    secondary: "#0078d7", // 서브 색상
    text: "#333", // 텍스트 색상
    subtext: "#A0A0A0",
  },
  fonts: {
    family: '"Noto Sans", Arial, sans-serif', // 글씨체
    sizes: {
      small: "14px",
      medium: "17px",
      large: "21px",
      HeaderText: "20px",
    },
    weights: {
      light: 300, // 얇은 글씨
      regular: 400, // 기본 두께
      semibold: 900,
      bold: 980, // 굵은 글씨
    },
  },
  device,
};
