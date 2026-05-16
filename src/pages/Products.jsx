import { useState } from "react";
import { Table, Button, Modal, Form, Input, InputNumber } from "antd";

function Products() {

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Laptop",
      stock: 10,
      price: 20000,
    },
    {
      id: 2,
      name: "Mouse",
      stock: 45,
      price: 300,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  // ürün ekle
  const handleAddProduct = (values) => {

    const newProduct = {
      id: Date.now(),
      ...values,
    };

    setProducts([...products, newProduct]);

    setIsModalOpen(false);

    form.resetFields();
  };

  // ürün sil
  const handleDelete = (id) => {
    const filtered = products.filter((item) => item.id !== id);

    setProducts(filtered);
  };

  // table kolonları
  const columns = [
    {
      title: "Ürün Adı",
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
      title: "İşlem",
      render: (_, record) => (
        <Button danger onClick={() => handleDelete(record.id)}>
          Sil
        </Button>
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

        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Ürün Ekle
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={products}
        rowKey="id"
      />

      <Modal
        title="Yeni Ürün"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >

        <Form
          layout="vertical"
          form={form}
          onFinish={handleAddProduct}
        >

          <Form.Item
            label="Ürün Adı"
            name="name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Stok"
            name="stock"
            rules={[{ required: true }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Fiyat"
            name="price"
            rules={[{ required: true }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Kaydet
          </Button>

        </Form>

      </Modal>

    </div>
  );
}

export default Products;