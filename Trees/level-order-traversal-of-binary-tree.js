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
     * @return {number[][]}
     */
    levelOrder(root) {
        if (!root) return [];
        const levels = [];
        const queue = [root];
        let front = 0;
        while (front < queue.length) {
            const level = [];
            const currentLevel = queue.length;
            while (front < currentLevel) {
                if (queue[front]) {
                    level.push(queue[front].val);
                    queue.push(queue[front].left);
                    queue.push(queue[front].right);
                }
                front++;
            }
            if (level.length) levels.push(level);
        }
        return levels;
    }
}
