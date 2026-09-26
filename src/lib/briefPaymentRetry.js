// Session 24. A brand pays for a UGC brief, then the app posts the brief with that paid order.
// If the post fails (network, server error), the money is already taken — pressing "Secure brief
// & pay" again used to open a NEW checkout and charge a second time. Now the paid order is kept
// on this device and the next tap posts the brief with it (the server checks it is paid, covers
// the escrow and funds nothing else).
const KEY = "ugc_paid_order";

export function getPaidBriefOrder() {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || "null");
    return v && typeof v.order_id === "string" && v.order_id ? v : null;
  } catch {
    return null;
  }
}

export function savePaidBriefOrder(orderId, amount) {
  try {
    if (orderId) localStorage.setItem(KEY, JSON.stringify({ order_id: orderId, amount: Number(amount) || 0, at: Date.now() }));
  } catch { /* storage unavailable */ }
}

export function clearPaidBriefOrder() {
  try { localStorage.removeItem(KEY); } catch { /* storage unavailable */ }
}

/** Server codes after which the saved order must not be tried again. */
export const FINAL_ORDER_CODES = ["PAYMENT_ALREADY_USED", "PAYMENT_TOO_LOW", "PAYMENT_NOT_COMPLETED"];
