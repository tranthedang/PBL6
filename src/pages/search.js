import { Button, Form, Input, Select, Tag, Typography } from "antd";
import { useState, useEffect } from "react";
import { getTopKeywords, getUrlsOfLink } from "../apis/actions";
import MainLayout from "../components/Layout";

const { Option } = Select;

const Search = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState();
  const [searchType, setSearchType] = useState("keywords");
  const [, forceUpdate] = useState({});

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = async (values) => {
    try {
      console.log("Finish:", values);

      if (searchType === "keywords") {
        const response = await getTopKeywords(values);

        console.log(response.data);
        setData(response.data);
      } else {
        const response = await getUrlsOfLink(values);
        console.log(response.data);
        setData(response.data);
      }

      form.resetFields();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  console.log(data);

  return (
    <MainLayout>
      <div
        style={{
          marginTop: "40px",
          marginLeft: "30px",
          height: "85vh",
        }}
      >
        <h1>Search something...</h1>
        <div>
          <Select
            value={searchType}
            style={{ marginRight: "26px", display: "inline-block" }}
            onChange={(val) => setSearchType(val)}
          >
            <Option value="keywords">Get top key words of the url</Option>
            <Option value="statistic">Get all links have in the url</Option>
          </Select>
          <Form
            style={{ display: "inline-flex" }}
            form={form}
            layout="inline"
            onChange={handleChange}
            onFinish={onFinish}
          >
            <Form.Item
              label="Url"
              name="url"
              rules={[
                { type: "url", required: true },
                { type: "string", min: 6 },
              ]}
              style={{ width: "400px" }}
            >
              <Input placeholder="Start with http or https..." />
            </Form.Item>
            <Form.Item shouldUpdate>
              {() => (
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={
                    !form.isFieldsTouched(true) ||
                    !!form
                      .getFieldsError()
                      .filter(({ errors }) => errors.length).length
                  }
                >
                  Search
                </Button>
              )}
            </Form.Item>
          </Form>
        </div>
        {data !== undefined && Array.isArray(data) ? (
          <div>
            <p>Result:</p>
            {data.map((val, id) => (
              <Typography.Text key={id}>{val}</Typography.Text>
            ))}
          </div>
        ) : (
          <div>
            <p>Result:</p>
            {Object.entries(data).map(([key, val]) => (
              <Tag key={key}>
                {key}:{val}
              </Tag>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Search;
