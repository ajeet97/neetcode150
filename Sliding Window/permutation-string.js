class Solution {
    /**
     * @param {string} s1
     * @param {string} s2
     * @return {boolean}
     */
    checkInclusion(s1, s2) {
        if (s1.length > s2.length) return false;

        const cc = (s, i) => s.charCodeAt(i) - 97;

        const counts = new Array(26).fill(0);
        for (let i = 0; i < s1.length; i++) {
            counts[cc(s1, i)]++;
        }

        let l = 0, r = 0;
        while (r < s2.length) {
            const rc = cc(s2, r);
            if (counts[rc] > 0) {
                if (r - l + 1 === s1.length) return true;
                counts[rc]--;
                r++;
            } else {
                if (l < r) counts[cc(s2, l)]++;
                l++;
                if (l > r) r = l;
            }
        }
        return false;
    }
}