import teacherApi from "../api/teacherApi";
const teacherService = {
  getAllTeachers: async () => {
    try {
      const res = await teacherApi.getAllTeacher();
      return res.data.data;
    } catch (error) {
      console.error("Không lấy được danh sách giáo viên", error);
      throw error;
    }
  },
};
export default teacherService;
