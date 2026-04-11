class Codec {
    /**
     * Encodes a tree to a single string.
     *
     * @param {TreeNode} root
     * @return {string}
     */
    serialize(root) {
        const preorder = (node) => {
            if (!node) return '_';
            const nodeVal = node.val == null ? '-' : node.val;
            return nodeVal + ',' + preorder(node.left) + ',' + preorder(node.right);
        }
        return preorder(root);
    }

    /**
     * Decodes your encoded data to tree.
     *
     * @param {string} data
     * @return {TreeNode}
     */
    deserialize(data) {
        if (!data) return null;

        const values = data.split(',');
        let i = 0;
        const build = () => {
            if (i >= values.length) return null;
            if (values[i] == '_') { i++; return null; }
            const nodeVal = values[i] == '-' ? null : Number(values[i]);
            i++;
            return new TreeNode(nodeVal, build(), build());
        }
        return build();
    }
}