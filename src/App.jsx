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
import ConfirmAccount from "./pages/ConfirmAccount";
import { PublicRoute } from "./Middleware/PublicRoute";
import { PrivateRoute } from "./Middleware/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import FlipbookFromScratch from "./pages/FlipbookFromScratch";

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
  const [windowInnerWidth, setWindowInnerWidth] = useState(window.innerWidth);

  window.addEventListener('resize', () => {
    setWindowInnerWidth(window.innerWidth);
  });

  return (
    <AuthProvider>
      <Routes>
        {/* Public Auth routes */}
        <Route path="/auth/sign-up" element={<PublicRoute><SignUp /></PublicRoute>} />
        <Route path="/auth/sign-in" element={<PublicRoute><SignIn /></PublicRoute>} />
        <Route path="/auth/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
        <Route path="/auth/forgot-password/:token" element={<PublicRoute><ResetPassword /></PublicRoute>} />
        <Route path="/account/confirm-account" element={<PublicRoute><ConfirmAccount /></PublicRoute>} />

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/myflipbooks" replace />} />

        {/* Main content routes */}
        <Route path="/myflipbooks" element={
          <PrivateRoute>
            <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
          </PrivateRoute>
        }>
          <Route index element={<MyFlipbooks isSidebarOpen={isSidebarOpen} />} />
        </Route>

        <Route path="/automation" element={
          <PrivateRoute>
            <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
          </PrivateRoute>
        }>
          <Route index element={<AutomationContent />} />
        </Route>

        <Route path="/statistics" element={
          <PrivateRoute>
            <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
          </PrivateRoute>
        }>
          <Route index element={<StatisticsContent />} />
        </Route>

        {/* Branding routes */}
        <Route path="/branding" element={
          <PrivateRoute>
            <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
          </PrivateRoute>
        }>
          <Route index element={<Navigate to="profile/settings" replace />} />
          {brandingRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>

        {/* Settings routes */}
        <Route path="/settings" element={
          <PrivateRoute>
            <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
          </PrivateRoute>
        }>
          <Route index element={<Navigate to="workspace" replace />} />
          {settingsRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>

        {/* Legacy settings route - redirect to workspace */}
        <Route path="/settings" element={<Navigate to="/settings/workspace" replace />} />
        <Route path="/settings/workspace" element={
          <PrivateRoute>
            <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
          </PrivateRoute>
        }>
          <Route index element={<SettingWorkspace />} />
        </Route>

        {/* flipbook details page routes */}
        <Route path="/details/:id" element={
          <PrivateRoute>
            <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
          </PrivateRoute>
        }>
          <Route index element={<Details />} />
        </Route>
        <Route path="/embed/:id" element={
          <PrivateRoute>
            <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
          </PrivateRoute>
        }>
          <Route index element={<Details />} />
        </Route>
        <Route path="/trackable-links/:id" element={
          <PrivateRoute>
            <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
          </PrivateRoute>
        }>
          <Route index element={<Details />} />
        </Route>
        <Route path="/stats/:id" element={
          <PrivateRoute>
            <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
          </PrivateRoute>
        }>
          <Route index element={<Details />} />
        </Route>
        <Route path="/send-email/:id" element={
          <PrivateRoute>
            <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
          </PrivateRoute>
        }>
          <Route index element={<Details />} />
        </Route>
        <Route path="/download-qr/:id" element={
          <PrivateRoute>
            <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
          </PrivateRoute>
        }>
          <Route index element={<Details />} />
        </Route>

        {/* my account page routes */}
        <Route path="/account/details" element={
          <PrivateRoute>
            <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
          </PrivateRoute>
        }>
          <Route index element={<MyAccount />} />
        </Route>
        <Route path="/account/email-preferences" element={
          <PrivateRoute>
            <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
          </PrivateRoute>
        }>
          <Route index element={<MyAccount />} />
        </Route>

        <Route path="/customize/:id" element={
          <PrivateRoute>
            <CustomizeAppLayout />
          </PrivateRoute>
        }>
          <Route index element={<Customize />} />
        </Route>
        
        <Route path="/create" element={
          <PrivateRoute>
            <CustomizeAppLayout />
          </PrivateRoute>
        }>
          <Route index element={<FlipbookFromScratch />} />
        </Route>

        <Route path="/editor/:id" element={
          <PrivateRoute>
            <EditorAppLayout windowInnerWidth={windowInnerWidth} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
          </PrivateRoute>
        }>
          <Route index element={<Editor />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}