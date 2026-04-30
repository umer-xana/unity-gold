import React, { createContext, useContext, useState, useEffect } from "react";

type LanguageCode = "en" | "ja";

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Language selection
    "selectLanguage": "Select Language",
    "choosePreferredLanguage": "Choose your preferred Language",
    "continueWithLanguage": "Continue with English",
    "english": "English",
    "japanese": "Japanese",
    
    // Onboarding steps
    "loginSignUp": "Login/Sign Up",
    "loginSignUpSubtitle": "Please log in or sign up with your email address.",
    "continueWithGoogle": "Continue with Google",
    "continueWithEmail": "Continue with Email",
    
    "trackGoldValue": "Track Gold Value",
    "trackGoldValueSubtitle": "View your UGOLD balance in gold or USD. Switch the top tab to monitor real-time price changes and see your value rise or fall instantly.",
    
    "instantSwap": "Instant Swap",
    "instantSwapSubtitle": "Convert UGOLD to USDT or USDT to UGOLD quickly and securely with real-time pricing.",
    
    "stakeEarn": "Stake & Earn",
    "stakeEarnSubtitle": "Stake UGOLD to earn rewards. Choose an amount, start staking, and claim rewards to your wallet.",
    
    "claimRewards": "Claim Rewards",
    "claimRewardsSubtitle": "Claim rewards earned from staking UGOLD and add them directly to your wallet balance.",
    
    "ugoldWallet": "UGOLD Wallet",
    "ugoldWalletSubtitle": "View your UGOLD balance, staking rewards, and assets in one place. Send or receive funds securely anytime.",
    
    "manageProfile": "Manage Your Profile",
    "manageProfileSubtitle": "Update your username and email to keep your account information up to date.",
    
    "transactionHistory": "Transaction History",
    "transactionHistorySubtitle": "View a complete record of your activity, including sends, receives, swaps, staking, and rewards.",
    
    "inviteEarn": "Invite & Earn",
    "inviteEarnSubtitle": "Share your invite link and earn rewards from your referrals.",
    
    // Navigation
    "next": "Next",
    "back": "Back",
  },
  ja: {
    // Language selection
    "selectLanguage": "言語を選択",
    "choosePreferredLanguage": "希望の言語を選択してください",
    "continueWithLanguage": "日本語で続行",
    "english": "英語",
    "japanese": "日本語",
    
    // Onboarding steps
    "loginSignUp": "ログイン／新規登録",
    "loginSignUpSubtitle": "メールアドレスでログイン／新規登録してください。",
    "continueWithGoogle": "Googleで続ける",
    "continueWithEmail": "メールで続ける",
    
    "trackGoldValue": "金価格を追跡",
    "trackGoldValueSubtitle": "UGOLDの残高をゴールドまたはUSDで確認できます。上部のタブを切り替えることで、リアルタイムの価格変動を確認し、資産価値の上下をすぐに把握できます。",
    
    "instantSwap": "即時スワップ",
    "instantSwapSubtitle": "リアルタイム価格で、UGOLDとUSDTをすばやく安全に交換できます。UGOLDからUSDT、またはUSDTからUGOLDへ簡単にスワップできます。",
    
    "stakeEarn": "ステーキングで報酬獲得",
    "stakeEarnSubtitle": "UGOLDをステーキングして報酬を獲得しましょう。数量を選択してステーキングを開始し、報酬をウォレットで受け取ることができます。",
    
    "claimRewards": "報酬を受け取る",
    "claimRewardsSubtitle": "UGOLDのステーキングで獲得した報酬を受け取り、ウォレット残高に直接追加できます。",
    
    "ugoldWallet": "UGOLDウォレット",
    "ugoldWalletSubtitle": "UGOLDの残高、ステーキング報酬、および資産を一か所で表示します。いつでも安全に資金を送受信できます。",
    
    "manageProfile": "プロフィール管理",
    "manageProfileSubtitle": "ユーザー名とメールアドレスを更新して、アカウント情報を最新の状態に保ちましょう。",
    
    "transactionHistory": "取引履歴",
    "transactionHistorySubtitle": "送金、受取、スワップ、ステーキング、報酬など、すべての取引履歴を確認できます。",
    
    "inviteEarn": "招待して報酬獲得",
    "inviteEarnSubtitle": "招待リンクを共有して、紹介したユーザーから報酬を獲得しましょう。",
    
    // Navigation
    "next": "次へ",
    "back": "戻る",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage");
    return (savedLanguage === "ja" ? "ja" : "en") as LanguageCode;
  });

  const setLanguage = (newLanguage: LanguageCode) => {
    setLanguageState(newLanguage);
    localStorage.setItem("selectedLanguage", newLanguage);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};