// WARNING: These keys and credentials should NEVER be exposed on the client-side.
// In a real application, this logic would be handled by a secure backend server.
// The frontend would call an endpoint on that server, which would then securely
// communicate with the M-Pesa API. Exposing these keys here is for
// demonstration purposes only and is a major security risk.
const MPESA_CONSUMER_KEY = 'xmEuHSsWLMgQ6KAHUSNUeUFlpAgI1YALOIXKoWEg8VhBBzlE';
const MPESA_CONSUMER_SECRET = 'OtoUDEtespTYeBfbMQ74iiXddGyWQfFJ9BNXMJuROR3sW2lk49buZEPljd2Cln01';
const MPESA_SHORTCODE = '174379';
const MPESA_PASSKEY = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919';

/**
 * Simulates initiating an M-Pesa STK push.
 * In a real app, this would make a request to your backend server.
 * @param phoneNumber The phone number to send the push to.
 * @param amount The amount to request.
 * @returns A promise that resolves to 'success' or 'failed'.
 */
export const initiateStkPush = (phoneNumber: string, amount: number): Promise<'success' | 'failed'> => {
  console.log(`Initiating STK push for ${phoneNumber} with amount ${amount}`);
  console.log(`Business Shortcode: ${MPESA_SHORTCODE}`);
  console.log(`Using (mock) consumer key: ${MPESA_CONSUMER_KEY} and secret.`);
  console.log(`Using (mock) passkey.`);

  // In a real application, you would make a POST request to your backend here.
  // Your backend would then securely use the credentials to talk to the M-Pesa API.
  // The backend would handle creating the timestamp and password for the STK push.
  // Example:
  // return fetch('/api/initiate-mpesa-payment', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ phoneNumber, amount }),
  // }).then(res => res.json()).then(data => data.status);

  return new Promise((resolve) => {
    // Simulate network delay and user interaction with the STK push
    setTimeout(() => {
      // 80% success rate for the simulation
      const isSuccess = Math.random() > 0.2;
      
      if (isSuccess) {
        console.log('M-Pesa payment simulation successful.');
        resolve('success');
      } else {
        console.log('M-Pesa payment simulation failed.');
        resolve('failed');
      }
    }, 4000); // Simulate a 4-second delay for the entire process
  });
};
