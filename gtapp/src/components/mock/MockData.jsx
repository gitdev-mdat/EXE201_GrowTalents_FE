import detailImage from "../../assets/detail1.svg";

// Danh sách khóa học
export const courses = [
  {
    id: 1,
    name: "Toán 6 - Chinh phục điểm 10",
    description:
      "Khóa học giúp học sinh đạt điểm tuyệt đối với kiến thức đầy đủ và chi tiết.",
    descriptionDetails:
      "Bạn mơ ước đạt điểm 10 tuyệt đối? Đây là khóa học dành cho bạn! Được thiết kế với giáo trình bài bản và chuyên sâu, khóa học đảm bảo bạn nắm chắc kiến thức cốt lõi và nâng cao. Thực hành liên tục với bài tập sát đề, bạn sẽ tự tin trong mọi kỳ thi. Đừng bỏ lỡ cơ hội chinh phục mục tiêu cao nhất ngay hôm nay!",
    price: "500.000Đ/Tháng",
    image: detailImage,
    rating: 4.5,
    reviews: 120,
    students: 1000,
    date: "6 tháng 12 năm 2024",
  },
  {
    id: 2,
    name: "Toán 6 - Chinh phục điểm 8+",
    description:
      "Dành cho học sinh muốn đạt thành tích tốt mà không quá áp lực.",
    descriptionDetails:
      "Khóa học hoàn hảo cho những ai muốn vươn lên điểm 8+ mà vẫn giữ được sự thoải mái khi học. Nội dung học dễ hiểu, bài tập bám sát chương trình học giúp bạn tiến bộ từng ngày. Đội ngũ giảng viên tận tâm, luôn hỗ trợ mọi thắc mắc. Cùng với các mẹo giải nhanh, bạn sẽ đạt được thành tích vượt mong đợi.",
    price: "450.000Đ/Tháng",
    image: detailImage,
    rating: 4.2,
    reviews: 95,
    students: 800,
    date: "10 tháng 1 năm 2024",
  },
  {
    id: 3,
    name: "Toán 6 - Ôn thi HSG",
    description:
      "Luyện thi học sinh giỏi với các bài tập nâng cao và chuyên sâu.",
    descriptionDetails:
      "Bạn muốn thử sức trong các kỳ thi học sinh giỏi? Khóa học này sẽ đưa bạn đến đỉnh cao với các bài tập nâng cao và chuyên sâu. Phân tích đề thi thực tế, hướng dẫn từng bước giải toán logic. Giảng viên giàu kinh nghiệm sẽ hỗ trợ bạn đạt thành tích vượt trội. Hãy tham gia và trở thành ngôi sao của lớp học!",
    price: "550.000Đ/Tháng",
    image: detailImage,
    rating: 4.8,
    reviews: 130,
    students: 600,
    date: "20 tháng 3 năm 2024",
  },
  {
    id: 4,
    name: "Toán 6 - Hỗ trợ học sinh mất gốc",
    description: "Giúp học sinh lấy lại kiến thức nền tảng, học lại từ đầu.",
    descriptionDetails:
      "Bạn cảm thấy mất tự tin vì kiến thức toán học căn bản? Khóa học này sẽ là giải pháp hoàn hảo giúp bạn xây dựng lại nền tảng từ đầu. Với các bài học chi tiết, dễ hiểu và bài tập thực hành liên tục, bạn sẽ nhanh chóng lấy lại phong độ. Hỗ trợ tận tình từ đội ngũ giảng viên sẽ đảm bảo bạn tiến bộ từng ngày!",
    price: "350.000Đ/Tháng",
    image: detailImage,
    rating: 4.0,
    reviews: 75,
    students: 400,
    date: "1 tháng 4 năm 2024",
  },
  {
    id: 5,
    name: "Toán 6 - Nâng cao kỹ năng giải toán",
    description:
      "Phát triển kỹ năng giải toán logic, giải bài tập khó trong các kỳ thi.",
    descriptionDetails:
      "Hãy sẵn sàng bứt phá với kỹ năng giải toán nâng cao! Khóa học tập trung vào các bài toán logic, các dạng bài tập khó từ cơ bản đến nâng cao. Giảng viên sẽ cung cấp cho bạn những phương pháp giải độc đáo và hiệu quả. Đây là lựa chọn hoàn hảo cho học sinh muốn khẳng định năng lực trong các kỳ thi lớn.",
    price: "600.000Đ/Tháng",
    image: detailImage,
    rating: 4.7,
    reviews: 110,
    students: 700,
    date: "15 tháng 5 năm 2024",
  },
];

// Function tạo dữ liệu chi tiết từ khóa học
export const createCourseDetail = (course) => ({
  id: course.id,
  title: course.name, // Đảm bảo title chính là name của khóa học được chọn
  description: course.description,
  descriptionDetails: course.descriptionDetails,
  reviews: course.reviews,
  students: course.students,
  date: course.date,
  rating: course.rating,
  image: course.image,
  lessons: [
    "Lý thuyết cơ bản về số học",
    "Thực hành bài tập về phân số",
    "Các dạng bài toán ứng dụng thực tế",
    "Ôn tập và kiểm tra thử cuối chương",
  ],
  objectives: [
    "Hiểu các khái niệm cơ bản trong Toán học lớp 6.",
    "Thành thạo giải bài tập từ cơ bản đến nâng cao.",
    "Phát triển tư duy logic và kỹ năng phân tích vấn đề.",
  ],
  prerequisites: "Không yêu cầu, phù hợp với học sinh mọi trình độ.",
});
