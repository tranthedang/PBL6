import React from "react";
import { Layout, PageHeader, Space, Divider, Button, Typography } from "antd";
import { Link } from "react-router-dom";

const { Header, Content } = Layout;

const MainLayout = ({ children }) => {
  return (
    <Layout>
      <Header>
        <PageHeader
          style={{
            padding: "4px 0",
          }}
          title={
            <Typography.Title
              style={{
                fontSize: "28px",
                color: "white",
              }}
            >
              PBL6
            </Typography.Title>
          }
          extra={
            <Space split={<Divider type="vertical" />}>
              <Link to="/">
                <Button>Ranking</Button>
              </Link>
              <Link to="/search">
                <Button>Search</Button>
              </Link>
            </Space>
          }
        />
      </Header>
      <Content>{children}</Content>
    </Layout>
  );
};

export default MainLayout;
