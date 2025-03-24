# Hask DOM 🌐

## Descripción

Hask DOM es una librería ligera de componentes para desarrollo web que implementa un sistema de gestión centralizada del DOM a traves de componentes de clase con estado local. 

Está diseñada para simplificar la creación de interfaces de usuario simples en JS/TS.

## Características Principales 🚀

- Componentes con Estado: Cada componente puede gestionar su propio estado interno. Al modificar el estado interno, se genera una nueva renderizacion del componente.

- DOM Centralizado: La manipulacion del DOM esta centralizada en un solo lugar. No se aplican algoritmos de diff en la primera version.

## Uso Básico 🖥️

### Creando un Componente Básico

```ts
import { Component } from "hask-dom";

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
```

### Usando componentes dentro de componentes

```ts
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
```

### Ejemplo de punto de entrada de la app

```ts
import { App } from "./App";

const app = new App();

const $root = document.getElementById("root")!;

$root.appendChild(app.render());
```

## Limitaciones Actuales ⚠️

* Implementación temprana del DOM Virtual

* No incluye algoritmo completo de diff y patch

* Requiere más pruebas y optimizaciones

## Licencia

Licencia - MIT