import ComponentManager from "./modules/PagesManager.js";
import { ExceptionHandler } from "./modules/ExceptionHandler.js";
import SPARoute from "./modules/SPARoute.js";
import SPARouter from "./modules/SpaRouter.js";
import SPALink from "./modules/SPALink.js";

export default class SPA {
  /**
   *
   * Initialize the SPA
   *
   * @param {String} entrypoint
   * Path to the SPA entrypoint
   * @param {HTMLDIVElement} rootElement
   * Element that'll behave as the container for the app
   * @param {Object} options
   * Options for additionals settings
   */
  static async init(entrypoint, rootElement = null, options = {}) {

      ExceptionHandler.loadHTTPErrorsTemplates(options?.errorsTemplatePath, options?.errors);
    new ExceptionHandler().init(rootElement).isInstanceof(HTMLDivElement);
    SPARouter.setRootElement(rootElement)
    this.#initCustomElements();

    const data = await SPA.#fetchContent(entrypoint, "text");

    ComponentManager.init(data).getTemplate(true).getScript(true);
    const managed_component = ComponentManager.end();

    const router = document.createElement("div");
    const activePageStyle = document.createElement('style')
    const activePageScript = document.createElement('script')
    activePageStyle.setAttribute('pageStyle', true)
    activePageScript.setAttribute('pageScript', true)
    router.innerHTML = managed_component.template;
    rootElement.insertAdjacentElement("afterEnd", router);
    document.head.appendChild(activePageStyle)
    router.insertAdjacentElement("afterEnd", activePageScript);
    SPARouter.setPageStyle(activePageStyle)
    SPARouter.setPageScript(activePageScript)
  }

  static async #fetchContent(path, type = "json") {
    try {
      const response = await fetch(`${location.origin}/${path}`);
      if (!["arrayBuffer", "blob", "formData", "json", "text"].includes(type)) {
        new ExceptionHandler(
          `Given type ${type} does not appear to be <Promise> response method.`
        );
        return false;
      }
      return response[type]();
    } catch (error) {
      throw error;
    }
  }

  static #initCustomElements() {
    customElements.define("spa-router", SPARouter);
    customElements.define("spa-route", SPARoute);
    customElements.define('spa-link', SPALink)
  }
}

export const pushState = new Event('pushstate')