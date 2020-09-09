import * as React from "react";
import { useState } from "react";
import Sortable from "react-sortablejs";
import { uniqueId } from "lodash";
import { isPath, itemRemove } from "../utils/utils";

const Dustbin = ({ data, changeData }) => {
  const [visible, setVisible] = useState(true);

  const sortableDelete = (evt: any) => {
    // 组件名或路径
    const nameOrIndex = evt.clone.getAttribute("data-id");
    if (isPath(nameOrIndex)) {
      const oldIndex = nameOrIndex;
      let newTreeData = itemRemove(oldIndex, data);
      // 更新视图
      changeData(JSON.parse(JSON.stringify(newTreeData)));
      return;
    }
    setVisible(false);
    setVisible(true);
  };

  return (
    (visible || null) && (
      <>
        <h2>拖拽至此删除元素</h2>
        <div
          style={{
            width: "100%",
            height: "30%",
            padding: "20px",
            border: "1px dashed red",
          }}
        >
          <Sortable
            key={uniqueId()}
            style={{ width: "100%", height: "100%", padding: "20px" }}
            options={{
              group: {
                name: "formItem",
                put: true,
              },
              animation: 150,
              fallbackOnBody: true,
              swapThreshold: 0.65,
              onAdd: (evt: object) => sortableDelete(evt),
            }}
          ></Sortable>
        </div>
      </>
    )
  );
};

export default Dustbin;
