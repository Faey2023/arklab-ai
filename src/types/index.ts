export interface Agent {
  id: string;
  name: string;
  description: string;
  status: "Active" | "Beta" | "Archived";
  category: string;
  pricingModel: "Free Tier" | "Subscription" | "Per-Use";
  icon: string;
}

export interface FilterState {
  searchQuery: string;
  selectedStatuses: string[];
  selectedCategories: string[];
  selectedPricingModel: string;
}
