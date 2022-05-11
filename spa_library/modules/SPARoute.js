import { ExceptionHandler } from "./ExceptionHandler.js"

export default class SPARoute extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        this.#verifyAttribute('path')
        this.#verifyAttribute('page')
    }

    #verifyAttribute(attribute) {
        if(!this.getAttribute(attribute)) {
            new ExceptionHandler(`The "${attribute}" attribute in ${this.outerHTML} is mandatory.`)
        }
    }
}