import PagesManager from "./PagesManager.js";

export class ExceptionHandler {

    #message;
    #element;
    static #notFoundComponents = {}

    /**
     * 
     * @param {String} message
     * @param {number} httpErrorCode
     * Throw new Exception if an error message is passed as argument
     * Return a HTTPError page if httpErrorCode is given
     */
    constructor(message = null, httpErrorCode = null) {
        this.#message = message
        if(message && httpErrorCode) {
            this.#fire(httpErrorCode)
        } else if(message) this.#fire()

        return this
    }
    
    /**
     * 
     */
    #fire(type = null) {
        if(type) {
            switch(typeof type) {
                case 'string': 
                    throw this.#message
                case 'number': 
                    return "HTTPError"

            }
        } else console.error(this.#message);
    }

    /**
     * Initialize an element for checking
     * @param {*} element 
     */

    init(element) {
        if(!element) {
            this.#message = 'NullError: "init" argument cannot be null'
            this.#fire('nullError')
        } else {
            this.#element = element
            return this
        }
    }

    /**
     * Check if an element is of a given type
     * @param {*} type 
     */
    isTypeof(type) {
        try {
            if(typeof this.#element !== type) {
                this.#message = `TypeError: Given argument must be of type ${type}`
                this.#fire('TypeError')
            }
            else return this
        } catch (error) {
            this.#message = error
            this.#fire()
        }
    }
    /**
     * Check if an element is an instance of a given interface
     * @param {*} typeof_interface 
     */
    isInstanceof(typeof_interface) {
        try {
            if(this.#element instanceof typeof_interface) return this
            else{
                this.#message = `InstanceError: Given argument must be an instance of ${interface_type.name}`
                this.#fire('InstanceError')
            }
        } catch (error) {
            this.#message = error
            this.#fire()
        }
    }

    /**
     * Fetch and destructure the 404 error page
     * @param {string} url 
     */
    static async loadNotFoundPage(url = `${window.location.origin}/spa_library/Errors/404.html`) {
        const response = await fetch(url)
            const data = await response.text()

            PagesManager.init(data)
            .getStyle(true)
            .getTemplate(true)
            
            this.#notFoundComponents = PagesManager.end()
    }

    /**
     * Get the 404 - not found error component
     * @returns Object
     */
    static getNotFoundComponents() {return this.#notFoundComponents}

}