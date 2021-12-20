import { Button, Table, Typography } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { getRankings, reloadDb } from "../apis/actions";
import MainLayout from "../components/Layout";

const Ranking = () => {
  const [data, setData] = useState([
    { key: 1, id: 1, url: "https://www.facebook.com/", category: "test" },
  ]);
  const [selectedUrl, setSelectedUrl] = useState([]);

  const getRankingsData = useCallback(async () => {
    try {
      const response = await getRankings();

      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getRankingsData();
  }, [getRankingsData]);

  const columns = [
    {
      title: "Number of click",
      dataIndex: "count_click",
      key: "count_click",
    },
    {
      title: "Url",
      dataIndex: "url",
      key: "url",
      render: (text) => (
        <Typography.Link
          href={text}
          target="_blank"
          onClick={() => handleClick(text)}
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
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];

  const handleClick = (text) => {
    const foundUrl = data.find((item) => item.url === text);

    if (foundUrl) {
      if (selectedUrl.length === 0) {
        setSelectedUrl([foundUrl.id]);
      } else {
        const firstItem = selectedUrl[0];
        setSelectedUrl([`${firstItem} ${foundUrl.id}`]);
      }
    }
  };

  const handleRefresh = useCallback(async () => {
    if (selectedUrl.length > 0) {
      try {
        await reloadDb({ data: selectedUrl });
        setSelectedUrl([]);
        await getRankingsData();
      } catch (error) {
        console.log(error);
      }
    }
  }, [getRankingsData, selectedUrl]);

  return (
    <MainLayout>
      <div style={{ marginTop: "40px", height: "85vh" }}>
        <Button
          onClick={handleRefresh}
          style={{
            marginBottom: "14px",
          }}
        >
          Refresh
        </Button>
        <Table
          dataSource={[...data]
            .map((val) => ({ ...val, key: val.id }))
            .sort((a, b) => b.count_click - a.count_click)}
          columns={columns}
          pagination={{ pageSize: 10 }}
          // scroll={{ y: 240 }}
        />
      </div>
    </MainLayout>
  );
};

export default Ranking;
