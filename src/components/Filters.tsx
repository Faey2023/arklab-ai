"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  setSelectedStatuses,
  setSelectedCategories,
  setSelectedPricingModel,
  clearAllFilters,
} from "@/lib/features/agents-slice";
import { X } from "lucide-react";

const STATUSES = ["Active", "Beta", "Archived"];
const PRICING_MODELS = ["Free Tier", "Subscription", "Per-Use"];

const Filters = () => {
  const dispatch = useAppDispatch();
  const { agents, filters } = useAppSelector((state) => state.agents);

  // Get unique categories from agents
  const categories = Array.from(new Set(agents.map((agent) => agent.category)));

  const handleStatusChange = (status: string, checked: boolean) => {
    const newStatuses = checked
      ? [...filters.selectedStatuses, status]
      : filters.selectedStatuses.filter((s) => s !== status);
    dispatch(setSelectedStatuses(newStatuses));
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.selectedCategories, category]
      : filters.selectedCategories.filter((c) => c !== category);
    dispatch(setSelectedCategories(newCategories));
  };

  const hasActiveFilters =
    filters.searchQuery ||
    filters.selectedStatuses.length > 0 ||
    filters.selectedCategories.length > 0 ||
    filters.selectedPricingModel;

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filters</CardTitle>
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => dispatch(clearAllFilters())}
              className="h-8"
            >
              <X className="mr-1 h-3 w-3" />
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Status Filter */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Status</Label>
          <div className="space-y-2">
            {STATUSES.map((status) => (
              <div key={status} className="flex items-center space-x-2">
                <Checkbox
                  id={`status-${status}`}
                  checked={filters.selectedStatuses.includes(status)}
                  onCheckedChange={(checked) =>
                    handleStatusChange(status, checked as boolean)
                  }
                />
                <Label
                  htmlFor={`status-${status}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {status}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Category</Label>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={filters.selectedCategories.includes(category)}
                  onCheckedChange={(checked) =>
                    handleCategoryChange(category, checked as boolean)
                  }
                />
                <Label
                  htmlFor={`category-${category}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Model Filter */}
        <div>
          <Label className="text-sm font-medium mb-3 block">
            Pricing Model
          </Label>
          <RadioGroup
            value={filters.selectedPricingModel}
            onValueChange={(value) => dispatch(setSelectedPricingModel(value))}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="" id="pricing-all" />
              <Label
                htmlFor="pricing-all"
                className="text-sm font-normal cursor-pointer"
              >
                All Models
              </Label>
            </div>
            {PRICING_MODELS.map((model) => (
              <div key={model} className="flex items-center space-x-2">
                <RadioGroupItem value={model} id={`pricing-${model}`} />
                <Label
                  htmlFor={`pricing-${model}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {model}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div>
            <Label className="text-sm font-medium mb-2 block">
              Active Filters
            </Label>
            <div className="flex flex-wrap gap-1">
              {filters.selectedStatuses.map((status) => (
                <Badge key={status} variant="secondary" className="text-xs">
                  Status: {status}
                </Badge>
              ))}
              {filters.selectedCategories.map((category) => (
                <Badge key={category} variant="secondary" className="text-xs">
                  {category}
                </Badge>
              ))}
              {filters.selectedPricingModel && (
                <Badge variant="secondary" className="text-xs">
                  {filters.selectedPricingModel}
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Filters;
