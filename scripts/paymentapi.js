import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
 
dotenv.config({ path: "../.env" });
 
const app = express();
app.use(express.json());
 
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
 
// POST /api/payments/create
app.post("/api/payments/create", async (req, res) => {
  try {
    const { products } = req.body;
 
    if (!products || !Array.isArray(products)) {
      return res.status(400).json({ error: "Products array is required" });
    }
 
    // Convert your product references into Stripe line items
    const line_items = products.map(product => ({
      price_data: {
        currency: "gbp",
        product_data: {
          name: product.name,
        },
        unit_amount: Math.round(product.price * 100), // convert to cents
      },
      quantity: product.quantity,
    }));
 
    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: "http://localhost:4242/api/payments/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://yourfrontend.com/cancel",
    });
 
    // Return session URL to the frontend
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
 
// Start server
const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));