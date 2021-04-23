// Nodeが取りうる3種の型
type NodeType = VNode | string | number
// 属性の型
type Attributes = {
  [key: string]: string | Function
}

// 仮想DOMの一つのオブジェクトの型
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

// 仮想DOMからリアルDOMを生成する関数
export function createElement(node: NodeType): HTMLElement | Text {
  if (!isVNode(node)) {
    return document.createTextNode(node.toString())
  }
  const element = document.createElement(node.nodeName)
  setAttributes(element, node.attributes);
  node.children.forEach(child => element.appendChild(createElement(child)))
  return element
}

// onClickなどのイベントのときはイベントリスナを登録、それ以外は属性として登録する関数
function setAttributes(target: HTMLElement, attrs: Attributes) {
  for (let attr in attrs) {
    if (isEventAttr(attr)) {
      const eventName = attr.slice(2);
      target.addEventListener(eventName, attrs[attr] as EventListener)
    } else {
      target.setAttribute(attr, attrs[attr] as string)
    }
  }
}

// Nodeを受け取り仮想DOMかどうかを判定
function isVNode(node: NodeType): node is VNode {
  return typeof node !== "string" && typeof node !== "number"
}

//属性を受け取りイベントかどうかを判定
function isEventAttr(attr: string): boolean {
  return /^on/.test(attr);
}