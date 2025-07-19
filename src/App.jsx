import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import { ViewModeProvider } from "@/context/ViewModeContext";

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
import ScratchAppLayout from "./layout/ScratchAppLayout";
import { Loader } from "./components/ui/loader";
import { useApiCounterStore } from "./utils/ApiClient";
import FolderFlipbooks from "./pages/FolderFlipbooks";
import SharedWithMe from "./pages/SharedWithMe";
import Trash from "./pages/Trash";
import { FolderProvider } from "./context/FolderContext";
import { CurrencyProvider } from "./context/CurrencyContext";
import VerifyReader from "./pages/Settings/VerifyReader";
import { WorkspaceProvider } from "./context/WorkspaceContext";
import { FlipbookProvider } from "./context/FlipbookContext";
import { FlipbookSettingsProvider } from "./context/FlipbookSettingsProvider";
import AdminEditorAppLayout from "./layout/AdminEditorAppLayout";
import { ShopSettingsProvider } from "./context/ShopSettingsContext";
import PublicFlipbook from "./public/PublicFlipbook";
import NotFound404 from "./components/ui/NotFound404";
import MyProfile from "./pages/MyProfile";

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
  const apiCounter = useApiCounterStore((state) => state.counter);

  return (
    <AuthProvider>
      <Routes>
        {/* Public Auth routes (not wrapped in CurrencyProvider, WorkspaceProvider, or FlipbookProvider) */}
        <Route path="/auth/sign-up" element={<PublicRoute><SignUp /></PublicRoute>} />
        <Route path="/auth/sign-in" element={<PublicRoute><SignIn /></PublicRoute>} />
        <Route path="/auth/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
        <Route path="/auth/forgot-password/:token" element={<PublicRoute><ResetPassword /></PublicRoute>} />
        <Route path="/account/confirm-account" element={<PublicRoute><ConfirmAccount /></PublicRoute>} />
        <Route path="/accept-invitation/:token" element={<VerifyReader />} />
        <Route path="/public-flipbook/:id" element={<PublicFlipbook />} />
        <Route path="/profile/:id" element={<MyProfile />} />

        {/* Private/protected routes (wrapped in providers) */}
        <Route
          path="*"
          element={
            <FolderProvider>
              <CurrencyProvider>
                <WorkspaceProvider>
                  <FlipbookProvider>
                    {apiCounter > 0 && <Loader />}
                    <Routes>
                      {/* Default redirect */}
                      <Route path="/" element={<Navigate to="/myflipbooks" replace />} />

                      {/* Main content routes */}
                      <Route path="/myflipbooks" element={
                        <PrivateRoute>
                          <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
                        </PrivateRoute>
                      }>
                        <Route index element={<Navigate to="flipbooks" replace />} />
                        <Route path="flipbooks" element={<MyFlipbooks isSidebarOpen={isSidebarOpen} />} />
                        <Route path="flipbooks/folder/:id" element={<FolderFlipbooks isSidebarOpen={isSidebarOpen} />} />
                        <Route path="template" element={<MyFlipbooks isSidebarOpen={isSidebarOpen} />} />
                        <Route path="template/folder/:id" element={<FolderFlipbooks isSidebarOpen={isSidebarOpen} />} />
                        <Route path="shared-with-me" element={<SharedWithMe isSidebarOpen={isSidebarOpen} />} />
                        <Route path="trash" element={<Trash isSidebarOpen={isSidebarOpen} />} />
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
                          <ViewModeProvider>
                            <FlipbookSettingsProvider>
                              <ShopSettingsProvider>
                                <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
                              </ShopSettingsProvider>
                            </FlipbookSettingsProvider>
                          </ViewModeProvider>
                        </PrivateRoute>
                      }>
                        <Route index element={<Details />} />
                      </Route>
                      <Route path="/embed/:id" element={
                        <PrivateRoute>
                          <ViewModeProvider>
                            <FlipbookSettingsProvider>
                              <ShopSettingsProvider>
                                <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
                              </ShopSettingsProvider>
                            </FlipbookSettingsProvider>
                          </ViewModeProvider>
                        </PrivateRoute>
                      }>
                        <Route index element={<Details />} />
                      </Route>
                      <Route path="/trackable-links/:id" element={
                        <PrivateRoute>
                          <ViewModeProvider>
                            <FlipbookSettingsProvider>
                              <ShopSettingsProvider>
                                <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
                              </ShopSettingsProvider>
                            </FlipbookSettingsProvider>
                          </ViewModeProvider>
                        </PrivateRoute>
                      }>
                        <Route index element={<Details />} />
                      </Route>
                      <Route path="/stats/:id" element={
                        <PrivateRoute>
                          <ViewModeProvider>
                            <FlipbookSettingsProvider>
                              <ShopSettingsProvider>
                                <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
                              </ShopSettingsProvider>
                            </FlipbookSettingsProvider>
                          </ViewModeProvider>
                        </PrivateRoute>
                      }>
                        <Route index element={<Details />} />
                      </Route>
                      <Route path="/send-email/:id" element={
                        <PrivateRoute>
                          <ViewModeProvider>
                            <FlipbookSettingsProvider>
                              <ShopSettingsProvider>
                                <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
                              </ShopSettingsProvider>
                            </FlipbookSettingsProvider>
                          </ViewModeProvider>
                        </PrivateRoute>
                      }>
                        <Route index element={<Details />} />
                      </Route>
                      <Route path="/download-qr/:id" element={
                        <PrivateRoute>
                          <ViewModeProvider>
                            <FlipbookSettingsProvider>
                              <ShopSettingsProvider>
                                <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
                              </ShopSettingsProvider>
                            </FlipbookSettingsProvider>
                          </ViewModeProvider>
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
                          <ViewModeProvider>
                            <FlipbookSettingsProvider>
                              <ShopSettingsProvider>
                                <CustomizeAppLayout />
                              </ShopSettingsProvider>
                            </FlipbookSettingsProvider>
                          </ViewModeProvider>
                        </PrivateRoute>
                      }>
                        <Route index element={<Customize />} />
                      </Route>

                      <Route path="/create" element={
                        <PrivateRoute>
                          <ScratchAppLayout />
                        </PrivateRoute>
                      }>
                        <Route index element={<FlipbookFromScratch />} />
                      </Route>

                      <Route path="/admin-editor/:id" element={
                        <PrivateRoute>
                          <ViewModeProvider>
                            <AdminEditorAppLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
                          </ViewModeProvider>
                        </PrivateRoute>
                      }>
                        <Route index element={<Editor />} />
                      </Route>

                      <Route path="/editor/:id" element={
                        <PrivateRoute>
                          <ViewModeProvider>
                            <FlipbookSettingsProvider>
                              <ShopSettingsProvider>
                                <EditorAppLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
                              </ShopSettingsProvider>
                            </FlipbookSettingsProvider>
                          </ViewModeProvider>
                        </PrivateRoute>
                      }>
                        <Route index element={<Editor />} />
                      </Route>
                      {/* 404 Catch-all for protected routes */}
                      <Route path="*" element={<NotFound404 />} />
                    </Routes>
                  </FlipbookProvider>
                </WorkspaceProvider>
              </CurrencyProvider>
            </FolderProvider>
          }
        />
        {/* 404 Catch-all for public routes */}
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </AuthProvider>
  );
}