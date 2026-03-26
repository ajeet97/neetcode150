class Solution {
    // without using division operator
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    productExceptSelf(nums) {
        const leftProducts = new Array(nums.length);
        const rightProducts = new Array(nums.length);

        for (let i = 0; i < nums.length; i++) {
            leftProducts[i] = i == 0 ? 1 : leftProducts[i - 1] * nums[i - 1];

            const j = nums.length - i - 1;
            rightProducts[j] = j == nums.length - 1 ? 1 : rightProducts[j + 1] * nums[j + 1];
        }

        const result = new Array(nums.length);
        for (let i = 0; i < nums.length; i++) result[i] = leftProducts[i] * rightProducts[i];

        return result;
    }
}
