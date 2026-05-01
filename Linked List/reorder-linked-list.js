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
     * @param {ListNode} head
     * @return {void}
     */
    reorderList(head) {
        const mid = this.middle(head);
        const p2 = this.reverse(mid.next);

        mid.next = null;
        this.mergeParts(head, p2);
    }

    mergeParts(p1, p2) {
        while (p1) {
            const p1Next = p1.next;
            p1.next = p2;

            p1 = p2;
            p2 = p1Next;
        }
    }

    middle(head) {
        let slow = head, fast = head;
        while (fast?.next?.next != null) {
            slow = slow.next;
            fast = fast.next?.next;
        }
        return slow;
    }

    reverse(head) {
        if (!head) return null;
        let node = head.next;
        head.next = null;
        while (node) {
            const tmp = node.next;
            node.next = head;
            head = node;
            node = tmp;
        }
        return head;
    }
}