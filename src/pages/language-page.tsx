import React from "react";
import { Icon } from "@iconify/react";
import { AnimationWrapper } from "../components/animation-wrapper";
import { motion } from "framer-motion";

interface LanguagePageProps {
  onBack: () => void;
}

interface LanguageOption {
  code: string;
  name: string;
  localName: string;
  flag: string;
  isDefault?: boolean;
}

export const LanguagePage: React.FC<LanguagePageProps> = ({ onBack }) => {
  const [selectedLanguage, setSelectedLanguage] = React.useState("en");

  const languages: LanguageOption[] = [
    {
      code: "en",
      name: "Default",
      localName: "English",
      flag: "https://ik.imagekit.io/mjoh996/images/images/unity-gold/eng-flag.svg",
      isDefault: true,
    },
    {
      code: "ja",
      name: "Japanese",
      localName: "日本語",
      flag: "https://ik.imagekit.io/mjoh996/images/images/unity-gold/jp-flag.svg",
    },
    // Add more languages as needed
  ];

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <div
        className="relative mx-auto max-w-md min-h-screen overflow-hidden pb-20"
        style={{
          backgroundImage:
            "url('https://ik.imagekit.io/mjoh996/images/images/unity-gold/envato-labs-image-edit 1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 p-4">
          {/* Header with back button - Now with animation */}
          <AnimationWrapper type="header">
            <div className="flex items-center justify-between relative mb-3">
              <div
                className="w-9 h-9 rounded-full border-[0.5px] border-[#EBC17B] flex items-center justify-center mr-4 cursor-pointer bg-black/50"
                onClick={onBack}
              >
                <img
                  src="https://ik.imagekit.io/mjoh996/images/images/unity-gold/back-left.svg"
                  alt="Back"
                  className="w-[20px] h-[20px]"
                />
              </div>

              <h1 className="text-center font-inter text-[20px] font-semibold tracking-[-0.2px] text-[#EBC17B]">
                Language
              </h1>
              <div className="w-10 h-10"></div>
            </div>
          </AnimationWrapper>

          {/* Select Language text with animation */}
          <AnimationWrapper delay={0.1}>
            <p className="text-xs font-semibold text-[#EBC17B] mb-3 leading-[15px]">
              Select Language
            </p>
          </AnimationWrapper>

          {/* Language Options with staggered animation */}
          <div className="space-y-[14px]">
            {languages.map((language, index) => (
              <motion.div
                key={language.code}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  delay: 0.2 + index * 0.1, // Staggered delay for each language option
                }}
                className={`flex items-center justify-between py-2 pl-5 pr-6 h-[54px] rounded-[22px] bg-black/50 cursor-pointer ${
                  selectedLanguage === language.code ? "border-[1px] border-[#EBC17B]" : "border-[0px] border-[#EBC17B]"
                }`}
                onClick={() => setSelectedLanguage(language.code)}
              >
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-[22px] overflow-hidden mr-4 flex items-center justify-center">
                    <img
                      src={language.flag}
                      alt={language.name}
                      className="w-[24px] h-[24px]"
                    />
                  </div>

                  <div className="leading-tight">
                    <p className="text-md leading-[19px] font-semibold text-[#EBC17B]">
                      {language.localName}
                    </p>
                    {/* <p className="text-xs leading-[15px] font-medium text-[#C9C9C9] mt-0.5">
                      {language.name}
                    </p> */}
                  </div>
                </div>

                {selectedLanguage === language.code && (
                  <Icon icon="lucide:check" className="text-[#EBC17B]" width={20} />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
