import { Navigate, Route, Routes, useLocation } from "react-router-dom";
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
import AdminTemplatesPage from "./pages/AdminTemplatesPage";

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
import { useEffect, useState } from "react";
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
import { WorkspaceExpirationRoute } from "./Middleware/WorkspaceExpirationRoute";
import EmbedFlipbook from "./embed/EmbedFlipbook";
import EmbedBookShelf from "./embed/EmbedBookShelf";
import { Success } from "./pages/Settings/payment/success";
import { Cancel } from "./pages/Settings/payment/cancel";
import { initCrisp } from "./crisp";
import { Crisp } from "crisp-sdk-web";
import ExpireAccount from "./pages/ExpireAccount";
import { ResolveDomainApi } from "./service/custom.domain.service";


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
  { path: "workspace", element: <SettingWorkspace />, permission: "settings" },
  // { path: "general", element: <SettingGeneral /> },
  { path: "billing/subscription", element: <SettingBillingSubscription />, permission: "billing" },
  { path: "billing/invoice", element: <SettingBillingInvoices />, permission: "billing" },
  { path: "teammates", element: <SettingTeammates />, permission: "invite_teammate" },
  { path: "readers", element: <SettingReaders />, permission: "settings" },
  { path: "groups", element: <SettingGroups />, permission: "settings" },
  // { path: "sso", element: <SettingSingleSignOn /> },
  // { path: "integrations", element: <SettingIntegrations /> },
  // { path: "access", element: <SettingWorkspaceAccess /> },
  { path: "logs", element: <SettingTeammateActivity />, permission: "settings" },
  // { path: "permission-settings", element: <SettingPermission />, permission: "settings" },
  // { path: "email-provider", element: <SettingEmailProvider /> },
];

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [domainInfo, setDomainInfo] = useState(null);
  const [domainLoading, setDomainLoading] = useState(true);
  const [domainError, setDomainError] = useState(null);
  const apiCounter = useApiCounterStore((state) => state.counter);
  const location = useLocation();

  useEffect(() => {
    const disallowedRoutes = [
      '/public-flipbook',
      '/embed-flipbook',
      '/public-bookshelf',
      '/embed-bookshelf',
      '/profile',
      '/customize'
    ];

    const shouldShowCrisp = !disallowedRoutes.some(route => location.pathname.startsWith(route));

    if (shouldShowCrisp) {
      initCrisp();
      if (window.$crisp) {
        Crisp.chat.show();
      }
    } else {
      if (window.$crisp) {
        Crisp.chat.hide();
      }
    }

    // Apply offset for mobile on dashboard routes
    const offsetRoutes = ['/myflipbooks', '/statistics', '/branding', '/settings'];
    const shouldApplyOffset = offsetRoutes.some(route => location.pathname.startsWith(route));

    if (shouldApplyOffset) {
      document.body.classList.add('crisp-offset');
    } else {
      document.body.classList.remove('crisp-offset');
    }
  }, [location.pathname]);

  useEffect(() => {
    const checkDomain = async () => {
      const host = window.location.host.split(":")[0].toLowerCase();
      const SYSTEM_DOMAINS = ["flipdrag.com", "app.flipdrag.com", "www.flipdrag.com", "localhost", "127.0.0.1", "api.flipdrag.com"];

      if (!SYSTEM_DOMAINS.includes(host)) {
        try {
          const res = await ResolveDomainApi();
          if (res.success) {
            setDomainInfo(res.data);
          }
        } catch (err) {
          console.error("Domain resolution failed", err);
          setDomainError(err.message || "Failed to resolve domain");
        }
      } else {
        setDomainInfo({ isCustom: false, isSystemDomain: true, isPathAllowed: true });
      }
      setDomainLoading(false);
    };
    checkDomain();
  }, [location.pathname]);

  if (domainLoading) return <Loader />;

  if (domainError && !domainInfo) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-screen p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Domain Error</h1>
        <p className="text-gray-600 mb-8">{domainError}</p>
        <div className="text-sm text-gray-400">
          Powered by <span className="font-semibold">FlipDrag</span>
        </div>
      </div>
    );
  }

  // If on a custom domain and the path is NOT allowed (not a public route or valid slug)
  if (domainInfo?.isCustom && !domainInfo?.isPathAllowed) {
    // Only redirect if we are NOT already on the target profile page to avoid loops
    const targetPath = `/profile/${domainInfo.workspaceId}`;
    if (location.pathname !== targetPath && domainInfo.workspaceId) {
      return <Navigate to={targetPath} replace />;
    } else if (!domainInfo.workspaceId) {
      // If we don't even have a workspace ID, something is wrong with the configuration
      return <NotFound404 />;
    }
  }

  // If hitting the root of a custom domain but no default flipbook is assigned
  if (domainInfo?.isCustom && location.pathname === "/" && !domainInfo?.mappedFlipbookId) {
    if (domainInfo.workspaceId) {
      return <Navigate to={`/profile/${domainInfo.workspaceId}`} replace />;
    }
  }

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
        <Route path="/embed-flipbook/:id" element={<EmbedFlipbook />} />
        <Route path="/public-bookshelf/:id" element={<PublicBookShelf />} />
        <Route path="/embed-bookshelf/:id" element={<EmbedBookShelf />} />
        <Route path="/profile/:id" element={<MyProfile />} />

        {/* Catch-all for custom domain resolved IDs - placed before private routes */}
        {domainInfo?.isCustom && domainInfo?.mappedFlipbookId && (
          <Route path="*" element={<PublicFlipbook idOverride={domainInfo.mappedFlipbookId} />} />
        )}

        {/* Private/protected routes (wrapped in providers) */}
        <Route
          path="*"
          element={
            <FileUploadProvider>
              <CurrencyProvider>
                <WorkspaceProvider>
                  <WorkspaceExpirationRoute>
                    {apiCounter > 0 && <Loader />}
                    <Routes>
                      {/* Default redirect */}
                      <Route path="/" element={<Navigate to="/myflipbooks" replace />} />

                      <Route path="/success/:sessionId" element={<PrivateRoute><Success /></PrivateRoute>} />
                      <Route path="/cancel" element={<PrivateRoute><Cancel /></PrivateRoute>} />
                      <Route path="/expire" element={<PrivateRoute><ExpireAccount /></PrivateRoute>} />


                      {/* Main content routes */}
                      <Route path="/myflipbooks" element={
                        <PrivateRoute>
                          <FlipbookProvider>
                            <FolderProvider>
                              <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
                            </FolderProvider>
                          </FlipbookProvider>
                        </PrivateRoute>
                      }>
                        <Route index element={<Navigate to="flipbooks" replace />} />
                        <Route path="flipbooks" element={<MyFlipbooks isSidebarOpen={isSidebarOpen} />} />
                        <Route path="flipbooks/folder/:id" element={<FolderFlipbooks isSidebarOpen={isSidebarOpen} />} />
                        <Route path="template" element={
                          <PermissionRoute requiredPermission="templates">
                            <MyFlipbooks isSidebarOpen={isSidebarOpen} />
                          </PermissionRoute>
                        } />
                        <Route path="template/folder/:id" element={
                          <PermissionRoute requiredPermission="templates">
                            <FolderFlipbooks isSidebarOpen={isSidebarOpen} />
                          </PermissionRoute>
                        } />
                        <Route path="shared-with-me" element={<SharedWithMe isSidebarOpen={isSidebarOpen} />} />
                        <Route path="admin-templates" element={<AdminTemplatesPage isSidebarOpen={isSidebarOpen} />} />
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
                          <FlipbookProvider>
                            <FolderProvider>
                              <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
                            </FolderProvider>
                          </FlipbookProvider>
                        </PermissionRoute>
                      }>
                        <Route index element={<AutomationContent />} />
                      </Route>

                      <Route path="/statistics" element={
                        <PermissionRoute requiredPermission="statistics">
                          <FlipbookProvider>
                            <FolderProvider>
                              <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
                            </FolderProvider>
                          </FlipbookProvider>
                        </PermissionRoute>
                      }>
                        <Route index element={<StatisticsContent />} />
                      </Route>

                      {/* Branding routes */}
                      <Route path="/branding" element={
                        <PermissionRoute requiredPermission="branding">
                          <FlipbookProvider>
                            <FolderProvider>
                              <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
                            </FolderProvider>
                          </FlipbookProvider>
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
                        <PermissionRoute requiredPermission="settings">
                          <FlipbookProvider>
                            <FolderProvider>
                              <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
                            </FolderProvider>
                          </FlipbookProvider>
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
                        <PermissionRoute requiredPermission="settings">
                          <FlipbookProvider>
                            <FolderProvider>
                              <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
                            </FolderProvider>
                          </FlipbookProvider>
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
                                <FlipbookProvider>
                                  <FolderProvider>
                                    <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
                                  </FolderProvider>
                                </FlipbookProvider>
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
                                <FlipbookProvider>
                                  <FolderProvider>
                                    <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
                                  </FolderProvider>
                                </FlipbookProvider>
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
                                <FlipbookProvider>
                                  <FolderProvider>
                                    <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
                                  </FolderProvider>
                                </FlipbookProvider>
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
                                <FlipbookProvider>
                                  <FolderProvider>
                                    <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
                                  </FolderProvider>
                                </FlipbookProvider>
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
                                <FlipbookProvider>
                                  <FolderProvider>
                                    <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
                                  </FolderProvider>
                                </FlipbookProvider>
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
                                <FlipbookProvider>
                                  <FolderProvider>
                                    <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
                                  </FolderProvider>
                                </FlipbookProvider>
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
                                <FlipbookProvider>
                                  <FolderProvider>
                                    <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
                                  </FolderProvider>
                                </FlipbookProvider>
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
                                <FlipbookProvider>
                                  <FolderProvider>
                                    <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
                                  </FolderProvider>
                                </FlipbookProvider>
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
                                <FlipbookProvider>
                                  <FolderProvider>
                                    <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
                                  </FolderProvider>
                                </FlipbookProvider>
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
                                <FlipbookProvider>
                                  <FolderProvider>
                                    <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
                                  </FolderProvider>
                                </FlipbookProvider>
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
                                <FlipbookProvider>
                                  <FolderProvider>
                                    <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
                                  </FolderProvider>
                                </FlipbookProvider>
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
                          <FlipbookProvider>
                            <FolderProvider>
                              <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
                            </FolderProvider>
                          </FlipbookProvider>
                        </PrivateRoute>
                      }>
                        <Route index element={<MyAccount />} />
                      </Route>
                      <Route path="/account/email-preferences" element={
                        <PrivateRoute>
                          <FolderProvider>
                            <AppLayout setIsSidebarOpen={setIsSidebarOpen} />
                          </FolderProvider>
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
                            <FlipbookSettingsProvider>
                              <ShopSettingsProvider>
                                <AdminEditorAppLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
                              </ShopSettingsProvider>
                            </FlipbookSettingsProvider>
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
                  </WorkspaceExpirationRoute>
                </WorkspaceProvider>
              </CurrencyProvider>
            </FileUploadProvider>
          }
        />
        {/* 404 Catch-all for public routes */}
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </AuthProvider>
  );
}