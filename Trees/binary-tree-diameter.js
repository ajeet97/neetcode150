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
    diameterOfBinaryTree(root) {
        if (!root) return 0;

        let diameter = 0;
        const maxDepth = (node) => {
            if (!node) return 0;

            const leftMax = maxDepth(node.left);
            const rightMax = maxDepth(node.right);

            if (leftMax + rightMax > diameter) {
                diameter = leftMax + rightMax;
            }
            return 1 + Math.max(leftMax, rightMax);
        }
        maxDepth(root);

        return diameter;
    }
}
