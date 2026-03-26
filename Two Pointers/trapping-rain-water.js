class Solution {
    /**
     * @param {number[]} heights
     * @return {number}
     */
    trap(heights) {
        if (!heights?.length) return 0;

        let trapped = 0;
        let l = 0, r = heights.length - 1;
        let leftMax = heights[l], rightMax = heights[r];

        while (l < r) {
            if (leftMax < rightMax) {
                l++;
                leftMax = Math.max(leftMax, heights[l]);
                trapped += leftMax - heights[l];
            } else {
                r--;
                rightMax = Math.max(rightMax, heights[r]);
                trapped += rightMax - heights[r];
            }
        }

        return trapped;
    }
}