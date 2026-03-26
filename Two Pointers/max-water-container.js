class Solution {
    /**
     * @param {number[]} heights
     * @return {number}
     */
    maxArea(heights) {
        let l = 0, r = heights.length - 1;
        let maxAmount = 0;
        while (l < r) {
            const amount = Math.min(heights[l], heights[r]) * (r - l);
            maxAmount = Math.max(maxAmount, amount);

            if (heights[l] < heights[r]) l++;
            else r--;
        }
        return maxAmount
    }
}