import React from "react";
import { Popconfirm, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const DeleteConfirm = ({
  title = "Bạn chắc chắn xoá?",
  onConfirm,
  ...buttonProps
}) => {
  return (
    <Popconfirm
      title={title}
      okText="Delete"
      okType="danger"
      cancelText="Hủy"
      onConfirm={onConfirm}
    >
      <Button
        danger
        type="primary"
        ghost
        icon={<DeleteOutlined />}
        {...buttonProps}
      >
        Xoá
      </Button>
    </Popconfirm>
  );
};

export default DeleteConfirm;
