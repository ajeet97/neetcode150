/**
 * @typedef TreeNode
 * @property {number} val
 * @property {TreeNode} left
 * @property {TreeNode} right
 */

class Solution {
    /**
     * @param {TreeNode} root
     * @return {TreeNode}
     */
    invertTree(root) {
        const invert = (node) => {
            if (!node) return;
            [node.left, node.right] = [node.right, node.left];
            invert(node.left);
            invert(node.right);
        }

        invert(root);
        return root;
    }
}
