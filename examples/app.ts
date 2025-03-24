import { Component } from "../src/core/component";
import { Button } from "./components/button";
import { Counter } from "./components/counter";
import { List } from "./components/list";

export class App extends Component {
  private items = ["Item 1", "Item 2", "Item 3"];

  constructor() {
    super({}, { show: true });
  }

  public render(): HTMLElement {
    const $container = document.createElement("div");

    const $counter = new Counter().render();

    const $alert = new Button({
      text: "Click Me",
      onClick: () => alert("Click funcione"),
    }).render();

    const $toggle = new Button({
      text: "Toggle component",
      onClick: () => this.setState({ show: !this.state.show }),
    }).render();

    const $component = this.state.show ? $counter : $alert;

    const $list = new List({ data: this.items }).render();

    $container.append($component, $toggle, $list);

    return $container;
  }
}
