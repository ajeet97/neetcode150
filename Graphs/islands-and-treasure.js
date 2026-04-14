class Solution {
    /**
     * @param {number[][]} grid
     */
    islandsAndTreasure(grid) {
        const M = grid.length;
        const N = grid[0].length;

        const visited = Array.from({ length: M }, () => Array.from({ length: N }, () => false));
        const queue = [];
        let front = 0;

        for (let i = 0; i < M; i++) {
            for (let j = 0; j < N; j++) {
                if (grid[i][j] === 0) {
                    visited[i][j] = true;
                    queue.push([i, j]);
                }
            }
        }

        const push = (i, j) => {
            if (i < 0 || i >= M || j < 0 || j >= N) return;
            if (visited[i][j]) return;
            if (grid[i][j] === -1) return;
            visited[i][j] = true;
            queue.push([i, j]);
        }

        let dist = 0;
        while (front < queue.length) {
            const currentLevel = queue.length;
            while (front < currentLevel) {
                const [i, j] = queue[front];
                grid[i][j] = dist;

                push(i - 1, j, dist + 1);
                push(i + 1, j, dist + 1);
                push(i, j - 1, dist + 1);
                push(i, j + 1, dist + 1);

                front++;
            }
            dist++;
        }
    }
}