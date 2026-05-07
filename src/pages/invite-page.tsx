import React from "react";
import { AnimationWrapper } from "../components/animation-wrapper";
import { AnimatedNumber } from "../components/animated-number";
import { InviteModal } from "../components/invite-modal";
import { motion } from "framer-motion";

interface InvitePageProps {
  onBack: () => void;
  onNavigate?: (page: string) => void;
}

interface InviteRow {
  date: string;
  name: string;
}

interface RewardRow {
  name: string;
  tier: string;
  staking: string;
  days: string;
  children?: RewardRow[];
}

const TOTAL_PAGES = 9;
const INITIAL_CLAIMABLE_REWARD = 25.5;
const REFERRAL_OZ_PER_USD = 1 / 2400;

const TriangleDown: React.FC = () => (
  <svg width="11" height="8" viewBox="0 0 11 8" xmlns="http://www.w3.org/2000/svg">
    <polygon points="0,0 11,0 5.5,8" fill="#EBC17B" />
  </svg>
);

const TriangleRight: React.FC = () => (
  <svg width="8" height="11" viewBox="0 0 8 11" xmlns="http://www.w3.org/2000/svg">
    <polygon points="0,0 0,11 8,5.5" fill="#EBC17B" />
  </svg>
);

const COLS = {
  name:    "w-[34%] shrink-0",
  tier:    "w-[20%] shrink-0",
  staking: "w-[30%] shrink-0",
  days:    "w-[16%] shrink-0",
};

interface RewardRowProps {
  row: RewardRow;
  expanded?: boolean;
  onToggle?: () => void;
  delayIndex: number;
}

const RewardRowItem: React.FC<RewardRowProps> = ({ row, expanded, onToggle, delayIndex }) => {
  const hasChildren = !!row.children && row.children.length > 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.04 * delayIndex }}
      className="flex items-center px-0"
    >
      <span className={`text-[#EBC17B] text-[13px] font-bold tracking-[-0.5px] leading-[30px] ${COLS.name}`}>
        {row.name}
      </span>
      <span className={`text-[#EBC17B] text-[13px] font-bold tracking-[-0.5px] leading-[30px] ${COLS.tier} flex items-center gap-1`}>
        {hasChildren && (
          <button
            onClick={onToggle}
            className="flex items-center justify-center w-3 h-6"
            aria-label={expanded ? "Collapse" : "Expand"}
          >
            {expanded ? <TriangleRight /> : <TriangleDown />}
          </button>
        )}
        <span>{row.tier}</span>
      </span>
      <span className={`text-white text-[13px] font-bold tracking-[-0.5px] leading-[30px] ${COLS.staking} text-center`}>
        {row.staking}
      </span>
      <span className={`text-[#EBC17B] text-[13px] font-bold tracking-[-0.5px] leading-[30px] ${COLS.days} text-right`}>
        {row.days}
      </span>
    </motion.div>
  );
};

export const InvitePage: React.FC<InvitePageProps> = ({ onBack, onNavigate }) => {
  const [activeTab, setActiveTab] = React.useState<"invite" | "reward">("invite");
  const [page, setPage] = React.useState(2);
  const [showInviteModal, setShowInviteModal] = React.useState(false);
  const [expanded, setExpanded] = React.useState<Set<string>>(new Set());
  const [claimableReward] = React.useState<number>(INITIAL_CLAIMABLE_REWARD);

  const inviteRows: InviteRow[] = [
    { date: "2026-05-07 09:15", name: "UserName" },
    { date: "2026-05-06 18:42", name: "UserName" },
    { date: "2026-05-05 22:08", name: "UserName" },
    { date: "2026-05-05 11:30", name: "UserName" },
    { date: "2026-05-04 14:55", name: "UserName" },
    { date: "2026-05-03 08:20", name: "UserName" },
    { date: "2026-05-02 17:00", name: "UserName" },
    { date: "2026-05-01 10:11", name: "UserName" },
    { date: "2026-04-30 19:47", name: "UserName" },
    { date: "2026-04-29 13:05", name: "UserName" },
  ];

  const rewardRows: RewardRow[] = [
    {
      name: "UserName", tier: "1", staking: "100", days: "60",
      children: [
        {
          name: "Sub User A1", tier: "2", staking: "50", days: "30",
          children: [
            { name: "Sub User A1.1", tier: "3", staking: "20", days: "12" },
            { name: "Sub User A1.2", tier: "3", staking: "10", days: "6" },
          ],
        },
        { name: "Sub User A2", tier: "2", staking: "25", days: "15" },
      ],
    },
    { name: "UserName", tier: "1", staking: "100", days: "30" },
    {
      name: "UserName", tier: "1", staking: "100", days: "90",
      children: [
        { name: "Sub User C1", tier: "2", staking: "40", days: "20" },
        { name: "Sub User C2", tier: "2", staking: "30", days: "10" },
      ],
    },
    { name: "UserName", tier: "1", staking: "100", days: "" },
    {
      name: "UserName", tier: "1", staking: "100", days: "",
      children: [
        { name: "Sub User E1", tier: "2", staking: "60", days: "25" },
      ],
    },
    { name: "UserName", tier: "1", staking: "",    days: "" },
    { name: "UserName", tier: "1", staking: "",    days: "" },
    { name: "UserName", tier: "1", staking: "",    days: "" },
    { name: "UserName", tier: "1", staking: "",    days: "" },
    { name: "UserName", tier: "1", staking: "",    days: "" },
  ];

  const toggleRow = (path: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });

  const renderRowTree = (row: RewardRow, path: string, delayIndex: number): React.ReactNode => {
    const isOpen = expanded.has(path);
    return (
      <React.Fragment key={path}>
        <RewardRowItem
          row={row}
          expanded={isOpen}
          onToggle={() => toggleRow(path)}
          delayIndex={delayIndex}
        />
        {isOpen &&
          row.children?.map((child, ci) =>
            renderRowTree(child, `${path}-${ci}`, ci)
          )}
      </React.Fragment>
    );
  };

  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(TOTAL_PAGES, p + 1));

  const claimableOz = claimableReward * REFERRAL_OZ_PER_USD;

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <div
        className="relative mx-auto max-w-md min-h-screen overflow-hidden"
        style={{
          backgroundImage:
            "url('https://ik.imagekit.io/mjoh996/images/images/unity-gold/envato-labs-image-edit 1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 px-4 py-6 flex flex-col h-[100dvh]">
          {/* Header with back button */}
          <AnimationWrapper type="header">
            <div className="flex items-center justify-center mb-[30px] relative">
              <div
                className="w-9 h-9 rounded-full bg-black/50 border-[0.5px] border-[#EBC17B] flex items-center justify-center cursor-pointer absolute left-0"
                onClick={onBack}
              >
                <img
                  src="https://ik.imagekit.io/mjoh996/images/images/unity-gold/back-left.svg"
                  alt="Back"
                  className="w-[20px] h-[20px]"
                />
              </div>
              <h1 className="text-center font-inter text-[20px] font-semibold leading-[24px] tracking-[-0.2px] text-[#EBC17B]">
                Invite
              </h1>
            </div>
          </AnimationWrapper>

          {/* Tabs — extend to viewport edges */}
          <AnimationWrapper delay={0.1} className="-mx-4 mb-[18px]">
            <div className="flex">
              <div
                className={`w-1/2 text-center pb-0.5 cursor-pointer border-b-2 ${
                  activeTab === "invite" ? "border-[#EBC17B]" : "border-transparent"
                }`}
                onClick={() => setActiveTab("invite")}
              >
                <span
                  className={`text-[14px] font-extrabold leading-[17px] ${
                    activeTab === "invite" ? "text-[#EBC17B]" : "text-[#ffffff]"
                  }`}
                >
                  Invite
                </span>
              </div>
              <div
                className={`w-1/2 text-center pb-0.5 cursor-pointer border-b-2 ${
                  activeTab === "reward" ? "border-[#EBC17B]" : "border-transparent"
                }`}
                onClick={() => setActiveTab("reward")}
              >
                <span
                  className={`text-[14px] font-extrabold leading-[17px] ${
                    activeTab === "reward" ? "text-[#EBC17B]" : "text-[#ffffff]"
                  }`}
                >
                  Reward
                </span>
              </div>
            </div>
          </AnimationWrapper>

          {/* Claimable Referral Reward card — reward tab only */}
          {activeTab === "reward" && (
            <AnimationWrapper delay={0.15} className="mb-[14px]">
              <div className="bg-black/50 rounded-[16px] px-6 pt-2.5 pb-4">
                <span className="text-xs mb-[0px] mt-[4px] block ugold-text text-left">
                  Claimable Referral Reward
                </span>
                <h2 className="gold-gradient-text text-right mb-[6px] font-inter text-[40px] font-semibold leading-[47px] tracking-[-1.25px]">
                  <AnimatedNumber value={claimableOz} decimals={6} />
                  <span className="text-[25px] leading-[40px]"> Oz</span>
                </h2>
                <div className="border-t-[0.5px] border-[#FFD185] pt-[7px]"></div>
                <div className="flex justify-end items-center">
                  <p className="text-[13px] font-semibold text-[#c9c9c9] leading-[16px]">
                    ≈ $<AnimatedNumber value={claimableReward} decimals={2} />
                  </p>
                </div>
              </div>
            </AnimationWrapper>
          )}

          {/* Table container */}
          <AnimationWrapper delay={0.2} className="flex-1 min-h-0 mb-3">
            <div className="bg-black/50 rounded-[16px] overflow-hidden h-full">
              {activeTab === "invite" ? (
                <div className="h-full overflow-y-auto hide-scrollbar px-3 pt-2 pb-3">
                  <div className="flex justify-between items-center mb-[4px] px-4">
                    <span className="text-sm leading-[17px] text-[#EBC17B] font-bold w-[60%]">Date</span>
                    <span className="text-sm leading-[17px] text-[#EBC17B] font-bold w-[40%] text-right">Name</span>
                  </div>
                  <div className="bg-black/60 backdrop-blur-[20px] rounded-[16px] px-4 pt-2 pb-3">
                    {inviteRows.map((row, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.05 * index }}
                        className="flex justify-between items-center px-0 gap-2"
                      >
                        <span className="text-[#EBC17B] text-[14px] font-bold leading-[30px] w-[60%] whitespace-nowrap">
                          {row.date}
                        </span>
                        <span className="text-[#EBC17B] text-[14px] font-bold leading-[30px] w-[40%] text-right">
                          {row.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="h-full overflow-y-auto hide-scrollbar px-3 pt-2 pb-3">
                  <div>
                    {/* Header row */}
                    <div className="flex items-center mb-[4px] px-4">
                      <span className={`text-sm text-[#EBC17B] leading-[17px] font-bold ${COLS.name}`}>Name</span>
                      <span className={`text-sm text-[#EBC17B] leading-[17px] font-bold ${COLS.tier}`}>Tier</span>
                      <span className={`text-sm text-[#EBC17B] leading-[17px] font-bold whitespace ${COLS.staking} text-center`}>Staking (UGOLD)</span>
                      <span className={`text-sm text-[#EBC17B] leading-[17px] font-bold ${COLS.days} text-right`}>Days</span>
                    </div>
                    <div className="bg-black/60 backdrop-blur-[20px] rounded-[16px] px-4 pt-2 pb-3">
                      {rewardRows.map((row, index) =>
                        renderRowTree(row, String(index), index)
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </AnimationWrapper>

          {/* Pagination — width matches table */}
          <AnimationWrapper delay={0.3}>
            <div className="flex items-center justify-between w-full mb-3 select-none">
              <button
                className={`p-1 ${page === 1 ? "text-[#7a7a7a]" : "text-white"}`}
                onClick={goPrev}
                disabled={page === 1}
                aria-label="Previous page"
              >
                <svg width="14" height="16" viewBox="0 0 12 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="12,0 12,14 0,7" />
                </svg>
              </button>
              {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`flex items-center justify-center text-[20px] font-extrabold ${
                    page === n ? "text-[#EBC17B]" : "text-white"
                  }`}
                >
                  {n}
                </button>
              ))}
              <button
                className={`p-1 ${page === TOTAL_PAGES ? "text-[#7a7a7a]" : "text-white"}`}
                onClick={goNext}
                disabled={page === TOTAL_PAGES}
                aria-label="Next page"
              >
                <svg width="14" height="16" viewBox="0 0 12 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="0,0 0,14 12,7" />
                </svg>
              </button>
            </div>
          </AnimationWrapper>

          {/* Bottom action — Refer a Friend (invite tab) / Claim Referral Reward (reward tab) */}
          <AnimationWrapper type="button" delay={0.4}>
            {activeTab === "invite" ? (
              <button
                onClick={() => setShowInviteModal(true)}
                className="gold-gradient w-full rounded-full h-[64px] text-[18px] font-semibold text-white mb-[82px]"
              >
                Refer a Friend
              </button>
            ) : (
              <button
                onClick={() => onNavigate?.("claim-referral")}
                className="gold-gradient w-full rounded-full h-[64px] text-[18px] font-semibold text-white mb-[82px]"
              >
                Claim Referral Reward
              </button>
            )}
          </AnimationWrapper>
        </div>

        {showInviteModal && (
          <InviteModal onClose={() => setShowInviteModal(false)} />
        )}
      </div>
    </div>
  );
};

export default InvitePage;
