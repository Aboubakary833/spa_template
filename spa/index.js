import ComponentManager from "./modules/ComponentManager.js";
import { ExceptionHandler } from "./modules/ExceptionHandler.js";
import SPARoute from "./modules/SPARoute.js";
import SPARouter from "./modules/SpaRouter.js";

export default class SPA {
    /**
     * 
     * Initialize the SPA
     * 
     * @param {String} entrypoint 
     * Path to the SPA entrypoint
     * @param {*} rootElement 
     * Element that'll behave as the container for the app
     */
    static async init(entrypoint, rootElement = null) {

        new ExceptionHandler()
        .init(rootElement)
        .isInstanceof(HTMLDivElement)
        this.#initRouter()

        const data = await SPA.#fetchContent(entrypoint, 'text')

        ComponentManager
        .init(data)
        .getTemplate(true)
        .getScript(true)
        const managed_component = ComponentManager.end()

        const router = document.createElement('div')
        router.innerHTML = managed_component.template
        rootElement.insertAdjacentElement('afterEnd', router)
    }

    static async #fetchContent(path, type = 'json') {
        
        try {
            const response = await fetch(`${location.origin}/${path}`)
            if(!['arrayBuffer', 'blob', 'formData', 'json', 'text'].includes(type)) {
                new ExceptionHandler(`Given type ${type} does not appear to be <Promise> response method.`)
                return false
            }
            return response[type]()
        } catch (error) {
            throw error
        }
    }

    static #initRouter() {
        customElements.define('spa-router', SPARouter)
        customElements.define('spa-route', SPARoute)
    }
}

export const mounted = (callback) => {
    MountedEvent()
    callback()
}