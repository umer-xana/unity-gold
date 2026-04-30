import React from "react";
import { AnimationWrapper } from "../components/animation-wrapper";
import { InviteModal } from "../components/invite-modal";
import { motion } from "framer-motion";

interface InvitePageProps {
  onBack: () => void;
}

interface InviteRow {
  date: string;
  name: string;
  rank: string;
}

interface RewardRow {
  name: string;
  staking: string;
  days: string;
  rank: string;
  percent: string;
  today: string;
  children?: RewardRow[];
}

const TOTAL_PAGES = 9;

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
  name:     "min-w-[100px] w-[100px] shrink-0",
  relation: "min-w-[80px] w-[80px] shrink-0",
  staking:  "min-w-[100px] w-[100px] shrink-0",
  days:     "min-w-[80px] w-[80px] shrink-0",
  rank:     "min-w-[70px] w-[70px] shrink-0",
  percent:  "min-w-[100px] w-[100px] shrink-0",
  today:    "min-w-[110px] w-[110px] shrink-0",
};

const ROW_TOTAL_WIDTH = 100 + 80 + 100 + 80 + 70 + 100 + 110; // 640px

interface RewardRowProps {
  row: RewardRow;
  isChild?: boolean;
  expanded?: boolean;
  onToggle?: () => void;
  delayIndex: number;
}

const RewardRowItem: React.FC<RewardRowProps> = ({ row, isChild, expanded, onToggle, delayIndex }) => {
  const hasChildren = !isChild && row.children && row.children.length > 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.04 * delayIndex }}
      className="flex items-center px-1"
    >
      <span className={`text-[#EBC17B] text-[13px] font-bold tracking-[-0.5px] leading-[30px] ${COLS.name}`}>
        {row.name}
      </span>
      <span className={`text-[#EBC17B] text-[13px] font-bold tracking-[-0.5px] leading-[30px] ${COLS.relation} flex justify-start`}>
        {hasChildren ? (
          <button
            onClick={onToggle}
            className="flex items-center justify-center w-3 h-6"
            aria-label={expanded ? "Collapse" : "Expand"}
          >
            {expanded ? <TriangleRight /> : <TriangleDown />}
          </button>
        ) : isChild ? (
          <span className="flex items-center justify-center w-3 h-6">
            <TriangleRight />
          </span>
        ) : (
          <span />
        )}
      </span>
      <span className={`text-white text-[13px] font-bold tracking-[-0.5px] leading-[30px] ${COLS.staking} text-center`}>
        {row.staking}
      </span>
      <span className={`text-[#EBC17B] text-[13px] font-bold tracking-[-0.5px] leading-[30px] ${COLS.days} text-center`}>
        {row.days}
      </span>
      <span className={`text-[#EBC17B] text-[13px] font-bold tracking-[-0.5px] leading-[30px] ${COLS.rank} text-center`}>
        {row.rank}
      </span>
      <span className={`text-[#EBC17B] text-[13px] font-bold tracking-[-0.5px] leading-[30px] ${COLS.percent} text-right`}>
        {row.percent}
      </span>
      <span className={`text-white text-[13px] font-bold tracking-[-0.5px] leading-[30px] ${COLS.today} text-right`}>
        {row.today}
      </span>
    </motion.div>
  );
};

export const InvitePage: React.FC<InvitePageProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = React.useState<"invite" | "reward">("invite");
  const [page, setPage] = React.useState(2);
  const [showInviteModal, setShowInviteModal] = React.useState(false);
  const [expanded, setExpanded] = React.useState<Set<number>>(new Set());

  const inviteRows: InviteRow[] = [
    { date: "12.21 00:00", name: "UserName", rank: "V1" },
    { date: "12.21 00:00", name: "UserName", rank: "V3" },
    { date: "12.21 00:00", name: "UserName", rank: "V1" },
    { date: "12.21 00:00", name: "UserName", rank: "V3" },
    { date: "12.21 00:00", name: "UserName", rank: "V1" },
    { date: "12.21 00:00", name: "UserName", rank: "V3" },
    { date: "12.21 00:00", name: "UserName", rank: "V1" },
    { date: "12.21 00:00", name: "UserName", rank: "V3" },
    { date: "12.21 00:00", name: "UserName", rank: "V1" },
    { date: "12.21 00:00", name: "UserName", rank: "V3" },
  ];

  const rewardRows: RewardRow[] = [
    {
      name: "UserName", staking: "$100", days: "60", rank: "V1", percent: "0.01%", today: "$100",
      children: [
        { name: "Sub User A1", staking: "$50", days: "30", rank: "V2", percent: "0.005%", today: "$50" },
        { name: "Sub User A2", staking: "$25", days: "15", rank: "V1", percent: "0.003%", today: "$25" },
      ],
    },
    {
      name: "UserName", staking: "$100", days: "30", rank: "V3", percent: "0.01%", today: "$100",
      children: [
        { name: "Sub User B1", staking: "$60", days: "20", rank: "V1", percent: "0.004%", today: "$30" },
      ],
    },
    {
      name: "UserName", staking: "$100", days: "90", rank: "V1", percent: "0.01%", today: "$100",
      children: [
        { name: "Sub User C1", staking: "$40", days: "10", rank: "V2", percent: "0.002%", today: "$20" },
        { name: "Sub User C2", staking: "$35", days: "8",  rank: "V1", percent: "0.001%", today: "$10" },
        { name: "Sub User C3", staking: "$20", days: "5",  rank: "V1", percent: "0.001%", today: "$5"  },
      ],
    },
    { name: "UserName", staking: "$100", days: "",  rank: "V3", percent: "0.01%", today: "$100" },
    { name: "UserName", staking: "$100", days: "",  rank: "V1", percent: "0.01%", today: "$100" },
    { name: "UserName", staking: "",     days: "",  rank: "V3", percent: "0.01%", today: "" },
    { name: "UserName", staking: "",     days: "",  rank: "V1", percent: "0.01%", today: "" },
    { name: "UserName", staking: "",     days: "",  rank: "V3", percent: "0.01%", today: "" },
    { name: "UserName", staking: "",     days: "",  rank: "V1", percent: "0.01%", today: "" },
    { name: "UserName", staking: "",     days: "",  rank: "V3", percent: "0.01%", today: "" },
  ];

  const toggleRow = (i: number) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(TOTAL_PAGES, p + 1));

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

          {/* Table container */}
          <AnimationWrapper delay={0.2} className="flex-1 min-h-0 mb-3">
            <div className="bg-black/50 rounded-[16px] overflow-hidden h-full">
              {activeTab === "invite" ? (
                <div className="h-full overflow-y-auto hide-scrollbar px-3 pt-2 pb-3">
                  <div className="flex justify-between items-center mb-[4px] px-4">
                    <span className="text-sm leading-[17px] text-[#EBC17B] font-bold w-[40%]">Date</span>
                    <span className="text-sm leading-[17px] text-[#EBC17B] font-bold w-[40%]">Name</span>
                    <span className="text-sm leading-[17px] text-[#EBC17B] font-bold w-[20%] text-right">Rank</span>
                  </div>
                  <div className="bg-black/60 backdrop-blur-[20px] rounded-[16px] px-4 pt-2 pb-3">
                    {inviteRows.map((row, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.05 * index }}
                        className="flex justify-between items-center px-1 gap-2"
                      >
                        <span className="text-[#EBC17B] text-[14px] font-bold leading-[30px] w-[40%] whitespace-nowrap">
                          {row.date}
                        </span>
                        <span className="text-[#EBC17B] text-[14px] font-bold leading-[30px] w-[40%]">
                          {row.name}
                        </span>
                        <span className="text-[#EBC17B] text-[14px] font-semibold leading-[30px] w-[20%] text-right">
                          {row.rank}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="h-full overflow-x-auto overflow-y-auto hide-scrollbar px-3 pt-2 pb-3">
                  <div style={{ minWidth: ROW_TOTAL_WIDTH }}>
                    {/* Header row */}
                    <div className="flex items-center mb-[4px] px-4">
                      <span className={`text-sm text-[#EBC17B] leading-[17px] font-bold ${COLS.name}`}>Name</span>
                      <span className={`text-sm text-[#EBC17B] leading-[17px] font-bold ${COLS.relation} text-start`}>Relation</span>
                      <span className={`text-sm text-[#EBC17B] leading-[17px] font-bold ${COLS.staking} text-center`}>Staking</span>
                      <span className={`text-sm text-[#EBC17B] leading-[17px] font-bold ${COLS.days} text-center`}>Days</span>
                      <span className={`text-sm text-[#EBC17B] leading-[17px] font-bold ${COLS.rank} text-center`}>Rank</span>
                      <span className={`text-sm text-[#EBC17B] leading-[17px] font-bold ${COLS.percent} text-right`}>You get (%)</span>
                      <span className={`text-sm text-[#EBC17B] leading-[17px] font-bold ${COLS.today} text-right`}>You get (Today)</span>
                    </div>
                    <div className="bg-black/60 backdrop-blur-[20px] rounded-[16px] px-4 pt-2 pb-3">
                      {rewardRows.map((row, index) => {
                        const isOpen = expanded.has(index);
                        return (
                          <React.Fragment key={index}>
                            <RewardRowItem
                              row={row}
                              expanded={isOpen}
                              onToggle={() => toggleRow(index)}
                              delayIndex={index}
                            />
                            {isOpen &&
                              row.children?.map((child, ci) => (
                                <RewardRowItem
                                  key={`${index}-${ci}`}
                                  row={child}
                                  isChild
                                  delayIndex={ci}
                                />
                              ))}
                          </React.Fragment>
                        );
                      })}
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

          {/* Refer a Friend Button — 24px above bottom */}
          <AnimationWrapper type="button" delay={0.4}>
            <button
              onClick={() => setShowInviteModal(true)}
              className="gold-gradient w-full rounded-full h-[64px] text-[18px] font-semibold text-white mb-[82px]"
            >
              Refer a Friend
            </button>
          </AnimationWrapper>
        </div>

        {showInviteModal && (
          <InviteModal onClose={() => setShowInviteModal(false)} />
        )}
      </div>
    </div>
  );
};
