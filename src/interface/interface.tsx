// 底层非容器组件列表
export interface IComponentList {
  id: string;
  type: string;
  props?: IComponentListProps;
}

export interface IComponentListProps {
  name: string;
}
