import React, { useState } from "react";
import styles from "../styles/ContactSection.module.css";
import givequestion from "../assets/givequestion.jpg";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    setShowSuccess(true);
    setFormData({ name: "", phone: "", email: "", message: "" });
    
    // Hide success message after 4 seconds
    setTimeout(() => setShowSuccess(false), 4000);
  };

  return (
    <section id="contact" className={styles.contactSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Liên Hệ Với Chúng Tôi</h2>
        
        <div className={styles.contactContent}>
          {/* Image Container */}
          <div className={styles.imageContainer}>
            <img 
              src={givequestion} 
              alt="Liên hệ Grow Talents" 
              className={styles.contactImage}
            />
          </div>

          {/* Form Container */}
          <div className={styles.formContainer}>
            <div className={styles.formHeader}>
              <h3 className={styles.formTitle}>
                Để lại lời nhắn cho Grow Talents
              </h3>
              <p className={styles.formDescription}>
                Nếu bạn có câu hỏi, muốn đăng ký học hoặc cần tư vấn, hãy gửi lời
                nhắn cho chúng tôi. Grow Talents sẽ phản hồi trong thời gian sớm
                nhất!
              </p>
            </div>

            <form onSubmit={handleSubmit} className={styles.contactForm}>
              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}> Họ và tên</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="Nhập họ và tên của bạn"
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}> Số điện thoại</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="Nhập số điện thoại"
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}> Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Nhập địa chỉ email"
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}> Lời nhắn / Nhu cầu đăng ký học</label>
                <textarea
                  name="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className={styles.textarea}
                  placeholder="Hãy cho chúng tôi biết bạn muốn học môn gì, lớp nào, hoặc có câu hỏi gì..."
                />
              </div>

              <button type="submit" className={styles.submitButton}>
                Gửi lời nhắn
              </button>
            </form>

            {showSuccess && (
              <div className={styles.successMessage}>
                ✅ Đã gửi lời nhắn! Chúng tôi sẽ liên hệ sớm nhất có thể.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
