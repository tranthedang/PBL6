import { Button, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import MainLayout from "../components/Layout";

const { Option } = Select;

const Search = () => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    console.log("Finish:", values);
    form.resetFields();
  };

  const handleChange = (e) => {
    console.log(e.target.value);
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
            defaultValue="keywords"
            style={{ marginRight: "26px", display: "inline-block" }}
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
        {/* <div>
          <p>Result:</p>
        </div> */}
      </div>
    </MainLayout>
  );
};

export default Search;
