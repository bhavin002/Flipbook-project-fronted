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
import UploadFiles from "./pages/UploadFiles";
import { FileUploadProvider } from "./context/FileUploadContext";
import UploadFilesLayout from "./layout/UploadFilesLayout";
import ShelfCreateLayout from "./layout/ShelfCreateLayout";
import CreateShelf from "./pages/CreateShelf";
import OrganizeShelf from "./pages/OrganizeShelf";
import BookShelfDetails from "./pages/BookShelfDetails";
import PublicBookShelf from "./public/PublicBookShelf";
import { PermissionRoute } from "./Middleware/PermissionRoute";

// Route configurations
const brandingRoutes = [
  { path: "profile/settings", element: <BrandingSettings />, permission: "branding_profile" },
  { path: "profile/personalization", element: <BrandingPersonalization />, permission: "branding_profile" },
  // { path: "fonts", element: <BrandingFonts /> },
  { path: "colors", element: <BrandingColors />, permission: "branding" },
  { path: "logos", element: <BrandingLogos />, permission: "branding" },
  { path: "text-styles", element: <BrandingTypography />, permission: "branding" },
];

const settingsRoutes = [
  { path: "workspace", element: <SettingWorkspace />, permission: "setting" },
  // { path: "general", element: <SettingGeneral /> },
  { path: "billing/subscription", element: <SettingBillingSubscription />, permission: "setting" },
  { path: "billing/invoice", element: <SettingBillingInvoices />, permission: "setting" },
  { path: "teammates", element: <SettingTeammates />, permission: "invite_teammate" },
  { path: "readers", element: <SettingReaders />, permission: "setting" },
  { path: "groups", element: <SettingGroups />, permission: "setting" },
  // { path: "sso", element: <SettingSingleSignOn /> },
  // { path: "integrations", element: <SettingIntegrations /> },
  // { path: "access", element: <SettingWorkspaceAccess /> },
  { path: "logs", element: <SettingTeammateActivity />, permission: "setting" },
  // { path: "permission-settings", element: <SettingPermission />, permission: "setting" },
  // { path: "email-provider", element: <SettingEmailProvider /> },
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
        <Route path="/public-bookshelf/:id" element={<PublicBookShelf />} />
        <Route path="/profile/:id" element={<MyProfile />} />

        {/* Private/protected routes (wrapped in providers) */}
        <Route
          path="*"
          element={
            <FileUploadProvider>
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
                          <Route path="template" element={
                            <PermissionRoute requiredPermission="teamplates">
                              <MyFlipbooks isSidebarOpen={isSidebarOpen} />
                            </PermissionRoute>
                          } />
                          <Route path="template/folder/:id" element={
                            <PermissionRoute requiredPermission="teamplates">
                              <FolderFlipbooks isSidebarOpen={isSidebarOpen} />
                            </PermissionRoute>
                          } />
                          <Route path="shared-with-me" element={<SharedWithMe isSidebarOpen={isSidebarOpen} />} />
                          <Route path="trash" element={
                            <PermissionRoute requiredPermission="trash">
                              <Trash isSidebarOpen={isSidebarOpen} />
                            </PermissionRoute>
                          } />
                        </Route>

                        <Route path="/shelf" element={
                          <PermissionRoute requiredPermission="createDropdown">
                            <ShelfCreateLayout />
                          </PermissionRoute>
                        }>
                          <Route index element={<Navigate to="select" replace />} />
                          <Route path="select/:id?" element={<CreateShelf />} />
                          <Route path="organize/:id?" element={<OrganizeShelf />} />
                        </Route>

                        <Route path="/automation" element={
                          <PermissionRoute requiredPermission="automation">
                            <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
                          </PermissionRoute>
                        }>
                          <Route index element={<AutomationContent />} />
                        </Route>

                        <Route path="/statistics" element={
                          <PermissionRoute requiredPermission="statistics">
                            <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
                          </PermissionRoute>
                        }>
                          <Route index element={<StatisticsContent />} />
                        </Route>

                        {/* Branding routes */}
                        <Route path="/branding" element={
                          <PermissionRoute requiredPermission="branding">
                            <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
                          </PermissionRoute>
                        }>
                          <Route index element={<Navigate to="colors" replace />} />
                          {brandingRoutes.map((route) => (
                            <Route
                              key={route.path}
                              path={route.path}
                              element={
                                <PermissionRoute requiredPermission={route.permission}>
                                  {route.element}
                                </PermissionRoute>
                              }
                            />
                          ))}
                        </Route>

                        {/* Settings routes */}
                        <Route path="/settings" element={
                          <PermissionRoute requiredPermission="setting">
                            <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
                          </PermissionRoute>
                        }>
                          <Route index element={<Navigate to="workspace" replace />} />
                          {settingsRoutes.map((route) => (
                            <Route
                              key={route.path}
                              path={route.path}
                              element={
                                <PermissionRoute requiredPermission={route.permission}>
                                  {route.element}
                                </PermissionRoute>
                              }
                            />
                          ))}
                        </Route>

                        {/* Legacy settings route - redirect to workspace */}
                        <Route path="/settings" element={<Navigate to="/settings/workspace" replace />} />
                        <Route path="/settings/workspace" element={
                          <PermissionRoute requiredPermission="setting">
                            <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
                          </PermissionRoute>
                        }>
                          <Route index element={<SettingWorkspace />} />
                        </Route>

                        {/* flipbook details page routes */}
                        <Route path="/details/:id" element={
                          <PermissionRoute requiredPermission="flipbookDetails">
                            <ViewModeProvider>
                              <FlipbookSettingsProvider>
                                <ShopSettingsProvider>
                                  <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
                                </ShopSettingsProvider>
                              </FlipbookSettingsProvider>
                            </ViewModeProvider>
                          </PermissionRoute>
                        }>
                          <Route index element={<Details />} />
                        </Route>
                        <Route path="/embed/:id" element={
                          <PermissionRoute requiredPermission="flipbookDetails">
                            <ViewModeProvider>
                              <FlipbookSettingsProvider>
                                <ShopSettingsProvider>
                                  <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
                                </ShopSettingsProvider>
                              </FlipbookSettingsProvider>
                            </ViewModeProvider>
                          </PermissionRoute>
                        }>
                          <Route index element={<Details />} />
                        </Route>
                        <Route path="/stats/:id" element={
                          <PermissionRoute requiredPermission="flipbookDetails">
                            <ViewModeProvider>
                              <FlipbookSettingsProvider>
                                <ShopSettingsProvider>
                                  <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
                                </ShopSettingsProvider>
                              </FlipbookSettingsProvider>
                            </ViewModeProvider>
                          </PermissionRoute>
                        }>
                          <Route index element={<Details />} />
                        </Route>
                        <Route path="/send-email/:id" element={
                          <PermissionRoute requiredPermission="flipbookDetails">
                            <ViewModeProvider>
                              <FlipbookSettingsProvider>
                                <ShopSettingsProvider>
                                  <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
                                </ShopSettingsProvider>
                              </FlipbookSettingsProvider>
                            </ViewModeProvider>
                          </PermissionRoute>
                        }>
                          <Route index element={<Details />} />
                        </Route>
                        <Route path="/download-qr/:id" element={
                          <PermissionRoute requiredPermission="flipbookDetails">
                            <ViewModeProvider>
                              <FlipbookSettingsProvider>
                                <ShopSettingsProvider>
                                  <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
                                </ShopSettingsProvider>
                              </FlipbookSettingsProvider>
                            </ViewModeProvider>
                          </PermissionRoute>
                        }>
                          <Route index element={<Details />} />
                        </Route>

                        {/* shelf page routes */}
                        <Route path="/shelf/details/:id" element={
                          <PermissionRoute requiredPermission="flipbookDetails">
                            <ViewModeProvider>
                              <FlipbookSettingsProvider>
                                <ShopSettingsProvider>
                                  <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
                                </ShopSettingsProvider>
                              </FlipbookSettingsProvider>
                            </ViewModeProvider>
                          </PermissionRoute>
                        }>
                          <Route index element={<BookShelfDetails />} />
                        </Route>
                        <Route path="/shelf/customize/:id" element={
                          <PermissionRoute requiredPermission="flipbookDetails">
                            <ViewModeProvider>
                              <FlipbookSettingsProvider>
                                <ShopSettingsProvider>
                                  <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
                                </ShopSettingsProvider>
                              </FlipbookSettingsProvider>
                            </ViewModeProvider>
                          </PermissionRoute>
                        }>
                          <Route index element={<BookShelfDetails />} />
                        </Route>
                        <Route path="/shelf/embed/:id" element={
                          <PermissionRoute requiredPermission="flipbookDetails">
                            <ViewModeProvider>
                              <FlipbookSettingsProvider>
                                <ShopSettingsProvider>
                                  <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
                                </ShopSettingsProvider>
                              </FlipbookSettingsProvider>
                            </ViewModeProvider>
                          </PermissionRoute>
                        }>
                          <Route index element={<BookShelfDetails />} />
                        </Route>
                        <Route path="/shelf/stats/:id" element={
                          <PermissionRoute requiredPermission="flipbookDetails">
                            <ViewModeProvider>
                              <FlipbookSettingsProvider>
                                <ShopSettingsProvider>
                                  <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
                                </ShopSettingsProvider>
                              </FlipbookSettingsProvider>
                            </ViewModeProvider>
                          </PermissionRoute>
                        }>
                          <Route index element={<BookShelfDetails />} />
                        </Route>
                        <Route path="/shelf/send-email/:id" element={
                          <PermissionRoute requiredPermission="flipbookDetails">
                            <ViewModeProvider>
                              <FlipbookSettingsProvider>
                                <ShopSettingsProvider>
                                  <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
                                </ShopSettingsProvider>
                              </FlipbookSettingsProvider>
                            </ViewModeProvider>
                          </PermissionRoute>
                        }>
                          <Route index element={<BookShelfDetails />} />
                        </Route>
                        <Route path="/shelf/download-qr/:id" element={
                          <PermissionRoute requiredPermission="flipbookDetails">
                            <ViewModeProvider>
                              <FlipbookSettingsProvider>
                                <ShopSettingsProvider>
                                  <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
                                </ShopSettingsProvider>
                              </FlipbookSettingsProvider>
                            </ViewModeProvider>
                          </PermissionRoute>
                        }>
                          <Route index element={<BookShelfDetails />} />
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

                        <Route path="/upload" element={
                          <PermissionRoute requiredPermission="uploadFiles">
                            <UploadFilesLayout />
                          </PermissionRoute>
                        }>
                          <Route index element={<UploadFiles />} />
                        </Route>

                        <Route path="/customize/:id" element={
                          <PermissionRoute requiredPermission="flipbookCustomize">
                            <ViewModeProvider>
                              <FlipbookSettingsProvider>
                                <ShopSettingsProvider>
                                  <CustomizeAppLayout />
                                </ShopSettingsProvider>
                              </FlipbookSettingsProvider>
                            </ViewModeProvider>
                          </PermissionRoute>
                        }>
                          <Route index element={<Customize />} />
                        </Route>

                        <Route path="/create" element={
                          <PermissionRoute requiredPermission="createDropdown">
                            <ScratchAppLayout />
                          </PermissionRoute>
                        }>
                          <Route index element={<FlipbookFromScratch />} />
                        </Route>


                        <Route path="/admin-editor/:id" element={
                          <PermissionRoute>
                            <ViewModeProvider>
                              <AdminEditorAppLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
                            </ViewModeProvider>
                          </PermissionRoute>
                        }>
                          <Route index element={<Editor />} />
                        </Route>

                        <Route path="/editor/:id" element={
                          <PermissionRoute requiredPermission="flipbookEdit">
                            <ViewModeProvider>
                              <FlipbookSettingsProvider>
                                <ShopSettingsProvider>
                                  <EditorAppLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
                                </ShopSettingsProvider>
                              </FlipbookSettingsProvider>
                            </ViewModeProvider>
                          </PermissionRoute>
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
            </FileUploadProvider>
          }
        />
        {/* 404 Catch-all for public routes */}
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </AuthProvider>
  );
}