import { Component } from "./component";

export class VirtualDOM {
  private static _instance: VirtualDOM;

  private constructor() {}

  // Singleton pattern
  public static get instance() {
    if (!VirtualDOM._instance) {
      VirtualDOM._instance = new VirtualDOM();
    }

    return VirtualDOM._instance;
  }

  private pendingUpdates: Set<Component> = new Set();
  private _isUpdateScheduled: boolean = false;

  public registerUpdate(component: Component) {
    // Agregar componente a la agenda de actualizaciones
    this.pendingUpdates.add(component);

    // Si no hay una actualizacion en progreso
    if (!this._isUpdateScheduled) {
      // Marcar que se va a actualizar
      this._isUpdateScheduled = true;
      // Correr las actualizaciones
      this._processUpdate();
    }
  }

  private _processUpdate() {
    // Con esto las actualizaciones ocurrirar en el proximo refresco de la pantalla
    requestAnimationFrame(() => {
      // Generar un iterable a partir de la agenda de actualizaciones
      const componentsToUpdate = Array.from(this.pendingUpdates);

      // Limpiar la agenda
      this.pendingUpdates.clear();
      this._isUpdateScheduled = false;

      // Recorrer los componentes que requieren actualizacion
      componentsToUpdate.forEach((component) => {
        // Obtener version actualizada del html del componente
        const updateElement = component.performUpdate();

        // Obtener el componente que esta en el DOM actualmente,
        // usando la key unica para buscarlo.
        const oldElement = document.querySelector(
          `[data-key="${component.key}"]`
        );

        // TODO: Apply diff & patch algorithm here
        // Ir al padre del elemento actual del DOM, y reemplazar todo el nodo completo.
        oldElement?.parentNode?.replaceChild(updateElement, oldElement);
      });
    });
  }
}
