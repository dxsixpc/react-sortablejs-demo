import { useEffect } from "react";
import * as React from "react";
import {
  Radio,
  Rate,
  Divider,
  Input,
  InputNumber,
  DatePicker,
  Form,
  Button,
} from "antd";
import Sortable from "react-sortablejs";
import {
  indexToArray,
  getItem,
  setInfo,
  isPath,
  getCloneItem,
  itemRemove,
  itemAdd,
} from "../utils/utils";
import { IComponentList } from "../interface/interface";
import ComponentData from "../Config/ComponentData";
const uniqueId = require("lodash/uniqueId");
const _ = require("lodash");
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

import Select from "../ComponentList/Select";
// 根据type类型选择除容器组件的其他组件---容器组件较特殊，单独处理
const SwitchComponents = (type: string, { name, label }: any) => {
  switch (type) {
    case "Rate":
      return <Rate />;
    case "Button":
      return (
        <Form.Item>
          <Button type="primary">保存</Button>
        </Form.Item>
      );
    case "Radio":
      return <Radio>Radio</Radio>;
    case "Divider":
      return <Divider />;
    case "Input":
      return (
        <Form.Item label={label}>
          <Input />
        </Form.Item>
      );
    case "Select":
      return (
        <Form.Item label={label}>
          <Select />
        </Form.Item>
      );
    case "InputNumber":
      return <InputNumber />;
    case "TextArea":
      return <Input.TextArea />;
    case "WeekPicker":
      return <WeekPicker />;
    case "MonthPicker":
      return <MonthPicker />;
    case "RangePicker":
      return <RangePicker />;
    default:
      return null;
  }
};

const Canvas = ({ data, changeData }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    console.log("effectData", data);
  }, [data]);

  // 拖拽的添加方法
  const sortableAdd = (evt: any) => {
    console.log("添加");
    // 组件名或路径
    const nameOrIndex = evt.clone.getAttribute("data-id");
    // 父节点路径
    const parentPath = evt.path[1].getAttribute("data-id");
    console.log(evt);
    // 拖拽元素的目标路径
    const { newIndex } = evt;
    // 新路径 为根节点时直接使用index
    const newPath = parentPath ? `${parentPath}-${newIndex}` : newIndex;
    // 判断是否为路径 路径执行移动，非路径为新增
    if (isPath(nameOrIndex)) {
      // 旧的路径index
      const oldIndex = nameOrIndex;
      // 克隆要移动的元素
      const dragItem = getCloneItem(oldIndex, data);
      // 比较路径的上下位置 先执行靠下的数据 再执行靠上数据
      if (indexToArray(oldIndex) > indexToArray(newPath)) {
        // 删除元素 获得新数据]
        let newTreeData = itemRemove(oldIndex, data);
        // 添加拖拽元素
        newTreeData = itemAdd(newPath, newTreeData, dragItem);
        // 更新视图
        changeData(newTreeData);
        return;
      }
      // 添加拖拽元素
      let newData = itemAdd(newPath, data, dragItem);
      // 删除元素 获得新数据
      newData = itemRemove(oldIndex, newData);
      changeData(newData);
      return;
    }
    // 新增流程 创建元素 => 插入元素 => 更新视图
    const id = nameOrIndex;
    const newItem = _.cloneDeep(
      ComponentData.find((item: IComponentList) => item.id === id)
    );
    // 当组件为容器时增加children子元素
    if (
      newItem.type === "Containers" ||
      newItem.type === "Row" ||
      newItem.type.indexOf("Col") != -1
    ) {
      newItem.children = [];
    }

    let Data = itemAdd(newPath, data, newItem);

    changeData(_.cloneDeep(Data));
  };

  // 拖拽的排序方法
  const sortableUpdate = (evt: any) => {
    // 交换数组
    const { newIndex, oldIndex } = evt;
    // 父节点路径
    const parentPath = evt.path[1].getAttribute("data-id");

    // 父元素 根节点时直接调用data
    let parent = parentPath ? getItem(parentPath, data) : data;
    // 当前拖拽元素
    const dragItem = parent[oldIndex];
    // 更新后的父节点
    parent.splice(oldIndex, 1);
    parent.splice(newIndex, 0, dragItem);

    // 最新的数据 根节点时直接调用data
    const Data = parentPath ? setInfo(parentPath, data, parent) : parent;
    // 调用父组件更新方法
    changeData(Data);
    console.log(Data);
  };

  // sortable的基本配置项
  const sortableOption = {
    group: {
      name: "formItem",
      pull: true,
      put: true,
    },
    animation: 150,
    fallbackOnBody: true,
    swapThreshold: 0.65,
    onAdd: (evt: any) => sortableAdd(evt),
    onUpdate: (evt: any) => sortableUpdate(evt),
  };

  const SortableItem = ({ item, indexs, style }) => {
    return (
      <Sortable key={uniqueId()} style={style} options={{ ...sortableOption }}>
        {loop(item.children, indexs)}
      </Sortable>
    );
  };

  // 递归函数
  const loop = (arr: any, index: any) =>
    arr.map((item: any, i: any) => {
      const indexs = index === "" ? String(i) : `${index}-${i}`;
      if (item.children) {
        let style: React.CSSProperties = {
          minHeight: 100,
          padding: "10px",
          border: "1px solid red",
          width: "100%",
          boxSizing: "border-box",
        };
        // 返回布局容器
        if (item.type == "Row") {
          style.display = "flex";
        } else if (item.type.indexOf("Col") != -1) {
          return (
            <div
              key={uniqueId()}
              data-id={indexs}
              data-type={item.type}
              style={{ width: (item.props.span * 100) / 24 + "%" }}
            >
              <SortableItem
                key={uniqueId()}
                item={item}
                indexs={indexs}
                style={style}
              />
            </div>
          );
        }
        return (
          <div key={uniqueId()} data-id={indexs} data-type={item.type}>
            <SortableItem
              key={uniqueId()}
              item={item}
              indexs={indexs}
              style={style}
            />
          </div>
        );
      }

      // 返回普通组件
      return (
        <div key={uniqueId()} data-id={indexs} data-type={item.type}>
          {SwitchComponents(item.type, { ...item.props })}
        </div>
      );
    });

  return (
    <>
      <Form
        form={form}
        layout={"vertical"}
        style={{ width: "100%", height: "100%", padding: "20px" }}
      >
        <Sortable
          key={uniqueId()}
          style={{ width: "100%", height: "100%", padding: "20px" }}
          options={{ ...sortableOption }}
        >
          {loop(data, "")}
        </Sortable>
      </Form>
    </>
  );
  // return (
  //   <>
  //     <Sortable
  //       key={uniqueId()}
  //       style={{ width: "100%", height: "100%", padding: "20px" }}
  //       options={{ ...sortableOption }}
  //     >
  //       {console.log("3333s")}
  //       {loop(data, "")}
  //     </Sortable>
  //   </>
  // );
};

export default Canvas;
