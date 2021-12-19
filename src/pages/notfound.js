import React from "react";
import { Button, Typography } from "antd";
import { Link } from "react-router-dom";
import MainLayout from "../components/Layout";

const { Title, Paragraph } = Typography;

const Notfound = () => {
  return (
    <>
      <MainLayout>
        <Typography>
          <Title>This is dead end</Title>
          <Paragraph>
            <Link to="/">
              <Button>Back to home</Button>
            </Link>
          </Paragraph>
        </Typography>
      </MainLayout>
    </>
  );
};

export default Notfound;
