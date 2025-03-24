import { Component } from "../../src/core/component";
import { Button } from "./button";

export class Counter extends Component {
  constructor() {
    super({}, { count: 0 });
  }

  render(): HTMLElement {
    const $container = document.createElement("div");

    const $span = document.createElement("span");
    $span.textContent = `Contador: ${this.state.count}`;

    const $buttonUp = new Button({
      text: "Incrementar",
      onClick: () => this.setState({ count: this.state.count + 1 }),
    }).render();

    const $buttonDown = new Button({
      text: "Decrementar",
      id: "my-id",
      onClick: () => {
        if (this.state.count > 0) {
          this.setState({ count: this.state.count - 1 });
        }
      },
    }).render();

    $container.append(...[$span, $buttonUp, $buttonDown]);

    return $container;
  }
}
