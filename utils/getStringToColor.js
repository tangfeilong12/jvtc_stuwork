const colors = ["#587498", "#E86850", "#4FD5D6", "#fa625f", "#FF2E63", "#35A7FF", "#36F1CD", "#515bd4", "#89da59", "#2E94B9", "#F0B775", "#7b885c", "#cbe86b", "#1794ac", "#73503c", "#2BBBD8", "#28CC75", "#444444", "#9881F5", "#fa625f"];

const getStringToColor = (str) => {
  const count = str.toString().split('').reduce((pv, cv) => {
    return pv + cv.codePointAt();
  }, 0)

  return colors[count % colors.length];
}
export default getStringToColor;