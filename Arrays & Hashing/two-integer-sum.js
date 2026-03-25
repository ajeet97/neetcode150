class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number[]}
     */
    twoSum(nums, target) {
        const h = new Map();
        for (let j = 0; j < nums.length; j++) {
            const i = h.get(target - nums[j]);
            if (i != null) return [i, j];
            h.set(nums[j], j)
        }
        return [-1, -1]; // should never reach here
    }
}
