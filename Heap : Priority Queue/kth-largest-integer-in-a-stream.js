class KthLargest {
    /**
     * @param {number} k
     * @param {number[]} nums
     */
    constructor(k, nums) {
        this.h = new MinHeap(k);
        for (const n of nums) this.h.push(n);
    }

    /**
     * @param {number} val
     * @return {number}
     */
    add(val) {
        this.h.push(val);
        return this.h.top();
    }
}

class MinHeap {
    constructor(size) {
        this.data = [];
        this.size = size;
    }

    push(item) {
        if (this.data.length === this.size) {
            if (this.top() > item) return;

            this.pop();
        }

        this.data.push(item);
        this._heapifyUp();
    }

    pop() {
        if (this.data.length === 0) return null;
        if (this.data.length === 1) return this.data.pop();
        const min = this.data[0];
        this.data[0] = this.data.pop();
        this._heapifyDown();
        return min;
    }

    top() {
        return this.data[0];
    }

    _heapifyUp() {
        let i = this.data.length - 1;
        while (i > 0) {
            let p = Math.floor((i - 1) / 2);
            if (this.data[p] <= this.data[i]) break;

            [this.data[p], this.data[i]] = [this.data[i], this.data[p]];
            i = p;
        }
    }

    _heapifyDown() {
        let i = 0;
        while (2 * i + 1 < this.data.length) {
            let j = 2 * i + 1;
            if (j + 1 < this.data.length && this.data[j + 1] < this.data[j]) j++;
            if (this.data[i] <= this.data[j]) break;
            [this.data[i], this.data[j]] = [this.data[j], this.data[i]];
            i = j;
        }
    }
}