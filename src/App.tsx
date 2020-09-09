import * as React from "react";
import { useState } from "react";
import { Layout } from "antd";
import "antd/dist/antd.css";
const { Header, Footer, Sider, Content } = Layout;

import ComponentList from "./ComponentList/ComponentList";
import Canvas from "./Canvas/Canvas";
import Dustbin from "./Dustbin/Dustbin";

const App = () => {
  const [data, setData] = useState([]); //数据树
  const LcdpData = {
    id: "page1",
    type: "LcdpForm",
    props: {
      mode: "inline",
    },
    children: data,
  };

  const changeData = (dataList: any) => {
    setData([...dataList]);
    // console.log('总数据', LcdpData);
  };

  return (
    <>
      <Layout>
        <Header>Header</Header>
        <Layout>
          <Sider>
            <ComponentList />
          </Sider>
          <Content>
            <Canvas data={data} changeData={changeData} />
          </Content>
          <Sider>
            <Dustbin data={data} changeData={changeData} />
          </Sider>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
    </>
  );
};

export default App;
