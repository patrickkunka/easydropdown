class Dom {
    public select:    HTMLSelectElement = null;
    public root:      HTMLDivElement    = null;
    public head:      HTMLDivElement    = null;
    public value:     HTMLDivElement    = null;
    public body:      HTMLDivElement    = null;
    public arrow:     HTMLDivElement    = null;
    public itemsList: HTMLDivElement    = null;
    public item:      HTMLDivElement[]  = [];
    public group:     HTMLDivElement[]  = [];
    public option:    HTMLDivElement[]  = [];

    public sumItemsHeight(max: number = Infinity): number {
        let totalHeight = 0;

        for (let i = 0, item; (item = this.item[i]); i++) {
            if (i === max) break;

            totalHeight += item.offsetHeight;
        }

        return totalHeight;
    }
}

export default Dom;