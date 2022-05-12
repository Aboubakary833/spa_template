import { ExceptionHandler } from "./ExceptionHandler.js";
import PagesManager from "./PagesManager.js";

export default class SPARouter extends HTMLElement {
  static #rootElement;
  static #pageStyle;
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
            .getStyle(true)
            .getScript(true)

            const {template, style, script} = PagesManager.end()
            newRoot['template'] = template
            newRoot['style'] = style ?? null
            newRoot['script'] = script ?? null
        })
        return newRoot
      });

      this.#getActiveRoute()
      .then(data => {
          setTimeout(function() {
            SPARouter.render(data)
          }, 50)
      })

      window.addEventListener('pushstate', this.#handlePaginate.bind(this))
      window.addEventListener('popstate', this.#handlePaginate.bind(this))
  }

  async #getActiveRoute() {
    const regex = new RegExp(`${window.location.pathname}`, 'g')
    const activeRoute = this.#routes.filter(route => {
      if(regex.test(route.path)) return route;
    })[0]

    if(activeRoute != 'undefined') return activeRoute
  }

  #handlePaginate() {
    this.#getActiveRoute()
    .then(data => {
      console.log(data);
      SPARouter.render(data)
    })
  }

  static render(data) {
    if(data) {
      const {template, style, script} = data
      SPARouter.#pageStyle.innerHTML = style
      SPARouter.#rootElement.innerHTML = template
      SPARouter.#pageScript.innerHTML = script
    } else {
      const {style, template} = ExceptionHandler.getNotFoundComponents()
      SPARouter.#pageStyle.innerHTML = style
      SPARouter.#rootElement.innerHTML = template
    }
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
  static setPageStyle(styleElement) {
    this.#pageStyle = styleElement
  }
  static setPageScript(scriptElement) {
    this.#pageScript = scriptElement
  }
}
