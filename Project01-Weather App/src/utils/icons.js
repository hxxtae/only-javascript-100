export const weatherKinds = (kind) => {
  const assets = "./assets/images";
  let src;
  switch (kind) {
    case "Clear":
      src = `${assets}/clear.png`;
      break;
    case "Rain":
      src = `${assets}/rain.png`;
      break;
    case "Snow":
      src = `${assets}/snow.png`;
      break;
    case "Clouds":
      src = `${assets}/cloud.png`;
      break;
    case "Haze":
      src = `${assets}/mise.png`;
      break;
    default:
      src = `${assets}/404.png`;
      break;
  }
  return src;
};
