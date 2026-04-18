// const MAX = 2147483647; // 2 ^ 31 - 1
// const MIN = -2147483648; // -2 ^ 31
const MAX10 = 214748364; // MAX / 10
const MIN10 = -214748364; // MIN / 10
const MAX_LAST_DIGIT = 7; // MAX % 10
const MIN_LAST_DIGIT = -8; // MIN % 10

class Solution {
    /**
     * @param {number} x
     * @return {number}
     */
    reverse(x) {
        let ans = 0;
        while (x != 0) {
            if (ans > MAX10 || ans < MIN10) return 0;

            const digit = x % 10;

            if (ans === MAX10 && digit > MAX_LAST_DIGIT) return 0;
            if (ans === MIN10 && digit < MIN_LAST_DIGIT) return 0;

            x = Math.trunc(x / 10);
            ans = ans * 10 + digit;
        }
        return ans;
    }
}