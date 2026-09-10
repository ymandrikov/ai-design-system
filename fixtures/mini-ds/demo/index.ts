import "../web-components/copy-button";
import "../web-components/select";
import "../web-components/dropdown-menu";
import "../web-components/toggle";
import { mountReactDemo, mountSettingsDemo } from "./react-app";

const reactRoot = document.getElementById("react-root");
if (reactRoot) mountReactDemo(reactRoot);

const settingsRoot = document.getElementById("settings-root");
if (settingsRoot) mountSettingsDemo(settingsRoot);

export { checkSettingsComposition } from "../product/check-composition";
