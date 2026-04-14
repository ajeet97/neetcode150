class Solution {
    /**
     * @param {number[][]} grid
     */
    islandsAndTreasure(grid) {
        const m = grid.length;
        const n = grid[0].length;


        const bfs = (x, y) => {
            const queue = [[x - 1, y, 1], [x + 1, y, 1], [x, y - 1, 1], [x, y + 1, 1]];
            const visited = Array.from({ length: m }, () => Array.from({ length: n }, () => false));
            while (queue.length) {
                const [i, j, dist] = queue.shift();
                if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length) continue;
                if (grid[i][j] <= 0) continue;
                if (visited[i][j]) continue;

                visited[i][j] = true;
                grid[i][j] = Math.min(grid[i][j], dist);

                queue.push(
                    [i - 1, j, dist + 1],
                    [i + 1, j, dist + 1],
                    [i, j - 1, dist + 1],
                    [i, j + 1, dist + 1],
                );
            }
        }

        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (grid[i][j] === 0) {
                    bfs(i, j);
                }
            }
        }
    }
}