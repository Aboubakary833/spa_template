import { ExceptionHandler } from "./ExceptionHandler.js";

export default class PagesManager {

    static #data = {}
    static #component;

    /**
     * Get the component as string and init destructuration
     * 
     * @param {String} component 
     * @returns this
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
     * Return HTMLScriptElement content as string if false passed as parameter
     * Or procceed if true passed as parameter
     * 
     * @param {Boolean} proceed 
     * @returns String || this
     */
    static getScript(proceed = false) {
        return this.#getData('script', proceed)
    }

    /**
     * 
     * @param {Boolean} proceed 
     * @returns || string || this
     */
    static getStyle(proceed = false) {
        return this.#getData('style', proceed)
    }

    /**
     * Return HTMLTemplateElement content as string if false passed as parameter
     * Or procceed if true passed as parameter
     * 
     * @param {Boolean} proceed 
     * @returns String || this
     */
    static getTemplate(proceed = false) {
        return this.#getData('template', proceed)
    }

    /**
     * Destructure data
     * 
     * @param {string} type 
     * @param {boolean} proceed 
     * @returns 
     */

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
     * Get the complete data from the destructuring process
     * 
     * @returns Object
     */
    static end() {
        return this.#data
    }

}