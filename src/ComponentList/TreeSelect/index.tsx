import React, { useState } from "react";
import { TreeSelect, Collapse, Menu } from "antd";

const { Panel } = Collapse;
const { SubMenu } = Menu;

// 编辑器左侧组件列表
const TreeSelectField = () => {
  // const [isOpen, setIsOpen] = useState(true);
  return (
    <TreeSelect
      defaultValue="lucy"
      style={{ width: 120 }}
      onChange={(value: any) => {
        console.log(value);
      }}
      // open={isOpen}
      dropdownRender={(menu: any) => {
        return (
          <Menu
            mode="inline"
            onOpenChange={(value: any) => {
              console.log(value);
            }}
            onClick={(value: any) => {
              console.log(value);
            }}
            onSelect={(value: any) => {
              console.log(value);
              // setIsOpen(false);
            }}
          >
            <SubMenu key="sub1" title="Navigation One">
              <Menu.Item key="1">Option 1</Menu.Item>
              <Menu.Item key="2">Option 2</Menu.Item>
              <Menu.Item key="3">Option 3</Menu.Item>
              <Menu.Item key="4">Option 4</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title="Navigation Two">
              <Menu.Item key="5">Option 5</Menu.Item>
              <Menu.Item key="6">Option 6</Menu.Item>
              <SubMenu key="sub3" title="Submenu">
                <Menu.Item key="7">Option 7</Menu.Item>
                <Menu.Item key="8">Option 8</Menu.Item>
              </SubMenu>
            </SubMenu>
            <SubMenu key="sub4" title="Navigation Three">
              <Menu.Item key="9">Option 9</Menu.Item>
              <Menu.Item key="10">Option 10</Menu.Item>
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </SubMenu>
          </Menu>
        );
      }}
    ></TreeSelect>
  );
};

export default TreeSelectField;
