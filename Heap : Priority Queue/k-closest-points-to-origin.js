class Solution {
    /**
     * @param {number[][]} points
     * @param {number} k
     * @return {number[][]}
     */
    kClosest(points, k) {
        const h = new MaxHeap();
        for (const coord of points) {
            const p = new Point(coord)
            if (h.size < k) {
                h.push(p);
            } else if (h.top.origDistSq > p.origDistSq) {
                h.pop();
                h.push(p)
            }
        }
        return h.points.map(p => p.coord);
    }
}

class Point {
    constructor([x, y]) {
        this.coord = [x, y];
        this.origDistSq = x * x + y * y;
    }
}

class MaxHeap {
    constructor() {
        /** @type {Point[]} */
        this.points = [];
    }

    push(point) {
        this.points.push(point);
        this._heapifyUp();
    }

    pop() {
        if (this.points.length === 0) return null;
        if (this.points.length === 1) return this.points.pop();
        const top = this.points[0];
        this.points[0] = this.points.pop();
        this._heapifyDown();
        return top;
    }

    get top() {
        return this.points[0];
    }

    get size() {
        return this.points.length;
    }

    _heapifyUp() {
        let i = this.points.length - 1;
        while (i > 0) {
            let p = Math.floor((i - 1) / 2);
            if (this.points[p].origDistSq >= this.points[i].origDistSq) break;

            [this.points[p], this.points[i]] = [this.points[i], this.points[p]];
            i = p;
        }
    }

    _heapifyDown() {
        let i = 0;
        while (2 * i + 1 < this.points.length) {
            let j = 2 * i + 1;
            if (j + 1 < this.points.length && this.points[j + 1].origDistSq > this.points[j].origDistSq) j++;
            if (this.points[i].origDistSq >= this.points[j].origDistSq) break;
            [this.points[i], this.points[j]] = [this.points[j], this.points[i]];
            i = j;
        }
    }
}