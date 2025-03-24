import { Component } from "../../src/core/component";

interface ListProps {
  data: string[];
}

export class List extends Component {
  constructor(props: ListProps) {
    super(props);
  }

  render(): HTMLElement {
    const $container = document.createElement("ol");

    this.props.data.map((item: string) => {
      const $li = document.createElement("li");
      const $text = document.createTextNode(item);
      $li.appendChild($text);
      $container.appendChild($li);
    });

    return $container;
  }
}
