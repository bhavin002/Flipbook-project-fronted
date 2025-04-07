import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";

// Auth pages
import SignUp from "./pages/Auth/SignUp";
import SignIn from "./pages/Auth/SignIn";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassowrd";

// MyFlipbooks and main feature pages
import MyFlipbooks from "./pages/MyFlipbooks";
import AutomationContent from "./pages/AutomationContent";
import StatisticsContent from "./pages/StatisticsContent";

// Branding pages
import BrandingSettings from "./pages/Branding/BrandingSettings";
import BrandingPersonalization from "./pages/Branding/BrandingPersonalization";
import BrandingFonts from "./pages/Branding/BrandingFonts";
import BrandingColors from "./pages/Branding/BrandingColors";
import BrandingTypography from "./pages/Branding/BrandingTypography";
import BrandingLogos from "./pages/Branding/BrandingLogos";

// Settings pages
import SettingWorkspace from "./pages/Settings/SettingWorkspace";
import SettingGeneral from "./pages/Settings/SettingGeneral";
import SettingBillingSubscription from "./pages/Settings/SettingBillingSubscription";
import SettingBillingInvoices from "./pages/Settings/SettingBillingInvoices";
import SettingTeammates from "./pages/Settings/SettingTeammates";
import SettingReaders from "./pages/Settings/SettingReaders";
import SettingGroups from "./pages/Settings/SettingGroups";
import SettingSingleSignOn from "./pages/Settings/SettingSingleSignOn";
import SettingIntegrations from "./pages/Settings/SettingIntegrations";
import SettingWorkspaceAccess from "./pages/Settings/SettingWorkspaceAccess";
import SettingTeammateActivity from "./pages/Settings/SettingTeammateActivity";
import SettingPermission from "./pages/Settings/SettingPermission";
import SettingEmailProvider from "./pages/Settings/SettingEmailProvider";
import { useState } from "react";
import Details from "./pages/Details";
import MyAccount from "./pages/MyAccount";
import CustomizeAppLayout from "./layout/CustomizeAppLayout";
import Customize from "./pages/Customize";
import EditorAppLayout from "./layout/EditorAppLayout";
import Editor from "./pages/Editor";

// Route configurations
const brandingRoutes = [
  { path: "profile/settings", element: <BrandingSettings /> },
  { path: "profile/personalization", element: <BrandingPersonalization /> },
  { path: "fonts", element: <BrandingFonts /> },
  { path: "colors", element: <BrandingColors /> },
  { path: "logos", element: <BrandingLogos /> },
  { path: "text-styles", element: <BrandingTypography /> },
];

const settingsRoutes = [
  { path: "workspace", element: <SettingWorkspace /> },
  { path: "general", element: <SettingGeneral /> },
  { path: "billing/subscription", element: <SettingBillingSubscription /> },
  { path: "billing/invoice", element: <SettingBillingInvoices /> },
  { path: "teammates", element: <SettingTeammates /> },
  { path: "readers", element: <SettingReaders /> },
  { path: "groups", element: <SettingGroups /> },
  { path: "sso", element: <SettingSingleSignOn /> },
  { path: "integrations", element: <SettingIntegrations /> },
  { path: "access", element: <SettingWorkspaceAccess /> },
  { path: "logs", element: <SettingTeammateActivity /> },
  { path: "permission-settings", element: <SettingPermission /> },
  { path: "email-provider", element: <SettingEmailProvider /> },
];

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Routes>
      {/* Auth routes */}
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/my-flipbooks" replace />} />

      {/* Main content routes */}
      <Route path="/my-flipbooks" element={<AppLayout setIsSidebarOpen={setIsSidebarOpen} />}>
        <Route index element={<MyFlipbooks isSidebarOpen={isSidebarOpen} />} />
      </Route>

      <Route path="/automation" element={<AppLayout setIsSidebarOpen={setIsSidebarOpen} />}>
        <Route index element={<AutomationContent />} />
      </Route>

      <Route path="/statistics" element={<AppLayout setIsSidebarOpen={setIsSidebarOpen} />}>
        <Route index element={<StatisticsContent />} />
      </Route>

      {/* Branding routes */}
      <Route path="/branding" element={<AppLayout setIsSidebarOpen={setIsSidebarOpen} />}>
        <Route index element={<Navigate to="profile/settings" replace />} />
        {brandingRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>

      {/* Settings routes */}
      <Route path="/settings" element={<AppLayout setIsSidebarOpen={setIsSidebarOpen} />}>
        <Route index element={<Navigate to="workspace" replace />} />
        {settingsRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>

      {/* Legacy settings route - redirect to workspace */}
      <Route path="/settings" element={<Navigate to="/settings/workspace" replace />} />
      <Route path="/settings/workspace" element={<AppLayout setIsSidebarOpen={setIsSidebarOpen} />}>
        <Route index element={<SettingWorkspace />} />
      </Route>

      {/* flipbook details page routes */}

      <Route path="/details/:id" element={<AppLayout setIsSidebarOpen={setIsSidebarOpen} />}>
        <Route index element={<Details />} />
      </Route>
      <Route path="/embed/:id" element={<AppLayout setIsSidebarOpen={setIsSidebarOpen} />}>
        <Route index element={<Details />} />
      </Route>
      <Route path="/trackable-links/:id" element={<AppLayout setIsSidebarOpen={setIsSidebarOpen} />}>
        <Route index element={<Details />} />
      </Route>
      <Route path="/stats/:id" element={<AppLayout setIsSidebarOpen={setIsSidebarOpen} />}>
        <Route index element={<Details />} />
      </Route>
      <Route path="/send-email/:id" element={<AppLayout setIsSidebarOpen={setIsSidebarOpen} />}>
        <Route index element={<Details />} />
      </Route>
      <Route path="/download-qr/:id" element={<AppLayout setIsSidebarOpen={setIsSidebarOpen} />}>
        <Route index element={<Details />} />
      </Route>

      {/* my account page routes */}
      <Route path="/account/details" element={<AppLayout setIsSidebarOpen={setIsSidebarOpen} />}>
        <Route index element={<MyAccount />} />
      </Route>
      <Route path="/account/email-preferences" element={<AppLayout setIsSidebarOpen={setIsSidebarOpen} />}>
        <Route index element={<MyAccount />} />
      </Route>

      <Route path="/customize/:id" element={<CustomizeAppLayout />}>
        <Route index element={<Customize />} />
      </Route>

      <Route path="/editor/:id" element={<EditorAppLayout setIsSidebarOpen={setIsSidebarOpen} />}>
        <Route index element={<Editor isSidebarOpen={isSidebarOpen} />} />
      </Route>
    </Routes>
  );
}