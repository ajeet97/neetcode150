class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    isPalindrome(s) {
        let l = 0, r = s.length - 1;
        while (l < r) {
            const cl = s.charCodeAt(l);
            if (!this.isAlphaNum(cl)) { l++; continue; }

            const cr = s.charCodeAt(r);
            if (!this.isAlphaNum(cr)) { r--; continue; }

            if (!this.isEqualCaseInsensetive(cl, cr)) return false;

            l++; r--;
        }

        return true;
    }

    /**
     * @param {number} code character code
     */
    isAlphaNum(code) {
        return (
            (code > 47 && code < 58) // [0, 9]
            || (code > 64 && code < 91) // [A, Z]
            || (code > 96 && code < 123) // [a, z]
        );
    }

    /**
     * @param {number} code1 character code
     * @param {number} code2 character code
     */
    isEqualCaseInsensetive(code1, code2) {
        if (code1 < 58) return code1 == code2;
        if (code1 < 91) code1 += 32; // to lowercase
        if (code2 < 91) code2 += 32; // to lowercase
        return code1 == code2;
    }
}
