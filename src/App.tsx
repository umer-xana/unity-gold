import React from "react";
import { Icon } from "@iconify/react";
import { Button, Input } from "@heroui/react";
import { BottomNavigation } from "./components/bottom-navigation";
import { CurrencyToggle } from "./components/currency-toggle";
import { PriceIndicator } from "./components/price-indicator";
import { Swap } from "./pages/swap";
import { Home } from "./pages/home";
import { Stake } from "./pages/stake";
import { YourStakesPage } from "./pages/your-stakes-page";
import { Wallet } from "./pages/wallet";
import { Other } from "./pages/other";
import { ProfilePage } from "./pages/profile-page";
import { HistoryPage } from "./pages/history-page";
import { LanguagePage } from "./pages/language-page";
import { UsernamePage } from "./pages/username-page";
import { PersonalInformationPage } from "./pages/personal-information-page";
import { CurrencyProvider } from "./context/currency-context";
import { LanguageProvider } from "./context/language-context";
import { Onboarding } from "./pages/onboarding";
import { LanguageSelection } from "./pages/language-selection";
import { SendPage } from "./pages/send";
import { ReceivePage } from "./pages/receive-page";

export default function App() {
  const [currentPage, setCurrentPage] = React.useState<string>("language-selection");
  const [previousPage, setPreviousPage] = React.useState<string>("home");
  const [languageSelected, setLanguageSelected] = React.useState<boolean>(
    localStorage.getItem("languageSelected") === "true"
  );
  const [onboardingCompleted, setOnboardingCompleted] = React.useState<boolean>(
    localStorage.getItem("onboardingCompleted") === "true"
  );
  
  const handleNavigation = (page: string) => {
    if (page !== currentPage) {
      setPreviousPage(currentPage);
      setCurrentPage(page);
    }
  };
  
  const handleBack = () => {
    setCurrentPage(previousPage);
  };

  const handleLanguageSelected = () => {
    setLanguageSelected(true);
    setCurrentPage("onboarding");
  };

  const handleOnboardingComplete = () => {
    setOnboardingCompleted(true);
    setCurrentPage("home");
  };

  const renderPage = () => {
    // Show language selection first if not completed
    if (!languageSelected && currentPage === "language-selection") {
      return <LanguageSelection onComplete={handleLanguageSelected} />;
    }
    
    // Then show onboarding if not completed
    if (!onboardingCompleted && (currentPage === "onboarding" || (!languageSelected && languageSelected))) {
      return <Onboarding onComplete={handleOnboardingComplete} />;
    }

    // Otherwise show regular pages
    switch (currentPage) {
      case "home":
        return <Home onNavigate={handleNavigation} />;
      case "swap":
        return <Swap onNavigate={handleNavigation} />;
      case "stake":
        return <Stake onNavigate={handleNavigation} />;
      case "wallet":
        return <Wallet onNavigate={handleNavigation} />;
      case "other":
        return <Other onNavigate={handleNavigation} />;
      case "profile":
        return <ProfilePage onBack={() => handleNavigation("other")} onNavigate={handleNavigation} />;
      case "history":
        return <HistoryPage onBack={() => handleNavigation("other")} />;
      case "language":
        return <LanguagePage onBack={() => handleNavigation("other")} />;
      case "username":
        return <UsernamePage onBack={() => handleNavigation("other")} />;
      case "personal-information":
        return <PersonalInformationPage onBack={() => handleNavigation("profile")} />;
      case "send":
        return <SendPage onBack={() => handleNavigation("wallet")} onNavigate={handleNavigation} />;
      case "receive":
        return <ReceivePage onBack={() => handleNavigation("wallet")} onNavigate={handleNavigation} />;
      case "your-stakes":
        return <YourStakesPage onBack={handleBack} />;
      default:
        return <Home onNavigate={handleNavigation} />;
    }
  };

  return (
    <LanguageProvider>
      <CurrencyProvider>
        {renderPage()}
      </CurrencyProvider>
    </LanguageProvider>
  );
}