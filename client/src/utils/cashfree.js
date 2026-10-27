// Utility helper to load and interact with Cashfree Web JS SDK v3

export const loadCashfreeScript = () => {
  return new Promise((resolve, reject) => {
    if (window.Cashfree) {
      resolve(window.Cashfree);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
    script.async = true;
    script.onload = () => {
      if (window.Cashfree) {
        resolve(window.Cashfree);
      } else {
        reject(new Error('Cashfree SDK loaded but object not found'));
      }
    };
    script.onerror = () => reject(new Error('Failed to load Cashfree JS SDK'));
    document.body.appendChild(script);
  });
};

export const startCashfreeCheckout = async (paymentSessionId, environment = 'sandbox') => {
  try {
    const Cashfree = await loadCashfreeScript();
    const cashfree = Cashfree({
      mode: environment === 'production' ? 'production' : 'sandbox'
    });

    const checkoutOptions = {
      paymentSessionId: paymentSessionId,
      redirectTarget: '_modal' // Opens in popup modal overlay
    };

    return cashfree.checkout(checkoutOptions);
  } catch (error) {
    console.error('Error starting Cashfree checkout:', error);
    throw error;
  }
};
