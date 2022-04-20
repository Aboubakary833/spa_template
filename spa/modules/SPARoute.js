import ComponentManager from "./ComponentManager.js";
import { ExceptionHandler } from "./ExceptionHandler.js"

export default class SPARoute extends HTMLElement {
    #template;
    #script;
    constructor() {
        super()
    }

    connectedCallback() {
        this.#verifyAttribute('path')
        this.#verifyAttribute('component')
        this.#fetchComponent()
        .then(data => {
            ComponentManager
            .init(data)
            .getTemplate(true)
            .getScript(true)

            const destructed_data = ComponentManager.end()
            this.#template = destructed_data['template']
            this.#script = destructed_data['script']
        })
    }

    async #fetchComponent() {
        try {
            const response = await fetch(`src/Components/${this.getAttribute('component')}.html`)
            const data = await response.text()
            return data
        } catch (error) {
            new ExceptionHandler(error)
        }
    }

    #verifyAttribute(attribute) {
        if(!this.getAttribute(attribute)) {
            new ExceptionHandler(`The ${attribute} attribute in ${this.outerHTML} is mandatory.`)
        }
    }
}