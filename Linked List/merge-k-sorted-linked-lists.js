/**
 * Definition for singly-linked list.
 * class ListNode {
 *     constructor(val = 0, next = null) {
 *         this.val = val;
 *         this.next = next;
 *     }
 * }
 */

class Solution {
    /**
     * @param {ListNode[]} lists
     * @return {ListNode}
     */
    mergeKLists(lists) {
        this.minHeap = new Heap((a, b) => a.val <= b.val);
        for (const list of lists) {
            this.minHeap.push(list);
        }

        const merged = new ListNode();
        let node = merged;
        while (this.minHeap.size) {
            const min = this.minHeap.pop();
            if (min.next) this.minHeap.push(min.next);

            node.next = min;
            node = node.next;
        }
        return merged.next;
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