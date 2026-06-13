class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    climbStairs(n) {
        if (n < 2) return 1;

        let p1 = 1, p2 = 1;
        let ways = 0;
        for (let i = 2; i <= n; i++) {
            ways = p1 + p2;
            p1 = p2;
            p2 = ways;
        }
        return ways;
    }
}
