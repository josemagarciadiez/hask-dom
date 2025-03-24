import { generateUniqueKey } from "../utils/generate-key";

import { RegisterComponent } from "../decorators/register-element";

import { VirtualDOM } from "./virtual-dom";

@RegisterComponent
export abstract class Component {
  private readonly _key: string;

  protected readonly props: Record<string, any>;
  protected state: Record<string, any>;

  // Propiedad para futura expansion y aplicacion de diff y patches
  // con el fin de hacer mas eficiente la manipulacion del DOM
  private _domNode: HTMLElement | null = null;

  private _pendingState: Partial<typeof this.state> | null;

  constructor(props?: Record<string, any>, state?: Record<string, any>) {
    this._key = generateUniqueKey();
    this.props = props || {};
    this.state = state || {};
    this._pendingState = null;
  }

  public get key() {
    return this._key;
  }

  public get DOMNode() {
    return this._domNode;
  }

  public setDOMNode(element: HTMLElement) {
    this._domNode = element;
  }

  /** Metodo de implementacion obligatoria para todos los hijos */
  abstract render(): HTMLElement;

  /** Metodo para actualizar el estado local */
  protected setState(newState: Partial<typeof this.state>) {
    // Guardar nuevo estado en pending state
    this._pendingState = {
      ...this._pendingState,
      ...newState,
    };

    // Programar actualizacion
    VirtualDOM.instance.registerUpdate(this);
  }

  /** Metodo utilizado por el DOM Virtual */
  public performUpdate() {
    const prevState = { ...this.state };

    // Actualizar estado local
    if (this._pendingState) {
      this.state = {
        ...prevState,
        ...this._pendingState,
      };

      // Limpiar pending state
      this._pendingState = null;
    }

    // Generar html del componente con el nuevo estado
    return this.render();
  }
}
