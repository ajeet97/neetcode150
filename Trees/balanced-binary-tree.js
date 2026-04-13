/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     constructor(val = 0, left = null, right = null) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */

class Solution {
    /**
     * @param {TreeNode} root
     * @return {boolean}
     */
    isBalanced(root) {
        let balanced = true;
        const check = (node) => {
            if (!balanced || !node) return 0;
            const lh = check(node.left);
            const rh = check(node.right);
            if (Math.abs(lh - rh) > 1) balanced = false;
            return 1 + Math.max(lh, rh);
        }
        check(root);
        return balanced;
    }
}
