import React from "react";
import { Icon } from "@iconify/react";

interface UsernamePageProps {
  onBack: () => void;
}

export const UsernamePage: React.FC<UsernamePageProps> = ({ onBack }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [username, setUsername] = React.useState("@username");

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
        
        <div className="relative z-10 p-4">
          {/* Header with back button */}
          <div className="flex items-center justify-between mb-4">
            <div 
              className="w-9 h-9 rounded-full border-[0.5px] border-[#EBC17B] flex items-center justify-center mr-4 cursor-pointer"
              onClick={onBack}
            >
              <img
  src="https://ik.imagekit.io/mjoh996/images/images/unity-gold/back.svg"
  alt="Back"
  className="w-[20px] h-[20px]"
/>
            </div>
            <h1 className="text-center font-inter text-[20px] font-semibold tracking-[-0.2px] text-[#EBC17B]">Username</h1>
             <div className="w-10 h-10"></div>
          </div>
          
          {/* Username Field */}
          <div className="flex items-center justify-between py-3 px-5 bg-black/40 backdrop-blur-sm rounded-full border border-[#EBC17B]/30">
            {isEditing ? (
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-transparent text-[#EBC17B] text-lg outline-none flex-1"
                autoFocus
              />
            ) : (
              <span className="text-[#EBC17B] text-lg">{username}</span>
            )}
            <button 
              className="text-[#EBC17B] font-medium"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};