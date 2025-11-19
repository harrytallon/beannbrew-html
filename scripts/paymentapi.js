import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
 
dotenv.config({ path: "../.env" });
 
const app = express();
app.use(express.json());
 
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


// status for the /api/ page to confirm whether its working (it should be...)
app.get("/api/", async (req, res) => {
  return res.status(200).json({ status: "200: Okay", message: "Bean 'n' Brew Payment API"})
});
 
// POST /api/payments/create
app.post("/api/payments/create", async (req, res) => {
  try {
    const { products } = req.body;
 
    if (!products || !Array.isArray(products)) {
      return res.status(400).json({ error: "Products array is required" });
    }
 
    const line_items = products.map(product => ({
      price_data: {
        currency: "gbp",
        product_data: {
          name: product.name,
        },
        unit_amount: Math.round(product.price * 100),
      },
      quantity: product.quantity,
    }));
 
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: "http://localhost:4242/api/payments/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://yourfrontend.com/cancel",
    });
 
    res.json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/payments/success", async (req, res) => {
  const { session_id } = req.query;
 
  if (!session_id) {
    return res.status(400).json({ error: "Missing session_id" });
  }
 
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
 
 
    console.log("Payment success for session:", session.id);
 
    res.json({
      message: "Payment successful!",
      session
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});
 
const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));