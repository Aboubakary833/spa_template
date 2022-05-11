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

        
    }

    handleRedirect(e) {
        console.log(e);
    }
}