import { App } from "./App";

const app = new App();

const $root = document.getElementById("root")!;

$root.appendChild(app.render());
