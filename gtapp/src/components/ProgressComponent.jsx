import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const steps = [
  {
    label: "Xác định môn học và khoá học các em mong muốn",
    description: `Việc xác định nhu cầu, cũng như định hướng của bản thân là việc ưu tiên hàng đầu trên chặng đường học tập.`,
  },
  {
    label: "Tham khảo khoá học",
    description: `Có thể điền thông tin vào ô ở đầu trang để hệ thống tìm kiếm khoá học cho các em.`,
  },
  {
    label: "Đăng ký khoá học",
    description: `Sau khi đã xác định được khoá học phù hợp, các em bấm vào nút Đăng ký và tiến tới bước Thanh toán.`,
  },
  {
    label: "Thanh toán tháng đầu tiên của khoá học",
    description: `Các em sẽ đóng tiền cho tháng đầu tiên của khoá học trước khi nhận lớp.`,
  },
  {
    label: "Chờ đợi trung tâm liên lạc",
    description: `  Trung tâm sẽ liên lạc lại cho các em sau 1-2 ngày đăng ký.   
                    Hotline trung tâm: 0914.026.299.`,
  },
];

export default function ProgressComponent() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step
            key={step.label}
            sx={{
              color: "#ffffff",
              marginBottom: "24px",
            }}
          >
            <StepLabel
              optional={
                index === steps.length - 1 ? (
                  <Typography
                    variant="caption"
                    // sx={{ color: "#ffcc00", fontSize: "1rem" }}
                    sx={{ color: "#ffffff", fontSize: "1rem" }}
                  >
                    Bước cuối
                  </Typography>
                ) : null
              }
              sx={{
                "& .MuiStepLabel-label": {
                  color: "#db4481", // Màu hồng đỏ
                  fontSize: "1.3rem",
                  fontWeight: "bold",
                },
                // "& .Mui-active .MuiStepLabel-label": {
                //   color: "#ffcc00", // Màu vàng sáng khi active
                // },
                "& .Mui-completed .MuiStepLabel-label": {
                  color: "#ff6600", // Màu cam đậm khi hoàn thành
                },
              }}
            >
              {step.label}
            </StepLabel>

            <StepContent
              sx={{
                marginTop: "16px",
                borderLeft: "3px solid #60b8e0", // Đường kẻ xanh nhạt
                paddingLeft: "16px",
              }}
            >
              <Typography
                sx={{
                  color: "#60b8e0", // Màu xanh nhạt
                  fontSize: "1.2rem", // Tăng kích thước chữ
                  lineHeight: "1.8", // Tăng khoảng cách dòng
                  backgroundColor: "rgba(96, 184, 224, 0.1)", // Nền xanh nhạt trong suốt
                  padding: "8px 12px", // Tạo khoảng cách bên trong
                  borderRadius: "8px", // Bo góc mềm mại
                  border: "1px solid #60b8e0", // Viền xanh nhạt
                  marginTop: "8px", // Khoảng cách phía trên
                  maxWidth: "600px", // Giới hạn chiều rộng tối đa
                  wordWrap: "break-word", // Tự động xuống dòng khi cần
                  overflowWrap: "break-word", // Xử lý từ quá dài
                }}
              >
                {step.description}
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{
                    mt: 1,
                    mr: 1,
                    color: "#ffffff",
                    backgroundColor: "#db4481", // Nút màu hồng đỏ
                    fontWeight: "bold",
                    textTransform: "none",
                    // "&:hover": {
                    //   backgroundColor: "#ffcc00", // Hover màu vàng sáng
                    // },
                  }}
                >
                  {index === steps.length - 1 ? "Hoàn thành" : "Tiếp tục"}
                </Button>
                <Button
                  disabled={index === 0}
                  onClick={handleBack}
                  sx={{
                    mt: 1,
                    mr: 1,
                    color: "#ffffff",
                    backgroundColor: "#60b8e0", // Nút màu xanh nhạt
                    fontWeight: "bold",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#ff6600", // Hover màu cam đậm
                    },
                  }}
                >
                  Quay lại
                </Button>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper
          square
          elevation={0}
          sx={{
            p: 3,
            backgroundColor: "#60b8e0", // Nền xanh nhạt
            color: "#ffffff", // Chữ trắng
            borderRadius: "8px",
            textAlign: "center",
            fontSize: "1.1rem",
          }}
        >
          <Typography>Đã hoàn thành tất cả các bước</Typography>
          <Button
            onClick={handleReset}
            sx={{
              mt: 1,
              mr: 1,
              color: "#ffffff",
              backgroundColor: "#db4481", // Nút hồng đỏ
              fontWeight: "bold",
              textTransform: "none",
              //   "&:hover": {
              //     backgroundColor: "#ffcc00", // Hover vàng sáng
              //   },
            }}
          >
            Xem lại
          </Button>
        </Paper>
      )}
    </Box>
  );
}
