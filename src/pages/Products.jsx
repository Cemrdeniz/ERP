import { useEffect, useState } from "react";

import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Space,
} from "antd";

import api from "../services/api";

function Products() {

  const [products, setProducts] = useState([]);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [form] = Form.useForm();

  // ürünleri getir
  const fetchProducts = async () => {

    const res = await api.get("/products");

    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ürün ekle
  const handleSubmit = async (values) => {

    await api.post("/products", values);

    fetchProducts();

    setIsModalOpen(false);

    form.resetFields();
  };

  // ürün sil
  const handleDelete = async (id) => {

    await api.delete(`/products/${id}`);

    fetchProducts();
  };

  // tablo kolonları
  const columns = [
    {
      title: "Ürün",
      dataIndex: "name",
    },
    {
      title: "Stok",
      dataIndex: "stock",
    },
    {
      title: "Fiyat",
      dataIndex: "price",
    },
    {
      title: "Durum",
      render: (_, record) =>
        record.stock < 5
          ? "Düşük Stok"
          : "Normal",
    },
    {
      title: "İşlem",
      render: (_, record) => (
        <Space>

          <Button
            danger
            onClick={() =>
              handleDelete(record._id)
            }
          >
            Sil
          </Button>

        </Space>
      ),
    },
  ];

  return (
    <div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >

        <h1>Ürün Yönetimi</h1>

        <Button
          type="primary"
          onClick={() =>
            setIsModalOpen(true)
          }
        >
          Ürün Ekle
        </Button>

      </div>

      <Table
        columns={columns}
        dataSource={products}
        rowKey="_id"
      />

      <Modal
        title="Yeni Ürün"
        open={isModalOpen}
        onCancel={() =>
          setIsModalOpen(false)
        }
        footer={null}
      >

        <Form
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
        >

          <Form.Item
            label="Ürün Adı"
            name="name"
            rules={[
              { required: true },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Stok"
            name="stock"
            rules={[
              { required: true },
            ]}
          >
            <InputNumber
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

          <Form.Item
            label="Fiyat"
            name="price"
            rules={[
              { required: true },
            ]}
          >
            <InputNumber
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
          >
            Kaydet
          </Button>

        </Form>

      </Modal>

    </div>
  );
}

export default Products;