import { Layout, Menu } from "antd";
import { Link, Outlet } from "react-router-dom";

const { Header, Sider, Content } = Layout;

function MainLayout() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      
      <Sider>
        <div style={{ color: "white", padding: "20px", fontSize: "18px" }}>
          Mini ERP
        </div>

        <Menu theme="dark" mode="inline">

          <Menu.Item key="1">
            <Link to="/">Dashboard</Link>
          </Menu.Item>

          <Menu.Item key="2">
            <Link to="/products">Products</Link>
          </Menu.Item>

          <Menu.Item key="3">
            <Link to="/suppliers">Suppliers</Link>
          </Menu.Item>

          <Menu.Item key="4">
            <Link to="/stock">Stock</Link>
          </Menu.Item>

        </Menu>
      </Sider>

      <Layout>

        <Header style={{ background: "#fff" }}>
          ERP Yönetim Paneli
        </Header>

        <Content style={{ margin: "20px" }}>
          <Outlet />
        </Content>

      </Layout>

    </Layout>
  );
}

export default MainLayout;