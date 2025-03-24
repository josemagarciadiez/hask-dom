import { Component } from "../../src/core/component";

interface ButtonProps {
  text: string;
  onClick: () => void;
  id?: string;
}
export class Button extends Component {
  constructor(props: ButtonProps) {
    super(props, {});
  }

  render(): HTMLElement {
    const { text, id, onClick } = this.props;
    const $button = document.createElement("button");
    $button.textContent = text;
    $button.setAttribute("id", id || "");
    $button.classList = "class";
    $button.addEventListener("click", onClick);
    return $button;
  }
}
