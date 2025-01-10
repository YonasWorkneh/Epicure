import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import { AppState } from "react-native";

// Define the shape of your context value
interface TabContextValue {
  activeTab: string;
  menuOpened: boolean;
  showTabBar: boolean;
  setShowTabBar: (opened: boolean) => void;
  setMenuOpened: (opened: boolean) => void;
  setActiveTab: (tab: string) => void;
}

// Create the context
const TabContext = createContext<TabContextValue | undefined>(undefined);

// Create a provider component
export const TabContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeTab, setActiveTab] = useState<string>("");
  const [menuOpened, setMenuOpened] = useState<boolean>(false);
  const [showTabBar, setShowTabBar] = useState<boolean>(true);

  return (
    <TabContext.Provider
      value={{
        activeTab,
        menuOpened,
        showTabBar,
        setShowTabBar,
        setMenuOpened,
        setActiveTab,
      }}
    >
      {children}
    </TabContext.Provider>
  );
};

// Custom hook to access the TabContext
export const useTabContext = (): TabContextValue => {
  const tabContext = useContext(TabContext);

  if (!tabContext) {
    throw new Error("useTabContext must be used within a TabProvider");
  }

  return tabContext;
};
