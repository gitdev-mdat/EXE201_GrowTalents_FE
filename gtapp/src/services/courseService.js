import course from "../api/course";

const courseService = {
  createCourse: async (data) => {
    try {
      const res = await course.addCourse(data);
      // res.data chính là GlobalResponse<CourseResponseDTO>
      return res.data;
    } catch (error) {
      console.error("không tạo tạo được course", error);
      throw error?.response?.data || error;
    }
  },

  fetchCourses: async (params) => {
    try {
      const res = await course.getCourses(params);
      // res.data.data mới là list thực, vì có GlobalResponse wrapper
      return res.data.data;
    } catch (error) {
      console.error("Không get được course ", error);
      throw error?.response?.data || error;
    }
  },
  updateCourse: async (id, payload) => {
    try {
      const res = await course.updateCourse(id, payload);
      return res.data.data;
    } catch (error) {
      console.error("không update được", error);
      throw error?.response?.data || error;
    }
  },
  deleteCourse: async (id) => {
    try {
      const res = await course.deleteCourse(id);
      return res.data;
    } catch (error) {
      console.error("Không xoá được", error);
      throw error?.response?.data || error;
    }
  },
};

export default courseService;
