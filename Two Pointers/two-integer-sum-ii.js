class Solution {
    /**
     * @param {number[]} numbers non decreasing
     * @param {number} target
     * @return {number[]}
     */
    twoSum(numbers, target) {
        let l = 0, r = numbers.length - 1;
        while (l < r) {
            const sum = numbers[l] + numbers[r];
            if (sum < target) l++;
            else if (sum > target) r--;
            else return [l + 1, r + 1];
        }
        throw new Error('should never reach here');
    }
}