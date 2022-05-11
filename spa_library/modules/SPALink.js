import { PathChanged } from "../index.js"

export default class SPALink extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        const content = this.innerHTML
        const attrs = Array.from(this.attributes).map(attr => `${attr.name}="${attr.value}"`).join(' ')
        this.innerHTML = `
            <a ${attrs}>
                ${content}
            </a>
        `

        this.handleRedirect()
        
    }

    handleRedirect() {
        Array.from(this.querySelectorAll('a')).forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault()
                window.history.pushState({}, '', link.href)
                window.dispatchEvent(PathChanged)
            })
        })
    }
}