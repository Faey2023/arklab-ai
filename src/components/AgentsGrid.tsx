"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setAgents } from "@/lib/features/agents-slice";
import { Agent } from "@/types";
import AgentCard from "./AgentCard";

interface AgentsGridProps {
  initialAgents: Agent[];
}

const AgentsGrid = ({ initialAgents }: AgentsGridProps) => {
  const dispatch = useAppDispatch();
  const { filteredAgents } = useAppSelector((state) => state.agents);

  useEffect(() => {
    dispatch(setAgents(initialAgents));
  }, [dispatch, initialAgents]);

  if (filteredAgents.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <div className="text-muted-foreground">
          <p className="text-lg mb-2">No agents found</p>
          <p className="text-sm">
            Try adjusting your search or filter criteria
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence mode="popLayout">
        {filteredAgents.map((agent, index) => (
          <AgentCard key={agent.id} agent={agent} index={index} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default AgentsGrid;
