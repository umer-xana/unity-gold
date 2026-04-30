import React from "react";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/language-context";

interface LanguageSelectionProps {
  onComplete: () => void;
}

interface LanguageOption {
  code: "en" | "ja";
  name: string;
  localName: string;
  flag: string;
}

export const LanguageSelection: React.FC<LanguageSelectionProps> = ({ onComplete }) => {
  const { language, setLanguage, t } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = React.useState<"en" | "ja">(language);

  const languages: LanguageOption[] = [
    {
      code: "ja",
      name: "Japanese",
      localName: "日本語",
      flag: "https://ik.imagekit.io/mjoh996/images/images/unity-gold/jp-flag.svg",
    },
    {
      code: "en",
      name: "English",
      localName: "English",
      flag: "https://ik.imagekit.io/mjoh996/images/images/unity-gold/eng-flag.svg",
    },
  ];

  const handleContinue = () => {
    setLanguage(selectedLanguage);
    localStorage.setItem("languageSelected", "true");
    onComplete();
  };

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <div 
        className="relative mx-auto max-w-md min-h-screen overflow-hidden"
        style={{
          backgroundImage: "url('https://ik.imagekit.io/mjoh996/images/images/unity-gold/envato-labs-image-edit 1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className="relative z-10 px-10 pt-10 pb-[36px] flex flex-col h-[100dvh] overflow-y-auto hide-scrollbar">
          {/* Title and subtitle */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-[38px] mt-0"
          >
            <h1 className="text-[28px] leading-[39px] font-medium mb-2 text-white">
              {t("selectLanguage")}
            </h1>
            <p className="text-[18px] leading-[22px] tracking-[-0.42px] text-[#c1c1c1] font-medium">
              {t("choosePreferredLanguage")}
            </p>
          </motion.div>
          
          {/* Language options */}
          <div className="space-y-[14px] flex-grow">
            {languages.map((lang, index) => (
              <motion.div
                key={lang.code}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className={`flex items-center justify-between py-[15px] px-6 rounded-[22px] bg-black/50 cursor-pointer ${
                  selectedLanguage === lang.code ? " border border-[#EBC17B]" : "bg-black/50"
                }`}
                onClick={() => setSelectedLanguage(lang.code)}
              >
                <div className="flex items-center">
                  <img
                    src={lang.flag}
                    alt={lang.name}
                    className="w-[24px] h-[24px] mr-4"
                  />
                  <span className="text-[16px] leading-[19px] font-semibold text-[#EBC17B]">
                    {lang.localName}
                  </span>
                </div>
                
                {selectedLanguage === lang.code && (
                  <Icon icon="lucide:check" className="text-[#EBC17B]" width={20} />
                )}
              </motion.div>
            ))}
          </div>
          
          {/* Continue button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-auto"
          >
            <Button
              className="gold-gradient rounded-full text-white text-[18px] leading-[25px] w-full py-3 h-15 font-semibold flex items-center justify-center mt-10"
              onPress={handleContinue}
            >
              {selectedLanguage === "en" ? "Continue with English" : "日本語で続ける"}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};