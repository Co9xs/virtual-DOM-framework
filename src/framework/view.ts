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

enum ChangeType {
  None,
  Type,
  Text,
  Node,
  Value,
  Attr
}

function hasChanged(a: NodeType, b: NodeType): ChangeType {
  if (typeof a !== typeof b) {
    return ChangeType.Type
  }

  if (!isVNode(a) && a !== b) {
    return ChangeType.Text
  }

  if (isVNode(a) && isVNode(b)) {
    if (a.nodeName !== b.nodeName) {
      return ChangeType.Node
    }
    if (a.attributes.value !== b.attributes.value) {
      return ChangeType.Value
    }
    if (JSON.stringify(a.attributes) !== JSON.stringify(b.attributes)) {
      return ChangeType.Attr
    }
  }
  return ChangeType.None
}

export function updateElement(
  parent: HTMLElement,
  oldNode: NodeType,
  newNode: NodeType,
  index: number = 0,
): void {
  if (!oldNode) {
    parent.appendChild(createElement(newNode))
    return
  }
  const target = parent.childNodes[index]
  if (!newNode) {
    parent.removeChild(target)
    return
  }

  const changeType = hasChanged(oldNode, newNode);
  switch (changeType) {
    case ChangeType.Type:
    case ChangeType.Text:
    case ChangeType.Node:
      parent.replaceChild(createElement(newNode), target)
      break;
    case ChangeType.Value:
      updateValue(
        target as HTMLInputElement,
        (newNode as VNode).attributes.value as string
      )
      break;
    case ChangeType.Attr:
      updateAttributes(
        target as HTMLElement,
        (oldNode as VNode).attributes,
        (newNode as VNode).attributes
      )
      break;
  }

  if (isVNode(oldNode) && isVNode(newNode)) {
    for (
      let i = 0;
      i < newNode.children.length || i < oldNode.children.length;
      i++
    ) {
      updateElement(
        target as HTMLElement,
        oldNode.children[i],
        newNode.children[i],
        i
      );
    }
  }
}

function updateAttributes(
  target: HTMLElement,
  oldAttrs: Attributes,
  newAttrs: Attributes
): void {
  for (let attr in oldAttrs) {
    if (!isEventAttr(attr)) {
      target.removeAttribute(attr);
    }
  }
  for (let attr in newAttrs) {
    if (!isEventAttr(attr)) {
      target.setAttribute(attr, newAttrs[attr] as string);
    }
  }
}

function updateValue(target: HTMLInputElement, newValue: string) {
  target.value = newValue
}
