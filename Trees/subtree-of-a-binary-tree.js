class Solution {
    /**
     * @param {TreeNode} root
     * @param {TreeNode} subRoot
     * @return {boolean}
     */
    isSubtree(root, subRoot) {
        const preorder = (node) => {
            if (!node) return '_';
            return node.val + preorder(node.left) + preorder(node.right);
        }

        /** @type {string} */
        const rootPreorder = preorder(root);
        const subRootPreorder = preorder(subRoot);

        return this.zfind(subRootPreorder, rootPreorder);
    }

    /**
     * @param {string} pattern
     * @param {string} str
     * @returns {boolean}
     */
    zfind(pattern, str) {
        if (!pattern.length) return true;
        if (pattern.length > str.length) return false;

        // pattern: abcabc
        // str: aabcababcabcabcc
        // combined: abcabc$aabcababcabcabcc
        //          [a b c a b c $ a a b c a b a b c a b c a b c c]
        // zvalues: [0 0 0 3 0 0 _ 1 5 0 0 2 0 6 ]

        const zvalues = new Array(pattern.length);
        zvalues[0] = 0;

        let i = 1, j = 0;
        while (i < pattern.length) {
            while (i + j < pattern.length && pattern[i + j] === pattern[j]) j++;
            zvalues[i] = j;
            i++;

            const r = i + j - 1;
            let k = 1;
            while (i < r && i + zvalues[k] < r) zvalues[i++] = zvalues[k++];

            j = i < r ? k : 0;
        }

        i = 0, j = 0;
        while (i < str.length) {
            while (j < pattern.length && i + j < str.length && str[i + j] === pattern[j]) j++;
            if (j === pattern.length) return true;

            i++;
            const r = i + j - 1;
            let k = 1;
            for (; i < r && i + zvalues[k] < r; k++, i++);

            j = i < r ? k : 0;
        }

        return false;
    }
}