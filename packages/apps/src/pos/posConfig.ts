const posConfig = {
  // AppBar
  appBarHeight: 72,

  // AppCard
  appCardMinHeight: 120,

  buttonFontSize: '1.25rem',
  buttonMinHeight: 64,
  // Button
  buttonMinWidth: 24,

  // Cart Drawer
  cartDrawerMaxWidth: 450,
  cartPadding: 2,

  // ==============================
  // Constants
  default_currency: 'SGD',
  prefix: 'POS',
  receipt_bucket: 'POS_receipt',
  // ==============================
  routes: {
    PAYMENT: '/dashboard/payment',
    PAYMENT_BANK_TRANSFER: '/dashboard/payment/bank-transfer',
    PAYMENT_CASH: '/dashboard/payment/cash',
    PAYMENT_CREDIT_CARD: '/dashboard/payment/credit-card',
    PAYMENT_SUCCESS: '/dashboard/payment/success',
    POS_HOME: '/dashboard',
    POS_PRODUCTS: '/dashboard/products',
    SEND_PAYMENT_RECEIPT: '/api/mail/payment',
  },

  // ==============================
  // Routes
  // ==============================
  tax_rate: 0.08,
}

export default posConfig
