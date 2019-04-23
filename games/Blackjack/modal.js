class Modal {
    constructor(modalContainer, showByDefault = false) {
        this.html = modalContainer;
        this.isOpen = showByDefault;

        if(showByDefault)
            this.open();
    }
    open() {
        this.isOpen = true;
        this.html.style.display = "block";
    }

    close() {
        this.isOpen = false;
        this.html.style.display = "none";
    }
}