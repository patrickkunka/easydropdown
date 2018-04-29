class Dom {
    public select:    HTMLSelectElement = null;
    public root:      HTMLDivElement    = null;
    public head:      HTMLDivElement    = null;
    public value:     HTMLDivElement    = null;
    public body:      HTMLDivElement    = null;
    public arrow:     HTMLDivElement    = null;
    public itemsList: HTMLDivElement    = null;
    public group:     HTMLDivElement[]  = [];
    public option:    HTMLDivElement[]  = [];

    public get firstOption(): HTMLDivElement {
        return this.option[0] || null;
    }

    public get optionHeight(): number {
        if (!this.firstOption) return -1;

        return this.firstOption.offsetHeight;
    }
}

export default Dom;