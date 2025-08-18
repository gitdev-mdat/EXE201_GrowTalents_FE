import teacherCourseApi from "../api/teacherCourseApi";
const teacherCourseService = {
  add: async (data) => {
    try {
      const res = await teacherCourseApi.add(data);
      return res.data;
    } catch (error) {
      console.error("Không thể thêm teacher vào khoá ", error);
      throw error;
    }
  },
};
export default teacherCourseService;
