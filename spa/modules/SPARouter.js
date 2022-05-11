import { ExceptionHandler } from "./ExceptionHandler.js";
import PagesManager from "./PagesManager.js";

export default class SPARouter extends HTMLElement {
  static #rootElement;
  static #pageScript;
  #routes = [];

  constructor() {
    super();
  }

  connectedCallback() {
    const routes = Array.from(document.querySelectorAll("spa-route"));
    const nonRouteElements = routes.filter((route) => {
      if (route.nodeName !== "SPA-ROUTE") return route;
    });

    if (nonRouteElements.length) {
      new ExceptionHandler(
        "Only <spa-route> elements must be enclosed by spa-router!"
      );
    } else
      this.#routes = routes.map((route) => {
        const path = route.getAttribute('path')
        const page = route.getAttribute('page')
        const newRoot = {
          path,
          pageName: page
        }

        this.#fetchPage(page)
        .then(data => {
          PagesManager
            .init(data)
            .getTemplate(true)
            .getScript(true)

            const destructured = PagesManager.end()
            newRoot['template'] = destructured.template
            newRoot['script'] = destructured.script
        })
        return newRoot
      });

      this.#getActiveRoute()
      .then(data => {
        setTimeout(function() {
          const {template, script} = data
          SPARouter.#rootElement.innerHTML = template
          SPARouter.#pageScript.innerHTML = script
        }, 30)
      })
  }

  async #getActiveRoute() {
    return this.#routes.find(async (route) => {
      if(new RegExp(`^${window.location.pathname}$`).test(route.path)) {
        return route
      }
    }
    );
  }

  /**
   * Fetch the route page content
   * @param {string} page 
   * @returns string
   */
  async #fetchPage(page) {
    try {
        const response = await fetch(`src/Pages/${page}.html`)
        const data = await response.text()
        return data
    } catch (error) {
        new ExceptionHandler(error)
    }
}

  static setRootElement(rootElement) {
    this.#rootElement = rootElement
  }
  static setPageScript(scriptElement) {
    this.#pageScript = scriptElement
  }
}
