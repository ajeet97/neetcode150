class Solution {
    /**
     * @param {character[][]} board
     * @return {boolean}
     */
    isValidSudoku(board) {
        const grids = new Array(9).fill(0);
        const rows = new Array(9).fill(0);
        const cols = new Array(9).fill(0);

        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                const n = board[r][c];
                if (n == '.') continue;

                const mask = 1 << n;

                const gi = Math.floor(r / 3) * 3 + Math.floor(c / 3);
                if (mask & (grids[gi] | rows[r] | cols[c])) return false;

                grids[gi] |= mask;
                rows[r] |= mask;
                cols[c] |= mask;
            }
        }

        return true;
    }
}