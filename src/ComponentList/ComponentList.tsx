import * as React from "react";
import Sortable from "react-sortablejs";
import { uniqueId } from "lodash";
import { Button } from "antd";

import ComponentData from "../Config/ComponentData";

// 编辑器左侧组件列表
const ComponentList = () => {
  return (
    <>
      <h2 style={{ textAlign: "center" }}>组件列表</h2>
      <Sortable
        options={{
          group: {
            name: "formItem",
            pull: "clone",
            put: false,
          },
          sort: false,
        }}
        style={{ height: "100%", overflow: "auto" }}
      >
        {ComponentData.map((item) => {
          return (
            <div
              key={uniqueId()}
              data-id={item.id}
              style={{ textAlign: "center", margin: "10px 0" }}
            >
              <Button style={{ width: "160px", height: "30px" }}>
                {item.props.name}
              </Button>
            </div>
          );
        })}
      </Sortable>
    </>
  );
};

export default ComponentList;
