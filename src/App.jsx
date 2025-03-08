import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./pages/MyFlipbooks/AppLayout";

// Auth pages
import SignUp from "./pages/Auth/SignUp";
import SignIn from "./pages/Auth/SignIn";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassowrd";

// MyFlipbooks and main feature pages
import MyFlipbooks from "./pages/MyFlipbooks/components/sidebar/home/MyFlipbooks";
import AutomationContent from "./pages/MyFlipbooks/components/sidebar/automation/AutomationContent";
import StatisticsContent from "./pages/MyFlipbooks/components/sidebar/statistics/StatisticsContent";

// Branding pages
import BrandingSettings from "./pages/MyFlipbooks/components/sidebar/branding/BrandingSettings";
import BrandingPersonalization from "./pages/MyFlipbooks/components/sidebar/branding/BrandingPersonalization";
import BrandingFonts from "./pages/MyFlipbooks/components/sidebar/branding/BrandingFonts";
import BrandingColors from "./pages/MyFlipbooks/components/sidebar/branding/BrandingColors";
import BrandingTypography from "./pages/MyFlipbooks/components/sidebar/branding/BrandingTypography";
import BrandingLogos from "./pages/MyFlipbooks/components/sidebar/branding/BrandingLogos";

// Settings pages
import SettingContent from "./pages/MyFlipbooks/components/sidebar/setting/SettingWorkspace";
import SettingWorkspace from "./pages/MyFlipbooks/components/sidebar/setting/SettingWorkspace";
import SettingGeneral from "./pages/MyFlipbooks/components/sidebar/setting/SettingGeneral";
import SettingBillingSubscription from "./pages/MyFlipbooks/components/sidebar/setting/SettingBillingSubscription";
import SettingBillingInvoices from "./pages/MyFlipbooks/components/sidebar/setting/SettingBillingInvoices";
import SettingTeammates from "./pages/MyFlipbooks/components/sidebar/setting/SettingTeammates";
import SettingReaders from "./pages/MyFlipbooks/components/sidebar/setting/SettingReaders";
import SettingGroups from "./pages/MyFlipbooks/components/sidebar/setting/SettingGroups";
import SettingSingleSignOn from "./pages/MyFlipbooks/components/sidebar/setting/SettingSingleSignOn";
import SettingIntegrations from "./pages/MyFlipbooks/components/sidebar/setting/SettingIntegrations";
import SettingWorkspaceAccess from "./pages/MyFlipbooks/components/sidebar/setting/SettingWorkspaceAccess";
import SettingTeammateActivity from "./pages/MyFlipbooks/components/sidebar/setting/SettingTeammateActivity";
import SettingPermission from "./pages/MyFlipbooks/components/sidebar/setting/SettingPermission";
import SettingEmailProvider from "./pages/MyFlipbooks/components/sidebar/setting/SettingEmailProvider";
import { useState } from "react";

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
      <Route path="/my-flipbooks" element={<AppLayout setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />}>
        <Route index element={<MyFlipbooks isSidebarOpen={isSidebarOpen} />} />
      </Route>
      
      <Route path="/automation" element={<AppLayout setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />}>
        <Route index element={<AutomationContent />} />
      </Route>
      
      <Route path="/statistics" element={<AppLayout setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />}>
        <Route index element={<StatisticsContent />} />
      </Route>
      
      {/* Branding routes */}
      <Route path="/branding" element={<AppLayout setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />}>
        <Route index element={<Navigate to="profile/settings" replace />} />
        {brandingRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>

      {/* Settings routes */}
      <Route path="/settings" element={<AppLayout setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />}>
        <Route index element={<Navigate to="workspace" replace />} />
        {settingsRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
      
      {/* Legacy settings route - redirect to workspace */}
      <Route path="/settings" element={<Navigate to="/settings/workspace" replace />} />
      <Route path="/settings/workspace" element={<AppLayout setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen}/>}>
        <Route index element={<SettingContent />} />
      </Route>
    </Routes>
  );
}