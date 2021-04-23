import { View, h, VNode } from './framework//view'
import { ActionTree } from './framework/action'
import { App } from './framework/controller'

type State = typeof state;
type Actions = typeof actions;

const state = {
  count: 0
}

const actions: ActionTree<State> = {
  increment: (state: State) => {
    state.count++
  },
  decrement: (state: State) => {
    state.count--
  }
}

const view: View<State, Actions> = (state, actions) => {
  const virtualNode: VNode = h(
    "div",
    {},
    h("p", {}, state.count),
    h("button", {type: "button", onclick: () => actions.increment(state)}, 'countUp'),
    h("button", {type: "button", onclick: () => actions.decrement(state)}, 'countDown'),
  )
  return virtualNode
}

new App<State, Actions>({
  el: "#app",
  state,
  view,
  actions,
})