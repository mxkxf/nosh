import React from "react";

export const AnalyticsContext = React.createContext({
  isLoaded: false,
  trackPage: (payload?: Object) => {},
});

const AnalyticsProvider: React.FC = ({ children }) => {
  const [isLoaded, setLoaded] = React.useState(false);

  const trackPage = (payload?: Object) => {
    if (isLoaded) {
      (window as any).Strata.page(payload);
    }
  };

  React.useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@mikefrancis/strata.js@1/dist/index.js";
    script.async = true;
    script.onload = () => {
      setLoaded(true);
      (window as any).Strata.init(process.env.REACT_APP_STRATA_KEY);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <AnalyticsContext.Provider value={{ isLoaded, trackPage }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export default AnalyticsProvider;
