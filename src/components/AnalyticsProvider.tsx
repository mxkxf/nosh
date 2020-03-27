import React from "react";

export const AnalyticsContext = React.createContext({
  track: (payload?: { [key: string]: any }) => {},
});

const AnalyticsProvider: React.FC = ({ children }) => {
  const track = (payload?: { [key: string]: any }) => {
    setTimeout(() => {
      (window as any).Strata.page(payload);
    }, 100);
  };

  React.useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@mikefrancis/strata.js@1/dist/index.js";
    script.async = true;
    script.onload = () => {
      (window as any).Strata.init(process.env.REACT_APP_STRATA_KEY);
    };

    const head = document.getElementsByTagName("head").item(0);
    head?.appendChild(script);

    return () => {
      head?.removeChild(script);
    };
  }, []);

  return (
    <AnalyticsContext.Provider value={{ track }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export default AnalyticsProvider;
