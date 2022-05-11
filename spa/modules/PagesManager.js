import { ExceptionHandler } from "./ExceptionHandler.js";

export default class PagesManager {

    static #data = {}
    static #component;

    /**
     * 
     * @param {String} component 
     * @returns this
     * 
     * Get the component as string and init destructuration
     */
    static init(component = undefined) {
        if(!component) {
            new ExceptionHandler("'component' parameter can't be undefined.")
        } else {
            this.#component = component
            return this
        }
    }
    
    /**
     * 
     * @param {Boolean} proceed 
     * @returns String || this
     * 
     * Return HTMLScriptElement content as string if false passed as parameter
     * Or procceed if true passed as parameter
     */
    static getScript(proceed = false) {
        return this.#getData('script', proceed)
    }

    /**
     * 
     * @param {Boolean} proceed 
     * @returns String || this
     * 
     * Return HTMLTemplateElement content as string if false passed as parameter
     * Or procceed if true passed as parameter
     */
    static getTemplate(proceed = false) {
        return this.#getData('template', proceed)
    }

    
    static #getData(type, proceed) {
        const first_index = this.#component.indexOf(`<${type}>`)
        const second_index = this.#component.indexOf(`</${type}>`)

        let data = this.#component.substring(first_index + `<${type}>`.length, second_index)
        data = data.replace(/[\s]*/, '')
        if(proceed) {
            this.#data[type] = data
            return this
        }

        return data
    }

    /**
     * 
     * @returns Object
     * All operation after operation
     */
    static end() {
        return this.#data
    }

}