import {
  Card,
  Form,
  Input,
  Button,
  message,
} from "antd";

import api from "../services/api";

import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const onFinish = async (values) => {

    try {

      const res = await api.post(
        "/auth/login",
        values
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      message.success("Giriş başarılı");

      navigate("/");

    } catch (err) {

      message.error("Giriş başarısız");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >

      <Card
        title="ERP Login"
        style={{ width: 400 }}
      >

        <Form
          layout="vertical"
          onFinish={onFinish}
        >

          <Form.Item
            label="Kullanıcı Adı"
            name="username"
            rules={[
              { required: true },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Şifre"
            name="password"
            rules={[
              { required: true },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
          >
            Giriş Yap
          </Button>

        </Form>

      </Card>

    </div>
  );
}

export default Login;