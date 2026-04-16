class CountSquares {
    constructor() {
        /** @type {Map<number, Map<number, number>>} */
        this.counts = new Map();
    }

    /**
     * @param {number[]} point
     * @return {void}
     */
    add([x, y]) {
        if (!this.counts.has(x)) this.counts.set(x, new Map());
        const c = this.counts.get(x).get(y) ?? 0;
        this.counts.get(x).set(y, 1 + c);
    }

    /**
     * @param {number[]} point
     * @return {number}
     */
    count([qx, qy]) {
        if (!this.counts.has(qx)) return 0;

        const countAtSide = (y, side) => (
            (this.counts.get(qx + side)?.get(qy) ?? 0) *
            (this.counts.get(qx + side)?.get(y) ?? 0)
        );

        let total = 0;
        for (const [y, count] of this.counts.get(qx)) {
            if (y === qy) continue;

            total += count * (
                countAtSide(y, y - qy) +
                countAtSide(y, qy - y)
            );
        }
        return total;
    }
}