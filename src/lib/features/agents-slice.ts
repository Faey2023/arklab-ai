import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Agent, FilterState } from "@/types/agent"

interface AgentsState {
  agents: Agent[]
  filteredAgents: Agent[]
  filters: FilterState
  loading: boolean
}

const initialState: AgentsState = {
  agents: [],
  filteredAgents: [],
  filters: {
    searchQuery: "",
    selectedStatuses: [],
    selectedCategories: [],
    selectedPricingModel: "",
  },
  loading: false,
}

const agentsSlice = createSlice({
  name: "agents",
  initialState,
  reducers: {
    setAgents: (state, action: PayloadAction<Agent[]>) => {
      state.agents = action.payload
      state.filteredAgents = action.payload
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.filters.searchQuery = action.payload
      agentsSlice.caseReducers.applyFilters(state)
    },
    setSelectedStatuses: (state, action: PayloadAction<string[]>) => {
      state.filters.selectedStatuses = action.payload
      agentsSlice.caseReducers.applyFilters(state)
    },
    setSelectedCategories: (state, action: PayloadAction<string[]>) => {
      state.filters.selectedCategories = action.payload
      agentsSlice.caseReducers.applyFilters(state)
    },
    setSelectedPricingModel: (state, action: PayloadAction<string>) => {
      state.filters.selectedPricingModel = action.payload
      agentsSlice.caseReducers.applyFilters(state)
    },
    clearAllFilters: (state) => {
      state.filters = {
        searchQuery: "",
        selectedStatuses: [],
        selectedCategories: [],
        selectedPricingModel: "",
      }
      state.filteredAgents = state.agents
    },
    applyFilters: (state) => {
      let filtered = state.agents

      // Apply search filter
      if (state.filters.searchQuery) {
        const query = state.filters.searchQuery.toLowerCase()
        filtered = filtered.filter(
          (agent) => agent.name.toLowerCase().includes(query) || agent.description.toLowerCase().includes(query),
        )
      }

      // Apply status filter
      if (state.filters.selectedStatuses.length > 0) {
        filtered = filtered.filter((agent) => state.filters.selectedStatuses.includes(agent.status))
      }

      // Apply category filter
      if (state.filters.selectedCategories.length > 0) {
        filtered = filtered.filter((agent) => state.filters.selectedCategories.includes(agent.category))
      }

      // Apply pricing model filter
      if (state.filters.selectedPricingModel) {
        filtered = filtered.filter((agent) => agent.pricingModel === state.filters.selectedPricingModel)
      }

      state.filteredAgents = filtered
    },
  },
})

export const {
  setAgents,
  setSearchQuery,
  setSelectedStatuses,
  setSelectedCategories,
  setSelectedPricingModel,
  clearAllFilters,
} = agentsSlice.actions

export default agentsSlice.reducer
