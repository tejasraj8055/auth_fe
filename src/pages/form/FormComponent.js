import React from 'react';
import { Form, Input, InputNumber, Radio, Checkbox, Select, DatePicker, TimePicker, Button, Row, Col } from 'antd';

const { Item } = Form;
const { Option } = Select;

const FormComponent = () => {
  const onFinish = (values) => {
    console.log('Form submitted with values:', values);
    // You can add your form submission logic here
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Form submission failed:', errorInfo);
  };

  return (
    <Form
      layout="vertical"
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Row gutter={16}> {/* Add a gutter to create space between form items */}
        <Col span={8}>
          <Item label="Input" name="input">
            <Input placeholder="Input" />
          </Item>
        </Col>

        <Col span={8}>
          <Item label="Input Number" name="inputNumber">
            <InputNumber placeholder="Input Number" />
          </Item>
        </Col>

        <Col span={8}>
          <Item label="Radio Group" name="radioGroup">
            <Radio.Group>
              <Radio value="A">A</Radio>
              <Radio value="B">B</Radio>
              <Radio value="C">C</Radio>
            </Radio.Group>
          </Item>
        </Col>

        <Col span={8}>
          <Item label="Checkbox Group" name="checkboxGroup">
            <Checkbox.Group>
              <Checkbox value="A">A</Checkbox>
              <Checkbox value="B">B</Checkbox>
              <Checkbox value="C">C</Checkbox>
            </Checkbox.Group>
          </Item>
        </Col>

        <Col span={8}>
          <Item label="Select" name="select">
            <Select placeholder="Select">
              <Option value="option1">Option 1</Option>
              <Option value="option2">Option 2</Option>
              <Option value="option3">Option 3</Option>
            </Select>
          </Item>
        </Col>

        <Col span={8}>
          <Item label="Date Picker" name="datePicker">
            <DatePicker placeholder="Date Picker" />
          </Item>
        </Col>

        <Col span={8}>
          <Item label="Time Picker" name="timePicker">
            <TimePicker placeholder="Time Picker" />
          </Item>
        </Col>
      </Row>

      <Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Item>
    </Form>
  );
};

export default FormComponent;
