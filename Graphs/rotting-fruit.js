class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    orangesRotting(grid) {
        if (!grid.length) return -1;

        const M = grid.length;
        const N = grid[0].length;

        const inbound = (i, j) => (i >= 0 && j >= 0 && i < M && j < N);

        let rotten = []
        let fresh = 0
        for (let i = 0; i < M; i++) {
            for (let j = 0; j < N; j++) {
                if (grid[i][j] === 2) rotten.push([i, j]);
                else if (grid[i][j] === 1) fresh++;
            }
        }

        let time = 0;
        const dir = [[-1, 0], [0, -1], [1, 0], [0, 1]];
        while (fresh > 0 && rotten.length) {
            const newRotten = [];
            for (const [i, j] of rotten) {
                for (const [di, dj] of dir) {
                    const [x, y] = [i + di, j + dj];
                    if (inbound(x, y) && grid[x][y] === 1) {
                        grid[x][y] = 2;
                        newRotten.push([x, y]);
                        fresh--;
                    }
                }
            }
            rotten = newRotten;
            time++;
        }

        return fresh > 0 ? -1 : time;
    }
}
