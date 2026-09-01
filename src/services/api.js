export const fetchExchangeRates = async (base = "USD") => {
  try {
    const response = await fetch(`https://open.er-api.com/v6/latest/${base}`);
    if (!response.ok) {
      throw new Error("Failed to fetch exchange rates");
    }
    const data = await response.json();
    return data.rates || {};
  } catch (error) {
    console.error("Exchange rate fetch error:", error);
    // Fallback baseline conversion rates
    return {
      USD: 1,
      EUR: 0.92,
      GBP: 0.79,
      LKR: 305.0,
      INR: 83.5,
      AUD: 1.52,
      CAD: 1.36
    };
  }
};