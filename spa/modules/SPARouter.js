import { ExceptionHandler } from "./ExceptionHandler.js"

export default class SPARouter extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        const routes = Array.from(document.querySelectorAll('spa-route'))
        const non_route_element = routes.filter(route => {
            if(route.nodeName !== 'SPA-ROUTE') return route
        })

        if(non_route_element.length) {
            new ExceptionHandler("Only <spa-route> elements must be enclosed by spa-router!");
        }

        routes.forEach(route => {
            console.log(route);
        })
    }
}