import React from "react";
import { Icon } from "@iconify/react";
import { AnimationWrapper } from "../components/animation-wrapper";

interface ProfilePageProps {
  onBack: () => void;
  onNavigate?: (page: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onBack, onNavigate }) => {
  // State for editing username and email
  const [isEditingUsername, setIsEditingUsername] = React.useState(false);
  const [isEditingEmail, setIsEditingEmail] = React.useState(false);
  const [username, setUsername] = React.useState("@username");
  const [email, setEmail] = React.useState("iii@nboindf.com");
  const [uid] = React.useState("oihoruhaoshufg");  // Static UID

  // Handle saving username
  const handleSaveUsername = () => {
    setIsEditingUsername(false);
    // Here you would typically save the username to your backend
    console.log("Saving username:", username);
  };

  // Handle saving email
  const handleSaveEmail = () => {
    setIsEditingEmail(false);
    // Here you would typically save the email to your backend
    console.log("Saving email:", email);
  };

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <div 
        className="relative mx-auto max-w-md min-h-screen overflow-hidden pb-20"
        style={{
          backgroundImage: "url('https://ik.imagekit.io/mjoh996/images/images/unity-gold/envato-labs-image-edit 1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className="relative z-10 px-4 py-6">
          {/* Header with back button - Now with animation */}
          <AnimationWrapper type="header">
            <div className="flex items-center justify-center relative mb-[22px]">
              <div 
                className="w-9 h-9 rounded-full border border-[#EBC17B]/50 flex items-center justify-center cursor-pointer absolute left-0"
                onClick={onBack}
              >
                <img
                  src="https://ik.imagekit.io/mjoh996/images/images/unity-gold/back-left.svg"
                  alt="back-ic"
                  className="w-[20px] h-[20px]"
                />
              </div>
              <h1 className="text-center font-inter text-[20px] font-semibold leading-[24px] tracking-[-0.2px] text-[#EBC17B]">Profile</h1>
            </div>
          </AnimationWrapper>
          
          {/* Profile Image with animation */}
          <AnimationWrapper delay={0.1}>
            <div className="flex flex-col items-center mb-6">
              <div className="w-[98px] h-[98px] rounded-full overflow-hidden">
                <img 
                  src="https://img.heroui.chat/image/avatar?w=200&h=200&u=1" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </AnimationWrapper>
          
          {/* Username Field with animation */}
          <AnimationWrapper delay={0.2}>
            <div className="mb-6">
              <p className="text-[#EBC17B] text-xs leading-[15px] mb-2.5">Username</p>
              <div className="flex items-center justify-between h-[54px] py-4 px-6 bg-black/50 rounded-full border-[0.5px] border-[#EBC17B]">
                {isEditingUsername ? (
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-transparent text-[#EBC17B] text-sm font-semibold outline-none flex-1"
                    autoFocus
                  />
                ) : (
                  <span className="text-[#EBC17B] text-sm font-semibold">{username}</span>
                )}
                <button 
                  className="text-sm text-[#c9c9c9] font-normal"
                  onClick={isEditingUsername ? handleSaveUsername : () => setIsEditingUsername(true)}
                >
                  {isEditingUsername ? "Save" : "Edit"}
                </button>
              </div>
            </div>
          </AnimationWrapper>
          
          {/* Email Field with animation */}
          <AnimationWrapper delay={0.3}>
            <div className="mb-6">
              <p className="text-[#EBC17B] text-xs leading-[15px] mb-2.5">E-mail</p>
              <div className="flex items-center justify-between h-[54px] py-4 px-6 bg-black/50 rounded-full border-[0.5px] border-[#EBC17B]">
                {isEditingEmail ? (
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-transparent text-[#EBC17B] text-sm outline-none flex-1"
                    autoFocus
                  />
                ) : (
                  <span className="text-[#EBC17B] text-sm font-semibold">{email}</span>
                )}
                {/* <button 
                  className="text-sm text-[#c9c9c9] font-normal"
                  onClick={isEditingEmail ? handleSaveEmail : () => setIsEditingEmail(true)}
                >
                  {isEditingEmail ? "Save" : "Edit"}
                </button> */}
              </div>
            </div>
          </AnimationWrapper>

          {/* UID Field with the same style as username and email */}
          <AnimationWrapper delay={0.4}>
            <div className="mb-6">
              <p className="text-[#EBC17B] text-xs leading-[15px] mb-2.5">UID</p>
              <div className="flex items-center h-[54px] bg-black/50 rounded-full border-[0.5px] border-[#EBC17B] overflow-hidden">
                <span className="text-[#EBC17B] text-sm font-semibold truncate flex-1 pl-6">
                   UG1WF0ZM5A
                </span>
                <button
                  className="bg-[#D09635] cursor-pointer text-sm h-full text-white font-semibold px-5 flex items-center gap-1.5 rounded-r-full shrink-0"
                  // onClick={handleCopy}
                >
                  <img
                    src="https://ik.imagekit.io/mjoh996/images/images/unity-gold/copy-ug.svg"
                    alt="Copy-ic"
                    className="w-[18px] h-[18px]"
                  />
                  Copy
                </button>
              </div>
            </div>
          </AnimationWrapper>

        </div>
      </div>
    </div>
  );
};