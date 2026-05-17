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

function Products() {

  const [products, setProducts] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);

  const [form] = Form.useForm();

  // localStorage'dan yükle
  useEffect(() => {

    const savedProducts =
      JSON.parse(localStorage.getItem("products")) || [];

    setProducts(savedProducts);

  }, []);

  // localStorage'a kaydet
  useEffect(() => {

    localStorage.setItem(
      "products",
      JSON.stringify(products)
    );

  }, [products]);

  // modal aç
  const openModal = (product = null) => {

    setEditingProduct(product);

    setIsModalOpen(true);

    if (product) {
      form.setFieldsValue(product);
    } else {
      form.resetFields();
    }
  };

  // ürün ekle / düzenle
  const handleSubmit = (values) => {

    if (editingProduct) {

      const updatedProducts = products.map((item) =>
        item.id === editingProduct.id
          ? { ...item, ...values }
          : item
      );

      setProducts(updatedProducts);

    } else {

      const newProduct = {
        id: Date.now(),
        ...values,
      };

      setProducts([...products, newProduct]);
    }

    setIsModalOpen(false);

    form.resetFields();

    setEditingProduct(null);
  };

  // sil
  const handleDelete = (id) => {

    const filtered = products.filter(
      (item) => item.id !== id
    );

    setProducts(filtered);
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
      render: (_, record) => (
        record.stock < 5
          ? "Düşük Stok"
          : "Normal"
      ),
    },
    {
      title: "İşlem",
      render: (_, record) => (
        <Space>

          <Button
            onClick={() => openModal(record)}
          >
            Düzenle
          </Button>

          <Button
            danger
            onClick={() => handleDelete(record.id)}
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
          onClick={() => openModal()}
        >
          Ürün Ekle
        </Button>

      </div>

      <Table
        columns={columns}
        dataSource={products}
        rowKey="id"
      />

      <Modal
        title={
          editingProduct
            ? "Ürün Düzenle"
            : "Yeni Ürün"
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
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
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Stok"
            name="stock"
            rules={[{ required: true }]}
          >
            <InputNumber
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            label="Fiyat"
            name="price"
            rules={[{ required: true }]}
          >
            <InputNumber
              style={{ width: "100%" }}
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