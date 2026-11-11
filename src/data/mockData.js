// Mock data used until the Express/MongoDB backend is connected.
// Replace each export with an API call (fetch/axios) later.

// ---- Constants (values marked TBD in the SRS are placeholders) ----
export const SERVICE_AREAS = ["Dhanmondi", "Mirpur", "Uttara", "Mohammadpur"]; // TBD-01
export const LOCATION_INTERVAL_MS = 10000; // proposed default, TBD-10
export const CONFIDENCE_THRESHOLD = 0.6; // TBD-13
export const MAX_IMAGE_MB = 5;

// Status flow from SRS Appendix B.2
export const STATUS_FLOW = ["Pending", "Assigned", "InProgress", "Collected", "Dispatched", "Completed"];

export const STATUS_STYLES = {
  Pending: "bg-yellow-100 text-yellow-700",
  Assigned: "bg-blue-100 text-blue-700",
  InProgress: "bg-purple-100 text-purple-700",
  Collected: "bg-teal-100 text-teal-700",
  Dispatched: "bg-indigo-100 text-indigo-700",
  Completed: "bg-green-100 text-green-700",
  Failed: "bg-red-100 text-red-700",
  Cancelled: "bg-gray-200 text-gray-600",
  Rejected: "bg-red-100 text-red-700",
  Open: "bg-green-100 text-green-700",
  Negotiating: "bg-yellow-100 text-yellow-700",
  Accepted: "bg-blue-100 text-blue-700",
  Closed: "bg-gray-200 text-gray-600",
  Active: "bg-green-100 text-green-700",
  Inactive: "bg-gray-200 text-gray-600",
  Available: "bg-green-100 text-green-700",
  Busy: "bg-orange-100 text-orange-700",
  Interested: "bg-yellow-100 text-yellow-700",
};

// ---- Role navigation ----
export const ROLE_CONFIG = {
  resident: {
    label: "Resident Portal",
    home: "/resident/dashboard",
    nav: [
      { label: "Dashboard", to: "/resident/dashboard", icon: "🏠" },
      { label: "AI Classifier", to: "/resident/classifier", icon: "🤖" },
      { label: "Sorting Guide", to: "/resident/sorting-guide", icon: "📖" },
      { label: "Request Pickup", to: "/resident/request-pickup", icon: "🚛" },
      { label: "My Requests", to: "/resident/my-requests", icon: "📋" },
    ],
  },
  manager: {
    label: "Collection Manager",
    home: "/manager/dashboard",
    nav: [
      { label: "Dashboard", to: "/manager/dashboard", icon: "🏠" },
      { label: "Requests", to: "/manager/requests", icon: "📋" },
      { label: "Assign Collector", to: "/manager/assign-collector", icon: "🧑‍🔧" },
      { label: "Collection Records", to: "/manager/collection-records", icon: "🗂️" },
    ],
  },
  collector: {
    label: "Collector Portal",
    home: "/collector/dashboard",
    nav: [
      { label: "Dashboard", to: "/collector/dashboard", icon: "🏠" },
      { label: "My Tasks", to: "/collector/my-tasks", icon: "✅" },
    ],
  },
  industry: {
    label: "Industry Portal",
    home: "/industry/dashboard",
    nav: [
      { label: "Dashboard", to: "/industry/dashboard", icon: "🏠" },
      { label: "Upload Materials", to: "/industry/upload-materials", icon: "📦" },
      { label: "My Listings", to: "/industry/my-listings", icon: "📋" },
      { label: "Create Deal", to: "/industry/create-deal", icon: "🤝" },
    ],
  },
  business: {
    label: "Scrap Business Portal",
    home: "/business/dashboard",
    nav: [
      { label: "Dashboard", to: "/business/dashboard", icon: "🏠" },
      { label: "Browse Deals", to: "/business/browse-deals", icon: "🔍" },
      { label: "My Deals", to: "/business/my-deals", icon: "🤝" },
    ],
  },
  admin: {
    label: "Administrator",
    home: "/admin/dashboard",
    nav: [
      { label: "Dashboard", to: "/admin/dashboard", icon: "🏠" },
      { label: "Users", to: "/admin/users", icon: "👥" },
      { label: "Categories", to: "/admin/categories", icon: "🏷️" },
      { label: "All Requests", to: "/admin/requests", icon: "📋" },
    ],
  },
};

// ---- Waste categories (TBD-03: final list to be confirmed) ----
export const WASTE_CATEGORIES = [
  {
    id: "cat-plastic", name: "Plastic", icon: "🧴", eligible: true,
    description: "Bottles, containers and packaging made of plastic.",
    instructions: ["Empty the container and rinse it.", "Remove caps and labels where possible.", "Flatten bottles to save space.", "Keep plastic dry and separate from food waste."],
  },
  {
    id: "cat-paper", name: "Paper & Cardboard", icon: "📦", eligible: true,
    description: "Newspapers, cartons, office paper and cardboard boxes.",
    instructions: ["Keep paper dry and clean.", "Flatten cardboard boxes.", "Remove plastic tape and staples if you can.", "Do not include greasy or food-soiled paper."],
  },
  {
    id: "cat-glass", name: "Glass", icon: "🍾", eligible: true,
    description: "Glass bottles and jars.",
    instructions: ["Rinse bottles and jars.", "Do not mix with ceramics or mirrors.", "Wrap broken glass in paper and label it clearly.", "Handle carefully to avoid injury."],
  },
  {
    id: "cat-metal", name: "Metal", icon: "🥫", eligible: true,
    description: "Aluminium cans, tin cans and scrap metal.",
    instructions: ["Rinse food cans.", "Crush aluminium cans to save space.", "Keep sharp metal pieces wrapped.", "Store separately from other waste."],
  },
  {
    id: "cat-ewaste", name: "Electronic Waste", icon: "🔌", eligible: true,
    description: "Old phones, chargers, batteries and small electronics.",
    instructions: ["Do not break or open devices.", "Store batteries separately in a dry place.", "Erase personal data from devices.", "Keep e-waste away from water and heat."],
  },
  {
    id: "cat-textile", name: "Old Clothes & Textiles", icon: "👕", eligible: true,
    description: "Used clothing, fabric and bedding.",
    instructions: ["Wash or air out items.", "Bag them in a clean, dry sack.", "Do not include wet or mouldy fabric."],
  },
  {
    id: "cat-organic", name: "Organic / Food Waste", icon: "🍌", eligible: false,
    description: "Kitchen scraps and garden waste. Not collected by this service.",
    instructions: ["Keep separate from dry recyclables.", "Drain liquids before disposal.", "Use your local city corporation bin or compost it."],
  },
];

// ---- Pickup requests ----
export const REQUESTS = [
  { id: "ST-1001", resident: "Rahim Uddin", category: "Plastic", quantity: "12 kg", address: "House 12, Road 5, Dhanmondi", area: "Dhanmondi", date: "2026-11-01", status: "Completed", collectorId: "c1", collector: "Karim Mia" },
  { id: "ST-1002", resident: "Rahim Uddin", category: "Paper & Cardboard", quantity: "8 kg", address: "House 12, Road 5, Dhanmondi", area: "Dhanmondi", date: "2026-11-02", status: "InProgress", collectorId: "c1", collector: "Karim Mia" },
  { id: "ST-1003", resident: "Rahim Uddin", category: "Electronic Waste", quantity: "3 items", address: "Flat 4B, Block C, Mirpur", area: "Mirpur", date: "2026-11-02", status: "Pending", collectorId: null, collector: null },
  { id: "ST-1004", resident: "Nusrat Jahan", category: "Metal", quantity: "20 kg", address: "House 7, Sector 4, Uttara", area: "Uttara", date: "2026-11-02", status: "Assigned", collectorId: "c3", collector: "Selim Reza" },
  { id: "ST-1005", resident: "Tanvir Ahmed", category: "Glass", quantity: "15 bottles", address: "Road 9, Mohammadpur", area: "Mohammadpur", date: "2026-11-01", status: "Cancelled", collectorId: null, collector: null },
  { id: "ST-1006", resident: "Farhana Akter", category: "Old Clothes & Textiles", quantity: "2 sacks", address: "House 31, Road 2, Dhanmondi", area: "Dhanmondi", date: "2026-11-02", status: "Pending", collectorId: null, collector: null },
];

// ---- Collectors ----
export const COLLECTORS = [
  { id: "c1", name: "Karim Mia", phone: "01711-000001", area: "Dhanmondi", availability: "Busy" },
  { id: "c2", name: "Jamal Hossain", phone: "01711-000002", area: "Mirpur", availability: "Available" },
  { id: "c3", name: "Selim Reza", phone: "01711-000003", area: "Uttara", availability: "Busy" },
  { id: "c4", name: "Nasir Ahmed", phone: "01711-000004", area: "Dhanmondi", availability: "Available" },
];

// ---- Collection records ----
export const RECORDS = [
  { id: "REC-501", requestId: "ST-1001", collector: "Karim Mia", collectionTime: "2026-11-01 11:20", dispatchStatus: "Dispatched", remarks: "Delivered to recycling partner" },
  { id: "REC-502", requestId: "ST-0998", collector: "Jamal Hossain", collectionTime: "2026-10-31 15:05", dispatchStatus: "Dispatched", remarks: "-" },
  { id: "REC-503", requestId: "ST-0991", collector: "Nasir Ahmed", collectionTime: "2026-10-30 09:40", dispatchStatus: "Pending", remarks: "Awaiting dispatch" },
];

// ---- Industry listings & deals ----
export const LISTINGS = [
  { id: "L-01", industry: "GreenTex Ltd.", category: "Old Clothes & Textiles", details: "Cut fabric offcuts, mixed cotton", quantity: "2 tons", status: "Open", date: "2026-10-28" },
  { id: "L-02", industry: "GreenTex Ltd.", category: "Plastic", details: "Clean PET bottle scrap", quantity: "800 kg", status: "Open", date: "2026-10-30" },
  { id: "L-03", industry: "TechWorks BD", category: "Electronic Waste", details: "Decommissioned office electronics", quantity: "150 units", status: "Negotiating", date: "2026-10-25" },
];

export const DEALS = [
  { id: "D-01", listingId: "L-01", industry: "GreenTex Ltd.", category: "Old Clothes & Textiles", quantity: "2 tons", terms: "Pickup within 7 days; payment on collection.", price: "BDT 18,000", validUntil: "2026-11-20", status: "Open", myStatus: null },
  { id: "D-02", listingId: "L-02", industry: "GreenTex Ltd.", category: "Plastic", quantity: "800 kg", terms: "Buyer arranges transport; weekly pickups.", price: "BDT 24,000", validUntil: "2026-11-25", status: "Negotiating", myStatus: "Interested" },
  { id: "D-03", listingId: "L-03", industry: "TechWorks BD", category: "Electronic Waste", quantity: "150 units", terms: "Bulk lot only; site inspection allowed.", price: "BDT 60,000", validUntil: "2026-11-15", status: "Accepted", myStatus: "Accepted" },
];

// ---- Users ----
export const USERS = [
  { id: "u1", name: "Rahim Uddin", email: "rahim@example.com", phone: "01800-000001", role: "Resident", status: "Active" },
  { id: "u2", name: "Nusrat Jahan", email: "nusrat@example.com", phone: "01800-000002", role: "Resident", status: "Active" },
  { id: "u3", name: "Mahbub Alam", email: "mahbub@example.com", phone: "01800-000003", role: "Collector Manager", status: "Active" },
  { id: "u4", name: "Karim Mia", email: "karim@example.com", phone: "01711-000001", role: "Collector", status: "Active" },
  { id: "u5", name: "GreenTex Ltd.", email: "info@greentex.example", phone: "01900-000005", role: "Industry", status: "Inactive" },
  { id: "u6", name: "Rafiq Scrap House", email: "rafiq@example.com", phone: "01900-000006", role: "Scrap Business", status: "Active" },
];

export const USER_ROLES = ["Resident", "Collector Manager", "Collector", "Industry", "Scrap Business", "Administrator"];
