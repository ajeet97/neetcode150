class Solution {
    /**
     * @param {number[]} prices
     * @return {number}
     */
    maxProfit(prices) {
        let leftMin = prices[0];
        let profit = 0;
        for (let i = 1; i < prices.length; i++) {
            profit = Math.max(profit, prices[i] - leftMin);
            leftMin = Math.min(leftMin, prices[i]);
        }
        return profit;
    }
}
