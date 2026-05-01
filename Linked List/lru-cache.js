class LLNode {
    /**
     * @param {number} key
     * @param {number} value
     */
    constructor(key, value) {
        this.key = key;
        this.value = value;
        /** @type {LLNode | null} */
        this.prev = null;
        /** @type {LLNode | null} */
        this.next = null;
    }
}

class LRUCache {
    /**
     * @param {number} capacity
     */
    constructor(capacity) {
        this.capacity = capacity;

        this.head = new LLNode(-1, -1);
        this.tail = new LLNode(-1, -1);
        this.head.next = this.tail;
        this.tail.prev = this.head;

        /** @type {Map<number, LLNode>} */
        this.cache = new Map();
    }

    /**
     * @param {number} key
     * @return {number}
     */
    get(key) {
        const node = this.cache.get(key);
        if (!node) return -1;

        this._remove(node);
        this._insert(node);

        return node.value;
    }

    /**
     * @param {number} key
     * @param {number} value
     * @return {void}
     */
    put(key, value) {
        let node = this.cache.get(key);
        if (node) this._remove(node);

        node = new LLNode(key, value);
        this._insert(node);
        this.cache.set(key, node);

        // evict LRU
        if (this.cache.size > this.capacity) {
            this.cache.delete(this.tail.prev.key);
            this._remove(this.tail.prev);
        }
    }

    /** @param {LLNode} */
    _insert(node) {
        node.prev = this.head;
        node.next = this.head.next;
        this.head.next.prev = node;
        this.head.next = node;
    }

    /** @type {LLNode} */
    _remove(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
}