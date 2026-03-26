class Solution {
    /**
     * @param {number[]} stones
     * @return {number}
     */
    lastStoneWeight(stones) {
        const h = new MaxHeap();
        for (const stone of stones) h.push(stone);

        while (h.size > 1) {
            const newStone = h.pop() - h.pop();
            if (newStone > 0) h.push(newStone);
        }

        return h.top ?? 0;
    }
}

class MaxHeap {
    constructor() {
        this.data = [];
    }

    push(item) {
        this.data.push(item);
        this._heapifyUp();
    }

    pop() {
        if (this.data.length === 0) return null;
        if (this.data.length === 1) return this.data.pop();
        const top = this.data[0];
        this.data[0] = this.data.pop();
        this._heapifyDown();
        return top;
    }

    get top() {
        return this.data[0];
    }

    get size() {
        return this.data.length;
    }

    _heapifyUp() {
        let i = this.data.length - 1;
        while (i > 0) {
            let p = Math.floor((i - 1) / 2);
            if (this.data[p] >= this.data[i]) break;

            [this.data[p], this.data[i]] = [this.data[i], this.data[p]];
            i = p;
        }
    }

    _heapifyDown() {
        let i = 0;
        while (2 * i + 1 < this.data.length) {
            let j = 2 * i + 1;
            if (j + 1 < this.data.length && this.data[j + 1] > this.data[j]) j++;
            if (this.data[i] >= this.data[j]) break;
            [this.data[i], this.data[j]] = [this.data[j], this.data[i]];
            i = j;
        }
    }
}