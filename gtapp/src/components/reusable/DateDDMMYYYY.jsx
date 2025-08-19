import { DatePicker } from "antd";
import dayjs from "dayjs";

/**
 * value: có thể là từ BE (YYYY-MM-DD) hoặc là đã ở dạng DD/MM/YYYY
 * onChange: sẽ emit DD/MM/YYYY để gửi về BE
 */
const DateDDMMYYYY = ({ value, onChange, ...rest }) => {
  const displayFormat = "DD/MM/YYYY";

  // nếu value là chuỗi yyyy-MM-dd thì dayjs sẽ hiểu theo pattern đó
  // còn nếu là dd/MM/yyyy (ví dụ user đã edit) thì vẫn parse được (thanks dayjs multiple formats)
  const innerValue = value ? dayjs(value, ["YYYY-MM-DD", displayFormat]) : null;

  const handleChange = (date) => {
    if (!date) {
      onChange(null);
    } else {
      // emit về theo đúng dd/MM/yyyy
      onChange(date.format(displayFormat));
    }
  };

  return (
    <DatePicker
      value={innerValue}
      format={displayFormat}
      onChange={handleChange}
      {...rest}
    />
  );
};

export default DateDDMMYYYY;
