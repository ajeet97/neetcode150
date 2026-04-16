class Solution {
    /**
     * @param {number[][]} times
     * @param {number} n
     * @param {number} k
     * @return {number}
     */
    networkDelayTime(times, n, k) {
        const children = Array.from({ length: n + 1 }, () => []);
        for (const [u, v, t] of times) {
            children[u].push([v, t]);
        }
        console.log('children:', children);

        const minHeap = new Heap((a, b) => a[0] <= b[0]);
        const visited = Array.from({ length: n + 1 });
        const shortestDistances = Array.from({ length: n + 1 }, () => Infinity);
        shortestDistances[k] = 0;

        minHeap.push([0, k]);
        while (minHeap.size) {
            const node = minHeap.pop()[1];

            if (visited[node]) continue;
            visited[node] = true;

            for (const [v, t] of children[node]) {
                if (!visited[v]) {
                    const newDist = shortestDistances[node] + t;
                    if (shortestDistances[v] > newDist) {
                        shortestDistances[v] = newDist;
                        minHeap.push([newDist, v]);
                    }
                }
            }
        }

        let maxDelay = -1;
        for (let i = 1; i <= n; i++) {
            maxDelay = Math.max(maxDelay, shortestDistances[i]);
        }
        return maxDelay == Infinity ? -1 : maxDelay;
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