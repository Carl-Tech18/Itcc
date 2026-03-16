import { useState } from "react";
import { Check, Search } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Integration {
  id: number;
  name: string;
  description: string;
  category: string;
  connected: boolean;
  image: string;
}

export function Integrations() {
  const [searchQuery, setSearchQuery] = useState("");
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 1,
      name: "Salesforce",
      description: "Sync customer data and invoices",
      category: "CRM",
      connected: true,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop"
    },
    {
      id: 2,
      name: "Stripe",
      description: "Accept online payments seamlessly",
      category: "Payment Gateway",
      connected: true,
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=400&fit=crop"
    },
    {
      id: 3,
      name: "Shopify",
      description: "Manage inventory and sales data",
      category: "Inventory System",
      connected: false,
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&h=400&fit=crop"
    },
    {
      id: 4,
      name: "HubSpot",
      description: "Marketing automation and CRM",
      category: "CRM",
      connected: false,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop"
    },
    {
      id: 5,
      name: "PayPal",
      description: "Process payments globally",
      category: "Payment Gateway",
      connected: false,
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop"
    },
    {
      id: 6,
      name: "Square",
      description: "Point of sale and payments",
      category: "Payment Gateway",
      connected: false,
      image: "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=400&h=400&fit=crop"
    },
  ]);

  const toggleConnection = (id: number) => {
    setIntegrations(integrations.map(integration => 
      integration.id === id 
        ? { ...integration, connected: !integration.connected }
        : integration
    ));
  };

  const filteredIntegrations = integrations.filter(integration =>
    integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    integration.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Integrations</h1>
        <p className="text-gray-600">Connect your favorite business apps</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
          <p className="text-gray-600 text-sm mb-1">Connected Apps</p>
          <p className="text-3xl">{integrations.filter(i => i.connected).length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
          <p className="text-gray-600 text-sm mb-1">Available Apps</p>
          <p className="text-3xl">{integrations.filter(i => !i.connected).length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
          <p className="text-gray-600 text-sm mb-1">Total Integrations</p>
          <p className="text-3xl">{integrations.length}</p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search integrations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.map((integration) => (
          <div 
            key={integration.id}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all transform hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 transform transition-transform hover:scale-110">
                <ImageWithFallback
                  src={integration.image}
                  alt={integration.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {integration.connected && (
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white animate-pulse"
                  style={{ backgroundColor: '#2CA01C' }}
                >
                  <Check size={16} />
                </div>
              )}
            </div>

            <h3 className="text-lg mb-2">{integration.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{integration.description}</p>
            <span className="inline-block px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-700 mb-4">
              {integration.category}
            </span>

            <button
              onClick={() => toggleConnection(integration.id)}
              className={`w-full py-3 px-4 rounded-lg transition-all transform active:scale-95 ${
                integration.connected
                  ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  : "text-white hover:shadow-lg"
              }`}
              style={!integration.connected ? { backgroundColor: '#2CA01C' } : {}}
              onMouseEnter={(e) => {
                if (!integration.connected) {
                  e.currentTarget.style.backgroundColor = '#248517';
                }
              }}
              onMouseLeave={(e) => {
                if (!integration.connected) {
                  e.currentTarget.style.backgroundColor = '#2CA01C';
                }
              }}
            >
              {integration.connected ? "Disconnect" : "Connect App"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}