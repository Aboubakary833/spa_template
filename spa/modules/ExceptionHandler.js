export class ExceptionHandler {

    #message;
    #element;

    /**
     * 
     * @param {String} message
     * throw new Exception if an error message is passed as argument
     */
    constructor(message = null) {
        this.#message = message
        if(this.#message) {
            this.#fire()
        }

        return this
    }
    
    /**
     * 
     */
    #fire(type = null) {
        if(type) {
            throw this.#message
        }
        else console.error(`Error: ${this.#message}`)
    }

    /**
     * Initialize an element for checking
     * @param {*} element 
     */

    init(element) {
        if(!element) {
            this.#message = 'NullError: "init" argument cannot be null'
            this.#fire()
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
                this.#fire()
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
                this.#fire()
            }
        } catch (error) {
            this.#message = error
            this.#fire()
        }
    }


}