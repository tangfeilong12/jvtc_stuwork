import { CourseWeek, Course } from "../api/api";
function getYear(week = 1) {
  const current_date = new Date();
  const m = current_date.getMonth() + 1;
  const y = current_date.getFullYear();
  if (m >= 9 && m <= 12) {
    return y + '-' + (y + 1) + "-1"
  }
  if (m >= 3 && m <= 6) {
    return (y - 1) + '-' + (y) + "-2"
  }
  if (week > 10 && m < 3 && m >= 1) {
    return y + '-' + (y + 1) + "-1"
  }

  if (week < 3 && m < 3 && m >= 1) {
    return (y - 1) + '-' + (y) + "-2";
  }
  return y + '-' + (y + 1) + "-1";
}
export default {
  async getWeek() {
    try {
      const { data } = await CourseWeek();
      const totalWeek = data.totalWeek;
      const currentWeek = data.currentWeek;
      return {
        totalWeek: parseInt(totalWeek),
        currentWeek: parseInt(currentWeek),
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  },
  async getCourseData(week, loginCode) {
    const { data } = await Course({
      week,
      loginCode
    });
    return data;
  }
}