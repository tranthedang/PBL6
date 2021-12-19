import { Button, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { getRankings } from "../apis/actions";
import MainLayout from "../components/Layout";

const Ranking = () => {
  const [data, setData] = useState([
    { key: 1, id: 1, url: "https://www.facebook.com/", category: "test" },
  ]);

  //   useEffect(() => {
  //     (async () => {
  //       try {
  //         const response = await getRankings();

  //         console.log(response.data);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     })();
  //   }, []);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Url",
      dataIndex: "url",
      key: "url",
      render: (text) => (
        <Typography.Link
          href={text}
          target="_blank"
          onClick={handleClick}
          rel="noopener noreferrer"
        >
          {text}
        </Typography.Link>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
  ];

  const handleClick = () => {
    console.log("clicked");
  };

  return (
    <MainLayout>
      <div style={{ marginTop: "40px", height: "85vh" }}>
        <Button
          onClick={handleClick}
          style={{
            marginBottom: "14px",
          }}
        >
          Refresh
        </Button>
        <Table
          dataSource={data}
          columns={columns}
          pagination={{ pageSize: 10 }}
          // scroll={{ y: 240 }}
        />
      </div>
    </MainLayout>
  );
};

export default Ranking;
