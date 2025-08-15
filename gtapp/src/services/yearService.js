import yearApi from "../api/yearApi";
const yearService = {
  getAll: async () => {
    try {
      const res = await yearApi.getAll();
      return res.data.data;
    } catch (error) {
      console.error("Không tải được danh sách year ");
      throw error;
    }
  },
  create: async (data) => {
    try {
      const res = await yearApi.create(data);
      return res.data.data;
    } catch (error) {
      console.error("Không thể tạo year");
      throw error;
    }
  },
};
export default yearService;
