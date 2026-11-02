
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

import "./index.css";

// Layout
import PublicLayout from "./Layouts/PublicLayouts.jsx";

// Public Pages
import Home from "./pages/Home.jsx";
import PagePlaceholder from "./pages/PagePlaceholder.jsx";

// Resident Pages
import Dashboard from "./modules/resident/Dashboard.jsx";

// Reusable page component
const page = (title, description) => {
  return function GeneratedPage() {
    return (
      <PagePlaceholder
        title={title}
        description={description}
      />
    );
  };
};

const router = createBrowserRouter([
  // PUBLIC ROUTES
  {
    path: "/",
    Component: PublicLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "login",
        Component: page("Login"),
      },
      {
        path: "register",
        Component: page("Register"),
      },
      {
        path: "about",
        Component: page("About SortNTrack"),
      },
    ],
  },

  // RESIDENT ROUTES
  {
    path: "/resident/dad",
    Component: Dashboard,
  },
  {
    path: "/resident/classifier",
    Component: page("AI Waste Classifier"),
  },
  {
    path: "/resident/sorting-guide",
    Component: page("Waste Sorting Guide"),
  },
  {
    path: "/resident/request-pickup",
    Component: page("Request Pickup"),
  },
  {
    path: "/resident/my-requests",
    Component: page("My Pickup Requests"),
  },
  {
    path: "/resident/track-pickup/:id",
    Component: page("Track Pickup"),
  },

  // WASTE COLLECTOR MANAGER ROUTES
  {
    path: "/manager/dashboard",
    Component: page("Manager Dashboard"),
  },
  {
    path: "/manager/requests",
    Component: page("Manage Requests"),
  },
  {
    path: "/manager/assign-collector",
    Component: page("Assign Collector"),
  },
  {
    path: "/manager/collection-records",
    Component: page("Collection Records"),
  },

  // WASTE COLLECTOR ROUTES
  {
    path: "/collector/dashboard",
    Component: page("Collector Dashboard"),
  },
  {
    path: "/collector/my-tasks",
    Component: page("My Tasks"),
  },
  {
    path: "/collector/task/:id",
    Component: page("Task Details"),
  },
  {
    path: "/collector/update-status/:id",
    Component: page("Update Collection Status"),
  },

  // INDUSTRY ROUTES
  {
    path: "/industry/dashboard",
    Component: page("Industry Dashboard"),
  },
  {
    path: "/industry/upload-materials",
    Component: page("Upload Materials"),
  },
  {
    path: "/industry/my-listings",
    Component: page("My Material Listings"),
  },
  {
    path: "/industry/create-deal",
    Component: page("Create Deal"),
  },

  // SCRAP BUSINESSMAN ROUTES
  {
    path: "/business/dashboard",
    Component: page("Scrap Business Dashboard"),
  },
  {
    path: "/business/browse-deals",
    Component: page("Browse Deals"),
  },
  {
    path: "/business/deal/:id",
    Component: page("Deal Details"),
  },
  {
    path: "/business/my-deals",
    Component: page("My Deals"),
  },

  // ADMIN ROUTES
  {
    path: "/admin/dashboard",
    Component: page("Admin Dashboard"),
  },
  {
    path: "/admin/users",
    Component: page("Manage Users"),
  },
  {
    path: "/admin/categories",
    Component: page("Manage Waste Categories"),
  },
  {
    path: "/admin/requests",
    Component: page("Manage All Requests"),
  },

  // NOT FOUND
  {
    path: "*",
    Component: page("404 - Page Not Found"),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
