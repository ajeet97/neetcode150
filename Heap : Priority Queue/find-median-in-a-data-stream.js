class MedianFinder {
    constructor() {
        /** @type {Heap<number>} */
        this.leftHalf = new Heap((a, b) => a >= b); // Max Heap
        /** @type {Heap<number>} */
        this.rightHalf = new Heap((a, b) => a <= b); // Min Heap
    }

    /**
     *
     * @param {number} num
     * @return {void}
     */
    addNum(num) {
        if (!this.leftHalf.size || num <= this.leftHalf.top) {
            this.leftHalf.push(num);
        } else {
            this.rightHalf.push(num);
        }

        if (this.leftHalf.size > this.rightHalf.size + 1) {
            this.rightHalf.push(this.leftHalf.pop());
        } else if (this.rightHalf.size > this.leftHalf.size + 1) {
            this.leftHalf.push(this.rightHalf.pop());
        }
    }

    /**
     * @return {number}
     */
    findMedian() {
        if (this.leftHalf.size > this.rightHalf.size) return this.leftHalf.top;
        if (this.leftHalf.size < this.rightHalf.size) return this.rightHalf.top;
        return (this.leftHalf.top + this.rightHalf.top) / 2;
    }
}

/**
 * @template T
 */
class Heap {
    /**
     * @param {(a: T, b: T) => boolean} cmp 
     */
    constructor(cmp) {
        this.cmp = cmp || ((a, b) => a <= b);
        /** @type {T[]} */
        this.data = [];
    }

    /** @param {T} item */
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
            if (this.cmp(this.data[p], this.data[i])) break;

            [this.data[p], this.data[i]] = [this.data[i], this.data[p]];
            i = p;
        }
    }

    _heapifyDown() {
        let i = 0;
        while (2 * i + 1 < this.data.length) {
            let j = 2 * i + 1;
            if (j + 1 < this.data.length && this.cmp(this.data[j + 1], this.data[j])) j++;
            if (this.cmp(this.data[i], this.data[j])) break;
            [this.data[i], this.data[j]] = [this.data[j], this.data[i]];
            i = j;
        }
    }
}