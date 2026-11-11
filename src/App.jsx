import { createBrowserRouter, Navigate, RouterProvider } from "react-router";

// Layouts
import PublicLayout from "./layouts/PublicLayout.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";

// Public pages
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import About from "./pages/About.jsx";
import NotFound from "./pages/NotFound.jsx";

// Resident
import ResidentDashboard from "./modules/resident/Dashboard.jsx";
import WasteClassifier from "./modules/resident/WasteClassifier.jsx";
import SortingGuide from "./modules/resident/SortingGuide.jsx";
import RequestPickup from "./modules/resident/RequestPickup.jsx";
import MyRequests from "./modules/resident/MyRequests.jsx";
import TrackPickup from "./modules/resident/TrackPickup.jsx";

// Manager
import ManagerDashboard from "./modules/manager/Dashboard.jsx";
import ManageRequests from "./modules/manager/ManageRequests.jsx";
import AssignCollector from "./modules/manager/AssignCollector.jsx";
import CollectionRecords from "./modules/manager/CollectionRecords.jsx";

// Collector
import CollectorDashboard from "./modules/collector/Dashboard.jsx";
import MyTasks from "./modules/collector/MyTasks.jsx";
import TaskDetails from "./modules/collector/TaskDetails.jsx";
import UpdateCollectionStatus from "./modules/collector/UpdateCollectionStatus.jsx";

// Industry
import IndustryDashboard from "./modules/industry/Dashboard.jsx";
import UploadMaterials from "./modules/industry/UploadMaterials.jsx";
import MyListings from "./modules/industry/MyListings.jsx";
import CreateDeal from "./modules/industry/CreateDeal.jsx";

// Scrap business
import BusinessDashboard from "./modules/business/Dashboard.jsx";
import BrowseDeals from "./modules/business/BrowseDeals.jsx";
import DealDetails from "./modules/business/DealDetails.jsx";
import MyDeals from "./modules/business/MyDeals.jsx";

// Admin
import AdminDashboard from "./modules/admin/Dashboard.jsx";
import ManageUsers from "./modules/admin/ManageUsers.jsx";
import ManageCategories from "./modules/admin/ManageCategories.jsx";
import AdminManageRequests from "./modules/admin/ManageRequests.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "about", element: <About /> },
    ],
  },

  {
    path: "/resident",
    element: <DashboardLayout role="resident" />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <ResidentDashboard /> },
      { path: "classifier", element: <WasteClassifier /> },
      { path: "sorting-guide", element: <SortingGuide /> },
      { path: "request-pickup", element: <RequestPickup /> },
      { path: "my-requests", element: <MyRequests /> },
      { path: "track-pickup", element: <Navigate to="/resident/my-requests" replace /> },
      { path: "track-pickup/:id", element: <TrackPickup /> },
    ],
  },

  {
    path: "/manager",
    element: <DashboardLayout role="manager" />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <ManagerDashboard /> },
      { path: "requests", element: <ManageRequests /> },
      { path: "assign-collector", element: <AssignCollector /> },
      { path: "assign-collector/:id", element: <AssignCollector /> },
      { path: "collection-records", element: <CollectionRecords /> },
    ],
  },

  {
    path: "/collector",
    element: <DashboardLayout role="collector" />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <CollectorDashboard /> },
      { path: "my-tasks", element: <MyTasks /> },
      { path: "task/:id", element: <TaskDetails /> },
      { path: "update-status/:id", element: <UpdateCollectionStatus /> },
    ],
  },

  {
    path: "/industry",
    element: <DashboardLayout role="industry" />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <IndustryDashboard /> },
      { path: "upload-materials", element: <UploadMaterials /> },
      { path: "my-listings", element: <MyListings /> },
      { path: "create-deal", element: <CreateDeal /> },
    ],
  },

  {
    path: "/business",
    element: <DashboardLayout role="business" />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <BusinessDashboard /> },
      { path: "browse-deals", element: <BrowseDeals /> },
      { path: "deal/:id", element: <DealDetails /> },
      { path: "my-deals", element: <MyDeals /> },
    ],
  },

  {
    path: "/admin",
    element: <DashboardLayout role="admin" />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "users", element: <ManageUsers /> },
      { path: "categories", element: <ManageCategories /> },
      { path: "requests", element: <AdminManageRequests /> },
    ],
  },

  // 404 inside the public layout so the navbar stays visible
  { path: "*", element: <PublicLayout />, children: [{ path: "*", element: <NotFound /> }] },
]);

const App = () => <RouterProvider router={router} />;

export default App;
