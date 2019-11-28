const colors = ["#81c1ff", "#ff9494", "#789fff", "#ff9e81", "#b79bff", "#b4d36b", "#8ce0c9", "#e5e5e5", "#a7f07b", "#66d4fc", "#f8c384", "#d4eaa0", "#cbe86b", "#62cfe4", "#eaa680", "#6dd2e6", "#62cd94", "#9881F5", "#ec8785"];

const getStringToColor = (str) => {
  const count = str.toString().split('').reduce((pv, cv) => {
    return pv + cv.codePointAt();
  }, 0)

  return colors[count % colors.length];
}
export default getStringToColor;