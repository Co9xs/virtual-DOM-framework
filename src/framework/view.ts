type NodeType = VNode | string | number
type Attributes = {
  [key: string]: string | Function
}

// 仮想DOM
export interface VNode {
  nodeName: keyof HTMLElementTagNameMap;
  attributes: Attributes;
  children: NodeType[];
}

// タグ名,属性,子ノードから仮想DOMを返す関数
export function h(
  nodeName: keyof HTMLElementTagNameMap,
  attributes: Attributes,
  ...children: NodeType[]
): VNode {
  return { nodeName, attributes, children }
}
