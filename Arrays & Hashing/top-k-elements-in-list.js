class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number[]}
     */
    topKFrequent(nums, k) {
        const counts = {};
        for (const num of nums) {
            counts[num] = (counts[num] || 0) + 1;
        }

        const freq = new Array(nums.length + 1);
        for (const n in counts) {
            const f = counts[n];
            if (!freq[f]) freq[f] = [Number(n)];
            else freq[f].push(Number(n));
        }

        const topK = [];
        for (let i = freq.length - 1; i >= 0; i--) {
            if (freq[i]) {
                for (const n of freq[i]) {
                    topK.push(n);
                    if (topK.length == k) return topK;
                }
            }
        }
        return topK; // should never reach here
    }
}
