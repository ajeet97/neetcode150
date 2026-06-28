/**
 * // Definition for a Node.
 * class Node {
 *     constructor(val = 0, neighbors = []) {
 *       this.val = val;
 *       this.neighbors = neighbors;
 *     }
 * }
 */

class Solution {
    /**
     * @param {Node} node
     * @return {Node}
     */
    cloneGraph(node) {
        if (!node) return null;

        const oldToNewMap = new Map();
        const clone = (curr) => {
            const newNode = new Node(curr.val);
            oldToNewMap.set(curr, newNode);

            for (const neighbor of curr.neighbors) {
                newNode.neighbors.push(
                    oldToNewMap.has(neighbor)
                        ? oldToNewMap.get(neighbor)
                        : clone(neighbor)
                );
            }
            return newNode;
        }

        return clone(node);
    }
}
