import React from "react";
import { Icon } from "@iconify/react";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Input,
} from "@heroui/react";
import { BottomNavigation } from "../components/bottom-navigation";
import { CurrencyToggle } from "../components/currency-toggle";
import { AnimationWrapper } from "../components/animation-wrapper";
import { useCurrency } from "../context/currency-context";
import { ConfirmTransferModal } from "../components/confirm-transfer-modal";
import { TransferSuccessModal } from "../components/transfer-success-modal";
import { TransferFailedModal } from "../components/transfer-failed-modal";

interface SendPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

interface TokenOption {
  id: string;
  name: string;
  iconUrl: string;
}

export const SendPage: React.FC<SendPageProps> = ({ onBack, onNavigate }) => {
  const { currency } = useCurrency();

  const [selectedToken, setSelectedToken] = React.useState<TokenOption>({
    id: "ugold",
    name: "UGOLD",
    iconUrl:
      "https://ik.imagekit.io/mjoh996/images/images/unity-gold/ugold-coin.svg",
  });

  const [amount, setAmount] = React.useState("");
  const [recipientAddress, setRecipientAddress] = React.useState("");
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [dropdownWidth, setDropdownWidth] = React.useState(0);
  const [showConfirmModal, setShowConfirmModal] = React.useState(false);
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const [showFailedModal, setShowFailedModal] = React.useState(false);
  const [transactionHash, setTransactionHash] =
    React.useState("0x6dbt754dgkk88722");
  const [amountError, setAmountError] = React.useState<string>("");
  const [addressError, setAddressError] = React.useState<string>("");
  const [isTouched, setIsTouched] = React.useState({
    amount: false,
    address: false,
  });

  const availableBalance = 1000;

  const isValidBaseAddress = (address: string): boolean => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  const validateAmount = (value: string): boolean => {
    if (!isTouched.amount) return true;

    if (!value) return false;

    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue <= 0) return false;
    if (numValue > availableBalance) return false;

    return true;
  };

  const validateAddress = (value: string): boolean => {
    if (!isTouched.address) return true;

    if (!value) return false;
    if (!isValidBaseAddress(value)) return false;

    return true;
  };

  const handleAmountChange = (value: string) => {
    setAmount(value);

    if (isTouched.amount) {
      if (!value) {
        setAmountError("Please enter an amount");
      } else {
        const numValue = parseFloat(value);
        if (isNaN(numValue) || numValue <= 0) {
          setAmountError("Please enter a valid amount");
        } else if (numValue > availableBalance) {
          setAmountError("Amount exceeds available balance");
        } else {
          setAmountError("");
        }
      }
    }
  };

  const handleAddressChange = (value: string) => {
    setRecipientAddress(value);

    if (isTouched.address) {
      if (!value) {
        setAddressError("Please enter a recipient address");
      } else if (!isValidBaseAddress(value)) {
        setAddressError("Invalid address format for Base chain");
      } else {
        setAddressError("");
      }
    }
  };

  const handleAmountBlur = () => {
    setIsTouched((prev) => ({ ...prev, amount: true }));

    if (!amount) {
      setAmountError("Please enter an amount");
    } else {
      const numValue = parseFloat(amount);
      if (isNaN(numValue) || numValue <= 0) {
        setAmountError("Please enter a valid amount");
      } else if (numValue > availableBalance) {
        setAmountError("Amount exceeds available balance");
      } else {
        setAmountError("");
      }
    }
  };

  const handleAddressBlur = () => {
    setIsTouched((prev) => ({ ...prev, address: true }));

    if (!recipientAddress) {
      setAddressError("Please enter a recipient address");
    } else if (!isValidBaseAddress(recipientAddress)) {
      setAddressError("Invalid address format for Base chain");
    } else {
      setAddressError("");
    }
  };

  const isFormValid = (): boolean => {
    return validateAmount(amount) && validateAddress(recipientAddress);
  };

  const triggerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const updateDropdownWidth = () => {
      if (!triggerRef.current) return;
      setDropdownWidth(triggerRef.current.getBoundingClientRect().width);
    };

    updateDropdownWidth();

    let resizeObserver: ResizeObserver | null = null;

    if (triggerRef.current && typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        updateDropdownWidth();
      });
      resizeObserver.observe(triggerRef.current);
    }

    window.addEventListener("resize", updateDropdownWidth);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", updateDropdownWidth);
    };
  }, []);

  const tokens: TokenOption[] = [
    {
      id: "ugold",
      name: "UGOLD",
      iconUrl:
        "https://ik.imagekit.io/mjoh996/images/images/unity-gold/ugold-coin.svg",
    },
    {
      id: "usdt",
      name: "USDT",
      iconUrl:
        "https://ik.imagekit.io/mjoh996/images/images/unity-gold/usdt-coin.svg",
    },
  ];

  const handleSend = () => {
    if (isFormValid()) {
      setShowConfirmModal(true);
    }
  };

  const handleConfirmTransfer = () => {
    const isSuccess = Math.random() > 0.3;

    if (isSuccess) {
      setTransactionHash(`0x${Math.random().toString(16).substring(2, 14)}`);
      setShowSuccessModal(true);
    } else {
      setShowFailedModal(true);
    }
  };

  const handleRetry = () => {
    setShowConfirmModal(true);
  };

  return (
    <div className="dark min-h-[100dvh] bg-background text-foreground">
      <div
        className="relative mx-auto min-h-[100dvh] max-w-md overflow-hidden"
        style={{
          backgroundImage:
            "url('https://ik.imagekit.io/mjoh996/images/images/unity-gold/envato-labs-image-edit 1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 flex h-[100dvh] flex-col overflow-y-auto px-4 pt-[19px] pb-[97px] hide-scrollbar">
          <AnimationWrapper type="header">
            <div className="mb-[41px] flex items-center justify-between">
              <Button
                isIconOnly
                variant="light"
                className="h-9 w-9 min-w-9 rounded-full bg-black/50 p-0 border-[0.5px] border-[#EBC17B]"
                onPress={onBack}
              >
                <img
              src="https://ik.imagekit.io/mjoh996/images/images/unity-gold/back-left.svg"
              alt="back-ic"
              className="w-[20px] h-[20px]"
              />
                
              </Button>

              <h1 className="text-center font-inter text-[20px] font-semibold leading-[24px] tracking-[-0.2px] text-[#EBC17B]">
                Send
              </h1>

              <CurrencyToggle /> 
            </div>
          </AnimationWrapper>

          <AnimationWrapper delay={0.1}>
            <div className="mb-[20px]">
              <div className="flex items-center rounded-[16px] bg-black/50 px-4 py-3">
                <div className="mr-3 flex h-[40px] w-[40px] items-center justify-center">
                  <img
                    src="https://ik.imagekit.io/mjoh996/images/images/unity-gold/base-coin.svg"
                    alt="Base Chain"
                    className="h-[40px] w-[40px] object-contain"
                  />
                </div>
                <span className="text-[15px] font-semibold text-white">
                  Base Chain
                </span>
              </div>
            </div>
          </AnimationWrapper>

          <AnimationWrapper delay={0.2}>
            <div className="mb-6">
              <Dropdown
                isOpen={isDropdownOpen}
                onOpenChange={setIsDropdownOpen}
                placement="bottom"
                triggerScaleOnOpen={false}
                shouldBlockScroll={false}
                classNames={{
                  trigger: "w-full",
                  content: "p-0 bg-transparent shadow-none min-w-0",
                }}
              >
                <DropdownTrigger>
                  <div
                    ref={triggerRef}
                    className="flex w-full cursor-pointer items-center justify-between rounded-full bg-black/50 px-4 py-3"
                  >
                    <div className="flex items-center">
                      <div className="mr-3 flex h-[40px] w-[40px] items-center justify-center">
                        <img
                          src={selectedToken.iconUrl}
                          alt={selectedToken.name}
                          className="h-[40px] w-[40px] object-contain"
                        />
                      </div>
                      <span className="text-[15px] font-semibold text-white">
                        {selectedToken.name}
                      </span>
                    </div>

                    <Icon
                      icon={
                        isDropdownOpen
                          ? "lucide:chevron-up"
                          : "lucide:chevron-down"
                      }
                      className="text-white"
                      width={20}
                    />
                  </div>
                </DropdownTrigger>

                <DropdownMenu
                  aria-label="Token selection"
                  onAction={(key) => {
                    const token = tokens.find((t) => t.id === String(key));
                    if (token) setSelectedToken(token);
                  }}
                  style={dropdownWidth ? { width: dropdownWidth } : undefined}
                  classNames={{
                    base: "bg-black/85 border-[0.5px] border-[#1d1509] backdrop-blur-xs rounded-[24px] px-2 py-3",
                    list: "gap-0",
                  }}
                >
                  {tokens.map((token) => (
                    <DropdownItem
                      key={token.id}
                      className="rounded-[12px] p-2 data-[hover=true]:bg-white/10"
                      startContent={
                        <div className="mr-3 flex h-[40px] w-[40px] items-center justify-center">
                          <img
                            src={token.iconUrl}
                            alt={token.name}
                            className="h-[40px] w-[40px] object-contain"
                          />
                        </div>
                      }
                      endContent={
                        selectedToken.id === token.id ? (
                          <Icon
                            icon="lucide:check"
                            className="text-[#fff]"
                            width={20}
                          />
                        ) : null
                      }
                    >
                      <span className="text-[15px] font-semibold text-white">
                        {token.name}
                      </span>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>
          </AnimationWrapper>

          <AnimationWrapper delay={0.3}>
            <div className="mb-[20px]">
              <div className="mb-2 pl-3 pr-5 flex items-center justify-between">
                <p className="text-[12px] font-semibold leading-[15px] text-[#EBC17B]">Amount</p>
                <p className="text-[12px] font-regular leading-[15px] text-[#EBC17B]">
                  = $42.42
                </p>
              </div>

              <Input
                placeholder="Enter Amount"
                value={amount}
                onValueChange={handleAmountChange}
                onBlur={handleAmountBlur}
                isInvalid={!!amountError}
                errorMessage={amountError}
                classNames={{
                  base: "max-w-full",
                  inputWrapper: "!bg-white rounded-full h-[54px] px-6 text-right",
                  input:
                    "text-black text-[16px] font-medium group-data-[has-value=true]:text-black text-right data-[hover=true]:!bg-white placeholder:text-[#787878]",
                  errorMessage: "text-[#FF3B30] text-xs mt-1 ml-2",
                }}
              />
            </div>
          </AnimationWrapper>

          <AnimationWrapper delay={0.4}>
            <div className="mb-4">
              <p className="mb-2 pl-3 pr-5 text-[12px] font-semibold leading-[15px] text-[#EBC17B]">
                Recipient Address
              </p>

              <Input
                placeholder="Enter wallet address"
                value={recipientAddress}
                onValueChange={handleAddressChange}
                onBlur={handleAddressBlur}
                isInvalid={!!addressError}
                errorMessage={addressError}
                classNames={{
                  base: "max-w-full",
                  inputWrapper: "!bg-white rounded-full h-[54px] px-6  ",
                  input:
                    "text-black text-[16px] font-medium group-data-[has-value=true]:text-black data-[hover=true]:bg-!white data-[hover=true]:bg-white placeholder:text-[#787878]",
                  errorMessage: "text-[#FF3B30] text-xs mt-1 ml-2",
                }}
              />
              <div className="flex items-start  mt-2 px-3">
            <Icon
              icon="lucide:info"
              className="w-4 h-4 text-[#c9c9c9] mr-1 mt-[1px]"
            />
            <p className="text-[12px] text-[#c9c9c9]">
              0.1 USDT will be deducted as the gas fee for this transaction.
            </p>
          </div> 
            </div>
          </AnimationWrapper>

          <div className="mt-auto pb-6">
            <AnimationWrapper delay={0.5}>
              <Button
                className={`gold-gradient h-[64px] w-full rounded-full text-lg font-semibold text-white ${
                  !isFormValid() ? "opacity-50" : ""
                }`}
                onPress={handleSend}
                isDisabled={!isFormValid()}
                startContent={
                  <img
              src="https://ik.imagekit.io/mjoh996/images/images/unity-gold/sendicon.svg"
              alt="cross-ic"
              className="w-[24px] h-[24px]"
              />
                }
              >
                Send
              </Button>
            </AnimationWrapper>
          </div>
        </div>

        {/* <AnimationWrapper type="navbar" delay={0.6}>
          <BottomNavigation activeTab="wallet" onTabChange={onNavigate} />
        </AnimationWrapper> */}
      </div>

      <ConfirmTransferModal
        isOpen={showConfirmModal}
        onOpenChange={setShowConfirmModal}
        amount={amount}
        token={selectedToken.name}
        recipientAddress={recipientAddress}
        onConfirm={handleConfirmTransfer}
      />

      <TransferSuccessModal
        isOpen={showSuccessModal}
        onOpenChange={setShowSuccessModal}
        hash={transactionHash}
      />

      <TransferFailedModal
        isOpen={showFailedModal}
        onOpenChange={setShowFailedModal}
        onRetry={handleRetry}
      />
    </div>
  );
};