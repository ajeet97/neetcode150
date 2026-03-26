class Solution {
    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    threeSum(nums) {
        nums.sort((a, b) => a - b);

        const triplets = [];
        for (let i = 0; i <= nums.length - 3; i++) {
            if (nums[i] > 0) break; // all +ve numbers ahead
            if (i > 0 && nums[i] == nums[i - 1]) continue;

            let l = i + 1, r = nums.length - 1;
            while (l < r) {
                const sum = nums[i] + nums[l] + nums[r];
                if (sum > 0) r--;
                else if (sum < 0) l++;
                else {
                    triplets.push([nums[i], nums[l], nums[r]]);
                    l++;
                    r--;
                    while (l < r && nums[l] == nums[l - 1]) l++;
                }
            }
        }
        return triplets;
    }
}