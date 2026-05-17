import { Card, Col, Row } from "antd";

function Dashboard() {

  const products =
    JSON.parse(localStorage.getItem("products")) || [];

  const totalProducts = products.length;

  const lowStockProducts = products.filter(
    (item) => item.stock < 5
  ).length;

  const totalStock = products.reduce(
    (acc, item) => acc + item.stock,
    0
  );

  return (
    <div>

      <h1>ERP Dashboard</h1>

      <Row gutter={16}>

        <Col span={8}>
          <Card title="Toplam Ürün">
            {totalProducts}
          </Card>
        </Col>

        <Col span={8}>
          <Card title="Düşük Stok">
            {lowStockProducts}
          </Card>
        </Col>

        <Col span={8}>
          <Card title="Toplam Stok">
            {totalStock}
          </Card>
        </Col>

      </Row>

    </div>
  );
}

export default Dashboard;