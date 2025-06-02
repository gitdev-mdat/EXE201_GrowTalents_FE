import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Grid,
} from "@mui/material";
import givequestion from "../assets/givequestion.jpg";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    setOpenSnackbar(true);
    setFormData({ name: "", phone: "", email: "", message: "" });
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f9fbfc",
        borderRadius: 3,
        p: { xs: 2, md: 5 },
        boxShadow: "0 6px 16px rgba(0,0,0,0.06)",
        maxWidth: "100%",
        mx: "auto",
        mt: 4,
      }}
    >
      <Grid container spacing={4} alignItems="center">
        {/* Ảnh minh hoạ bên trái */}
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={givequestion}
            alt="Liên hệ Grow Talents"
            sx={{
              width: "100%",
              maxHeight: 500,
              objectFit: "cover",
              borderRadius: 2,
            }}
          />
        </Grid>

        {/* Form bên phải */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: "#0d4dd2",
              textAlign: { xs: "center", md: "left" },
            }}
          >
            Để lại lời nhắn cho Grow Talents 💬
          </Typography>
          <Typography
            sx={{
              mb: 3,
              color: "#555",
              textAlign: { xs: "center", md: "left" },
            }}
          >
            Nếu bạn có câu hỏi, muốn đăng ký học hoặc cần tư vấn, hãy gửi lời
            nhắn cho chúng tôi. Grow Talents sẽ phản hồi trong thời gian sớm
            nhất!
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  name="name"
                  label="Họ và tên"
                  variant="outlined"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  name="phone"
                  label="Số điện thoại"
                  variant="outlined"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  name="email"
                  label="Email"
                  type="email"
                  variant="outlined"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  name="message"
                  label="Lời nhắn / Nhu cầu đăng ký học"
                  multiline
                  rows={3}
                  variant="outlined"
                  value={formData.message}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: "#0d4dd2",
                    "&:hover": { backgroundColor: "#0d4dd2" },
                    px: 4,
                    py: 1.5,
                    fontWeight: 600,
                    fontSize: "1rem",
                  }}
                >
                  Gửi lời nhắn
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        message="Đã gửi lời nhắn! Chúng tôi sẽ liên hệ sớm nhất có thể."
      />
    </Box>
  );
}
