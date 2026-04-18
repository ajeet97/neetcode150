class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    missingNumber(nums) {
        let missing = 0;
        for (let i = 0; i < nums.length; i++) {
            missing ^= nums[i] ^ (i + 1);
        }
        return missing;
    }
}