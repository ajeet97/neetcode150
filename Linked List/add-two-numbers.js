/**
 * Definition for singly-linked list.
 * class ListNode {
 *     constructor(val = 0, next = null) {
 *         this.val = val;
 *         this.next = next;
 *     }
 * }
 */

class Solution {
    /**
     * @param {ListNode} l1
     * @param {ListNode} l2
     * @return {ListNode}
     */
    addTwoNumbers(l1, l2) {
        const root = new ListNode();
        let carry = 0;
        let sum = root;
        while (l1 || l2) {
            let s = carry;
            if (l1) s += l1.val;
            if (l2) s += l2.val;

            const digit = s % 10;
            carry = Math.floor(s / 10);

            sum.next = new ListNode(digit);
            l1 = l1?.next;
            l2 = l2?.next;
            sum = sum.next;
        }
        if (carry) sum.next = new ListNode(carry);
        return root.next;
    }
}
