export type CalculatorId = "hsa" | "fsa" | "commuter" | "life";

export const CALCULATOR_THEME: Record<CalculatorId, { bgClass: string }> = {
  hsa: { bgClass: "bg-[#2B3785]" },
  fsa: { bgClass: "bg-[#6C4CF2]" },
  commuter: { bgClass: "bg-[#26317D]" },
  life: { bgClass: "bg-[#F3716C]" },
};
