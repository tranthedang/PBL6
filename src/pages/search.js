import { Button, Form, Input, Select, Tag } from "antd";
import { useState } from "react";
import { getTopKeywords, getUrlsOfLink } from "../apis/actions";
import MainLayout from "../components/Layout";

const { Option } = Select;

const Search = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState();
  const [searchType, setSearchType] = useState("keywords");

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
        {data !== undefined ? (
          Array.isArray(data) ? (
            <div>
              <p style={{ marginTop: "10px" }}>Result:</p>
              {data.map((val, id) => (
                <div key={id}>
                  <p style={{ fontSize: "22px" }}>{val}</p>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <p>Result:</p>
              {Object.entries(data).map(([key, val]) => (
                <Tag style={{ margin: "0px 16px 12px 0" }} key={key}>
                  <p
                    style={{
                      fontSize: "22px",
                      padding: "4px 8px 8px",
                      marginBottom: "0",
                    }}
                  >
                    {key}:{val}
                  </p>
                </Tag>
              ))}
            </div>
          )
        ) : null}
      </div>
    </MainLayout>
  );
};

export default Search;
