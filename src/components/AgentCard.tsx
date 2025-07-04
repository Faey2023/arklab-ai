"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Agent } from "@/types";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface AgentCardProps {
  agent: Agent;
  index: number;
}

const AgentIcon = ({ iconName }: { iconName: string }) => {
  const Icon = Icons[iconName as keyof typeof Icons] as LucideIcon;

  if (!Icon) {
    return <Icons.Circle className="size-6 text-gray-400" />;
  }
  return <Icon className="size-6 text-white" />;
};

const AgentCard = ({ agent, index }: AgentCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "Beta":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "Archived":
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const getPricingColor = (pricing: string) => {
    switch (pricing) {
      case "Free Tier":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "Subscription":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      case "Per-Use":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Card className="h-full hover:shadow-lg transition-shadow duration-200 cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex items-start gap-3">
            <Avatar className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold flex items-center justify-center">
              <AgentIcon iconName={agent.icon} />
            </Avatar>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg leading-tight mb-1 truncate">
                {agent.name}
              </h3>
              <div className="flex flex-wrap gap-1">
                <Badge
                  className={getStatusColor(agent.status)}
                  variant="secondary"
                >
                  {agent.status}
                </Badge>
                <Badge
                  className={getPricingColor(agent.pricingModel)}
                  variant="secondary"
                >
                  {agent.pricingModel}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
            {agent.description}
          </p>
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-xs">
              {agent.category}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AgentCard;
