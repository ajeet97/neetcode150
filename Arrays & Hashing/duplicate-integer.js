class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    hasDuplicate(nums) {
        const exists = new Set();
        for (const num of nums) {
            if (exists.has(num)) return true;
            exists.add(num);
        }
        return false;
    }
}
