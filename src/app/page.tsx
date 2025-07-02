import type { Agent } from "@/types";
import agentsData from "@/data/mock-agents.json";
import AgentsGrid from "@/components/AgentsGrid";
import SearchBar from "@/components/SearchBar";
import Filters from "@/components/Filters";

// data fetch
const getAgents = async (): Promise<Agent[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    console.log(agentsData);
    return agentsData as Agent[];
  } catch (error) {
    console.error("Error fetching agents:", error);
    return [];
  }
};

const Home = async () => {
  const agents = await getAgents();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Agents Catalog
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover powerful AI agents designed to automate and enhance your
            business operations. From customer service to development tools,
            find the perfect AI solution for your needs.
          </p>
        </div>
        {/* search */}
        <div className="mb-8 max-w-2xl mx-auto">
          <SearchBar />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* sidebar filter */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Filters />
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Showing {agents.length} AI agents
              </p>
            </div>
            <AgentsGrid initialAgents={agents} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
