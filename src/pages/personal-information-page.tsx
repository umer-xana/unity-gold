import React from "react";
import { Icon } from "@iconify/react";

interface PersonalInformationPageProps {
  onBack: () => void;
}

export const PersonalInformationPage: React.FC<PersonalInformationPageProps> = ({ onBack }) => {
  const [namePhotoSharing, setNamePhotoSharing] = React.useState(true);
  
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
              className="w-9 h-9 bg-black/50 rounded-full border-[0.5px] border-[#EBC17B] flex items-center justify-center mr-4 cursor-pointer"
              onClick={onBack}
            >
              <img
  src="https://ik.imagekit.io/mjoh996/images/images/unity-gold/back-eft.svg"
  alt="Back"
  className="w-[20px] h-[20px]"
/>
            </div>
            <h1 className="text-center font-inter text-[20px] font-semibold tracking-[-0.2px] text-[#EBC17B]">Personal Information</h1>
            <div className="w-10 h-10"></div>
          </div>
          
          {/* Profile Image and Change Button */}
          <div className="flex flex-col items-center mb-7.5">
            <div className="w-[180px] h-[180px] rounded-full overflow-hidden mb-4">
              <img 
                src="https://img.heroui.chat/image/avatar?w=300&h=300&u=2" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <button className="bg-[#EBC17B]/24 hover:bg-[#EBC17B]/40 text-[#EBC17B] text-xs leading-[19px] font-semibold py-1.5 px-8 rounded-full transition-all duration-200">
              Change
            </button>
          </div>
          
          {/* Information Fields */}
          <div className="space-y-4">
            {/* Name */}
            <div className="flex items-center justify-between py-[17px] px-4 bg-black/50 rounded-[22px] border-[0.5px] border-[#EBC17B]">
              <span className="text-sm font-semibold text-[#EBC17B]">Name</span>
              <span className="text-sm text-[#c9c9c9]">John Doe</span>
            </div>
            
            {/* Date of birth */}
            <div className="flex items-center justify-between py-[17px] px-4 bg-black/50 rounded-[22px] border-[0.5px] border-[#EBC17B]">
              <span className="text-sm text-[#EBC17B] font-semibold">Date of birth</span>
              <span className="text-sm text-[#c9c9c9]">15 August 1998</span>
            </div>
            
            {/* Name and Photo Sharing */}
            <div className="flex items-center justify-between py-[17px] px-4 bg-black/50 rounded-[22px] border-[0.5px] border-[#EBC17B]">
              <span className="text-sm font-semibold text-[#EBC17B]">Name and Photo Sharing</span>
              <div 
                className={`w-14 h-7 rounded-full p-1 transition-all duration-200 ${namePhotoSharing ? 'bg-[#EBC17B]/60' : 'bg-white/60'}`}
                onClick={() => setNamePhotoSharing(!namePhotoSharing)}
              >
                <div 
                  className={`w-5 h-5 bg-white rounded-full transform transition-transform duration-200 ${namePhotoSharing ? 'translate-x-7' : 'translate-x-0'}`}
                ></div>
              </div>
            </div>
            
            {/* Age Range for Apps */}
            <div className="flex items-center justify-between py-[17px] px-4 bg-black/50 rounded-[22px] border-[0.5px] border-[#EBC17B]">
              <span className="text-sm font-semibold text-[#EBC17B]">Age Range for Apps</span>
              <span className="text-sm text-[#c9c9c9]">Ask First</span>
            </div>
            
            {/* Communication Preferences */}
            <div className="flex items-center justify-between py-[17px] px-4 bg-black/50 rounded-[22px] border-[0.5px] border-[#EBC17B] cursor-pointer">
              <span className="text-sm font-semibold text-[#EBC17B]">Communication Preferences</span>
              <Icon icon="lucide:chevron-right" className="text-[#EBC17B]" width={24} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};