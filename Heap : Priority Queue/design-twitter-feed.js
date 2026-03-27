class Twitter {
    constructor() {
        this.feedSize = 10;
        this.time = 0;

        /** @type {{[userId: number]: Set<number>}} */
        this.followings = {};
        /** @type {{[userId: number]: [number, number]}} */
        this.tweets = {};
    }

    /**
     * @param {number} userId
     * @param {number} tweetId
     * @return {void}
     */
    postTweet(userId, tweetId) {
        if (!this.tweets[userId]) this.tweets[userId] = [];
        this.tweets[userId].push([this.time++, tweetId]);

        if (this.tweets[userId].length > this.feedSize) {
            this.tweets[userId].shift();
        }
    }

    /**
     * @param {number} userId
     * @return {number[]}
     */
    getNewsFeed(userId) {
        const maxHeap = new Heap((a, b) => a[0] >= b[0]);
        const followings = this.followings[userId] || new Set();
        followings.add(userId);


        const minHeap = new Heap((a, b) => a[0] <= b[0]);
        followings.forEach((followeeId) => {
            if (!this.tweets[followeeId]?.length) return;

            const idx = this.tweets[followeeId].length - 1;
            const mostRecentTweet = this.tweets[followeeId][idx]
            if (minHeap.size < this.feedSize) {
                minHeap.push([...mostRecentTweet, followeeId, idx - 1]);
            } else if (minHeap.top()[0] < mostRecentTweet[0]) {
                minHeap.pop();
                minHeap.push([...mostRecentTweet, followeeId, idx - 1]);
            }
        });
        minHeap.tweets.forEach((tweet) => maxHeap.push(tweet));

        const result = [];
        while (maxHeap.size && result.length < this.feedSize) {
            const [_, tweetId, userId, nextIndex] = maxHeap.pop();
            result.push(tweetId);
            if (nextIndex >= 0) {
                maxHeap.push([...this.tweets[userId][nextIndex], userId, nextIndex - 1]);
            }
        }
        return result;
    }

    /**
     * @param {number} followerId
     * @param {number} followeeId
     * @return {void}
     */
    follow(followerId, followeeId) {
        if (followerId === followeeId) return;
        if (!this.followings[followerId]) this.followings[followerId] = new Set([followeeId]);
        else this.followings[followerId].add(followeeId);
    }

    /**
     * @param {number} followerId
     * @param {number} followeeId
     * @return {void}
     */
    unfollow(followerId, followeeId) {
        if (followerId === followeeId) return;
        this.followings[followerId].delete(followeeId);
    }
}

/**
 * @template {T}
 */
class Heap {
    /**
     * @param {(a: T, b: T) => boolean} cmp 
     */
    constructor(cmp) {
        this.cmp = cmp || ((a, b) => a <= b);
        /** @type {T[]} */
        this.tweets = [];
    }

    /** @param {T} tweet */
    push(tweet) {
        this.tweets.push(tweet);
        this._heapifyUp();
    }

    pop() {
        if (this.tweets.length === 0) return null;
        if (this.tweets.length === 1) return this.tweets.pop();
        const top = this.tweets[0];
        this.tweets[0] = this.tweets.pop();
        this._heapifyDown();
        return top;
    }

    get top() {
        return this.tweets[0];
    }

    get size() {
        return this.tweets.length;
    }

    _heapifyUp() {
        let i = this.tweets.length - 1;
        while (i > 0) {
            let p = Math.floor((i - 1) / 2);
            if (this.cmp(this.tweets[p], this.tweets[i])) break;

            [this.tweets[p], this.tweets[i]] = [this.tweets[i], this.tweets[p]];
            i = p;
        }
    }

    _heapifyDown() {
        let i = 0;
        while (2 * i + 1 < this.tweets.length) {
            let j = 2 * i + 1;
            if (j + 1 < this.tweets.length && this.cmp(this.tweets[j + 1], this.tweets[j])) j++;
            if (this.cmp(this.tweets[i], this.tweets[j])) break;
            [this.tweets[i], this.tweets[j]] = [this.tweets[j], this.tweets[i]];
            i = j;
        }
    }
}