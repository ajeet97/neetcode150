class Solution {
    /**
     * @param {string[]} tasks
     * @param {number} n
     * @return {number}
     */
    leastInterval(tasks, n) {
        if (n == 0) return tasks.length;

        const counts = new Array(26).fill(0);
        for (const task of tasks) counts[task.charCodeAt(0) - 65]++;

        const maxHeap = new Heap(
            /** @type {(a: number, b: number) => boolean} */
            (a, b) => a >= b
        );
        for (let i = 0; i < 26; i++) if (counts[i] > 0) maxHeap.push(counts[i]);

        /** @type {[number, number][]} */
        const cooldown = [];
        let cycles = 0;
        while (maxHeap.size || cooldown.length) {
            if (cooldown?.[0]?.[0] == cycles) maxHeap.push(cooldown.shift()[1]);

            cycles++;

            if (maxHeap.size) {
                // get most frequest task
                const count = maxHeap.pop();
                if (count > 1) cooldown.push([cycles + n, count - 1]);
            }
        }
        return cycles;
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