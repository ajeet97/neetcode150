class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number}
     */
    findKthLargest(nums, k) {
        const ki = nums.length - k;
        const quickSelect = (l, r) => {
            const pivot = nums[r];
            let pi = l;
            for (let i = l; i < r; i++) {
                if (nums[i] <= pivot) {
                    [nums[i], nums[pi]] = [nums[pi], nums[i]];
                    pi++;
                }
            }
            [nums[r], nums[pi]] = [nums[pi], nums[r]];

            if (pi == ki) return nums[pi];
            if (pi < ki) return quickSelect(pi + 1, r);
            return quickSelect(l, pi - 1);
        }
        return quickSelect(0, nums.length - 1);
    }
}
