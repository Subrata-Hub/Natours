/* eslint-disable */
import axios from 'axios';
const stripe = Stripe(
  'pk_test_51MtY7eSAB6VC5SixVZccD4Hhg0tFln5HaTyLE0nCuJnuMuqQ3AsUMrmEPGZZHBs032EnHsdJr5r7TEzBMKFtWufn0023IPzLxx'
);

// export const bookTour = async (tourId) => {
//   // 1) Get checkout session from api
//   // const session = await axios(`http://127.0.0.1:8000/api/v1/users/bookings/checkout-session/${tourId}`);
//   const session = await axios(`/api/v1/users/bookings/checkout-session/${tourId}`);
//   console.log(session);
// };

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from api
    const session = await axios.get(`http://127.0.0.1:8000/api/v1/bookings/checkout-session/${tourId}`);
    console.log(session);
    // 2) Create checkout from + cherge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
  }
};
