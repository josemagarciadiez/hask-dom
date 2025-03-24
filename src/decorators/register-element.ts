import { Component } from "../core/component";

export function RegisterComponent<T extends typeof Component>(
  ComponentClass: T
): T {
  return new Proxy(ComponentClass, {
    // Intercepta la creacion de nuevas instancias
    construct(target, args, newTarget) {
      // Crear instancia original
      const instance = Reflect.construct(target, args, newTarget) as Component;

      // Obtener la implementacion original del metodo render
      const originalRender = instance.render;

      // Sobreescribir metodo render
      instance.render = function (this: Component): HTMLElement {
        // Obtener markup del componente
        const element = originalRender.apply(this);

        // Si el elemento es valido, se actualiza la referencia
        if (element instanceof HTMLElement) {
          // Establecer el nodo DOM
          this.setDOMNode(element);
        }

        element.setAttribute("data-key", this.key);
        
        return element;
      };

      return instance;
    },
  }) as T;
}
