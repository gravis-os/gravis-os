const posConfig = {
  // AppBar
  appBarHeight: 72,

  // AppCard
  appCardMinHeight: 120,

  // Button
  buttonMinWidth: 24,
  buttonMinHeight: 64,
  buttonFontSize: '1.25rem',

  // Cart Drawer
  cartDrawerMaxWidth: 450,
  cartPadding: 2,

  // ==============================
  // Constants
  // ==============================
  tax_rate: 0.07,
  prefix: 'POS',
  receipt_bucket: 'POS_receipt',
  default_currency: 'SGD',

  // ==============================
  // Routes
  // ==============================
  routes: {
    POS_HOME: '/dashboard',
    POS_PRODUCTS: '/dashboard/products',
    PAYMENT: '/dashboard/payment',
    PAYMENT_CASH: '/dashboard/payment/cash',
    PAYMENT_CREDIT_CARD: '/dashboard/payment/credit-card',
    PAYMENT_BANK_TRANSFER: '/dashboard/payment/bank-transfer',
    PAYMENT_SUCCESS: '/dashboard/payment/success',
    SEND_PAYMENT_RECEIPT: '/api/mail/payment',
  },
}

export default posConfig
