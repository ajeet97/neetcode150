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
     * @return {number}
     */
    maxPathSum(root) {
        if (!root) return 0;
        let max = root.val;
        const maxDepthSum = (node) => {
            if (!node) return 0;

            const leftMax = Math.max(maxDepthSum(node.left), 0);
            const rightMax = Math.max(maxDepthSum(node.right), 0);

            max = Math.max(max, node.val + leftMax + rightMax);

            return node.val + Math.max(leftMax, rightMax);
        }
        maxDepthSum(root);

        return max;
    }
}
