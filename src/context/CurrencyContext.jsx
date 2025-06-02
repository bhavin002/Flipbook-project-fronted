import { createContext, useContext, useState, useEffect } from "react";
import { GetCurrencyApi } from "@/service/currency.service";
import { useAuth } from "./AuthContext";

const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        setLoading(true);
        const response = await GetCurrencyApi();

        // Transform API data to the format needed by components
        const formattedCurrencies = response.data.map(currency => ({
          value: currency._id,
          label: `${currency.code} (${currency.name})`
        }));

        setCurrencies(formattedCurrencies);
      } catch (err) {
        setError(err.message || "Failed to fetch currencies");
      } finally {
        setLoading(false);
      }
    };
    if (isAuthenticated) {
      fetchCurrencies();
    }
  }, [isAuthenticated]);

  return (
    <CurrencyContext.Provider value={{ currencies, loading, error }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => useContext(CurrencyContext);