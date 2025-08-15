import semesterApi from "../api/semesterApi";
const semesterService = {
  getAll: async () => {
    try {
      const res = await semesterApi.getAll();
      return res.data.data;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách semesters: ", error);
      throw error;
    }
  },
  getByYear: async (year) => {
    try {
      const res = await semesterApi.getByYear(year);
      return res.data.data;
    } catch (error) {
      console.error(`Lỗi khi lấy semester của năm ${year}:`, error);
      throw error;
    }
  },

  create: async (data) => {
    try {
      const res = await semesterApi.create(data);
      return res.data.data;
    } catch (error) {
      console.error("Lỗi khi tạo semester:", error);
      throw error;
    }
  },
};
export default semesterService;
