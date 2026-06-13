class Solution {
    /**
     * @param {number[]} cost
     * @return {number}
     */
    minCostClimbingStairs(cost) {
        if (cost.length < 2) return cost[cost.length - 1];

        let c1 = cost[0], c2 = cost[1];
        for (let i = 2; i < cost.length; i++) {
            const tmp = c2;
            c2 = cost[i] + Math.min(c1, tmp);
            c1 = tmp;
        }
        return Math.min(c1, c2);
    }
}
