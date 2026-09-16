import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { JobsPage } from './pages/public/JobsPage';
import { DriversPage } from './pages/public/DriversPage';
import { TransporterShowcasePage } from './pages/public/TransporterShowcasePage';
import { RoadsideAmenitiesPage } from './pages/public/RoadsideAmenitiesPage';
import { AboutPage } from './pages/public/AboutPage';
import { ContactPage } from './pages/public/ContactPage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';

// Driver Pages
import { DriverDashboard } from './pages/driver/DriverDashboard';
import { AppliedJobsPage } from './pages/driver/AppliedJobsPage';
import { DriverWelfarePage } from './pages/driver/DriverWelfarePage';
import { DriverProfilePage } from './pages/driver/DriverProfilePage';

// Transporter Pages
import { TransporterDashboard } from './pages/transporter/TransporterDashboard';
import { PostJobPage } from './pages/transporter/PostJobPage';
import { ManageJobsPage } from './pages/transporter/ManageJobsPage';
import { CandidatePipelinePage } from './pages/transporter/CandidatePipelinePage';
import { VerificationSuitePage } from './pages/transporter/VerificationSuitePage';

// CRM Pages
import { CrmDashboard } from './pages/crm/CrmDashboard';
import { CallQueuePage } from './pages/crm/CallQueuePage';
import { MatchmakingConsole } from './pages/crm/MatchmakingConsole';

// Master Admin Pages
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { PartnerDashboardPage } from './pages/admin/PartnerDashboardPage';
import { MatchmakingPage } from './pages/admin/MatchmakingPage';
import { UpdateRevenuePage } from './pages/admin/UpdateRevenuePage';
import { UserNotesPage } from './pages/admin/UserNotesPage';
import { DriverFulfillmentPage } from './pages/admin/DriverFulfillmentPage';
import { OEMBrandPage } from './pages/admin/OEMBrandPage';
import { OEMFilterPage } from './pages/admin/OEMFilterPage';
import { BannersPage } from './pages/admin/BannersPage';
import { MobilePopupsPage } from './pages/admin/MobilePopupsPage';
import { PopupBannersPage } from './pages/admin/PopupBannersPage';
import { IdCheckPage } from './pages/admin/IdCheckPage';
import { CourtVerificationsPage } from './pages/admin/CourtVerificationsPage';
import { CourtVerifTransporterPage } from './pages/admin/CourtVerifTransporterPage';
import { DavTransporterPage, PhysicalVerifTransporterPage } from './pages/admin/DavTransporterPage';
import { PollSurveyPage } from './pages/admin/PollSurveyPage';
import { CreateSurveyPage } from './pages/admin/CreateSurveyPage';
import { SubscriptionPlansPage, CreateSubscriptionPlanPage } from './pages/admin/SubscriptionPlansPage';
import { PopupMessagesPage, CallLogsTrackingPage } from './pages/admin/PopupMessagesPage';
import { PaymentAdminPage, CallbackRequestsPage } from './pages/admin/PaymentAdminPage';
import { NotificationsAdminPage, CareerAdminPage, InquiryAdminPage } from './pages/admin/NotificationsAdminPage';
import { TruckListingsPage, DriverManagementAdminPage } from './pages/admin/TruckListingsPage';
import { LeadsAdminPage, TransporterAdminPage } from './pages/admin/LeadsAdminPage';
import { DtsAdminPage, JobAdminPage, TeleChampAdminPage } from './pages/admin/DtsAdminPage';
import { VideoAdminPage, QuizAdminPage, BlogsAdminPage } from './pages/admin/VideoAdminPage';
import { AddDhabaPage } from './pages/admin/AddDhabaPage';
import { AddEmployeePage, EmployeeListPage, DepartmentsListPage } from './pages/admin/TeamMembersPage';
import { WhatsAppGroupsPage, CreateWhatsAppGroupPage } from './pages/admin/WhatsAppGroupsPage';
import { UserManagementPage } from './pages/admin/UserManagementPage';

// TruckMitr One Phase 1, 2, 3, 4 & 5 Components
import { LoginPage as OneLoginPage } from './pages/one/auth/LoginPage';
import { UsersPage as OneUsersPage } from './pages/one/admin/UsersPage';
import { RolesPermissionsPage as OneRolesPage } from './pages/one/admin/RolesPermissionsPage';
import { DriversPage as OneDriversPage } from './pages/operations/DriversPage';
import { TransportersPage as OneTransportersPage } from './pages/operations/TransportersPage';
import { MatchmakingPage as OneMatchmakingPage } from './pages/operations/MatchmakingPage';
import { PartnersPage as OnePartnersPage } from './pages/operations/PartnersPage';
import { CrmPage as OneCrmPage } from './pages/operations/CrmPage';
import { PayrollPage as OnePayrollPage } from './pages/people/PayrollPage';
import { EmployeesPage as OneEmployeesPage } from './pages/people/EmployeesPage';
import { AttendancePage as OneAttendancePage } from './pages/people/AttendancePage';
import { LeavePage as OneLeavePage } from './pages/people/LeavePage';
import { ExpensesPage as OneExpensesPage } from './pages/people/ExpensesPage';
import { AssetsPage as OneAssetsPage } from './pages/people/AssetsPage';
import { ApprovalsPage as OneApprovalsPage } from './pages/my-work/ApprovalsPage';
import { NotificationsPage as OneNotificationsPage } from './pages/my-work/NotificationsPage';
import { TasksPage as OneTasksPage } from './pages/my-work/TasksPage';
import { AuditLogsPage as OneAuditLogsPage } from './pages/admin/AuditLogsPage';
import { WorkflowsPage as OneWorkflowsPage } from './pages/admin/WorkflowsPage';
import { DriverKiAwaazPage as OneDriverKiAwaazPage } from './pages/operations/DriverKiAwaazPage';
import { RevenuePage as OneRevenuePage } from './pages/business/RevenuePage';
import { GrowthAnalyticsPage as OneGrowthAnalyticsPage } from './pages/business/GrowthAnalyticsPage';
import { ReportsPage as OneReportsPage } from './pages/business/ReportsPage';
import { SettingsPage as OneSettingsPage } from './pages/admin/SettingsPage';
import { ProtectedRoute } from './components/guards/ProtectedRoute';
import { OneLayout } from './components/layout/OneLayout';
import { RoleDashboardRouter } from './pages/dashboard/RoleDashboardRouter';



// Layout Wrapper for Public Site
const PublicLayout = ({ children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Navbar />
    <main style={{ flex: 1 }}>{children}</main>
    <Footer />
  </div>
);

export const App = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
      <Route path="/jobs" element={<PublicLayout><JobsPage /></PublicLayout>} />
      <Route path="/drivers" element={<PublicLayout><DriversPage /></PublicLayout>} />
      <Route path="/fleet" element={<PublicLayout><TransporterShowcasePage /></PublicLayout>} />
      <Route path="/amenities" element={<PublicLayout><RoadsideAmenitiesPage /></PublicLayout>} />
      <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
      <Route path="/privacy-policy" element={<PublicLayout><AboutPage /></PublicLayout>} />
      <Route path="/term-of-use" element={<PublicLayout><AboutPage /></PublicLayout>} />
      <Route path="/login" element={<PublicLayout><LoginPage /></PublicLayout>} />
      <Route path="/register" element={<PublicLayout><RegisterPage /></PublicLayout>} />

      {/* Driver Portal Routes */}
      <Route path="/driver/dashboard" element={<DriverDashboard />} />
      <Route path="/driver/applied-jobs" element={<AppliedJobsPage />} />
      <Route path="/driver/welfare" element={<DriverWelfarePage />} />
      <Route path="/driver/profile" element={<DriverProfilePage />} />
      <Route path="/driver/referrals" element={<DriverDashboard />} />

      {/* Transporter Portal Routes */}
      <Route path="/transporter/dashboard" element={<TransporterDashboard />} />
      <Route path="/transporter/post-job" element={<PostJobPage />} />
      <Route path="/transporter/manage-jobs" element={<ManageJobsPage />} />
      <Route path="/transporter/candidates" element={<CandidatePipelinePage />} />
      <Route path="/transporter/verification-suite" element={<VerificationSuitePage />} />

      {/* CRM Portal Routes */}
      <Route path="/crm/dashboard" element={<CrmDashboard />} />
      <Route path="/crm/calls" element={<CallQueuePage />} />
      <Route path="/crm/matchmaking" element={<MatchmakingConsole />} />

      {/* ========================================================= */}
      {/* Master Admin Panel Routes (Matching Full Sidebar) */}
      {/* ========================================================= */}
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
      <Route path="/admin/partner-dashboard" element={<PartnerDashboardPage />} />
      <Route path="/admin/matchmaking" element={<MatchmakingPage />} />
      <Route path="/admin/collection-by" element={<UpdateRevenuePage />} />
      <Route path="/admin/user-notes" element={<UserNotesPage />} />
      <Route path="/admin/driver-fulfillment" element={<DriverFulfillmentPage />} />

      {/* OEM Brand & Filters */}
      <Route path="/admin/brand" element={<OEMBrandPage />} />
      <Route path="/admin/budget" element={<OEMFilterPage />} />
      <Route path="/admin/fuel-type" element={<OEMFilterPage />} />
      <Route path="/admin/vehicle-application" element={<OEMFilterPage />} />
      <Route path="/admin/gvm" element={<OEMFilterPage />} />
      <Route path="/admin/vehicletype" element={<OEMFilterPage />} />
      <Route path="/admin/tyres-count" element={<OEMFilterPage />} />

      {/* Banners & Popups */}
      <Route path="/admin/banners" element={<BannersPage />} />
      <Route path="/admin/banners/create" element={<BannersPage />} />
      <Route path="/admin/mobile-popups" element={<MobilePopupsPage />} />
      <Route path="/admin/mobile-popups/create" element={<MobilePopupsPage />} />
      <Route path="/admin/popup-banners" element={<PopupBannersPage />} />
      <Route path="/admin/popup-banners/create" element={<PopupBannersPage />} />

      {/* Verifications */}
      <Route path="/admin/id-check" element={<IdCheckPage />} />
      <Route path="/admin/court-verifications" element={<CourtVerificationsPage />} />
      <Route path="/admin/court-verifications-by-transporter" element={<CourtVerifTransporterPage />} />
      <Route path="/admin/dav-verifications-by-transporter" element={<DavTransporterPage />} />
      <Route path="/admin/physical-verifications-by-transporter" element={<PhysicalVerifTransporterPage />} />

      {/* Polls, Subscriptions, Messages, Call Logs */}
      <Route path="/admin/poll-survey" element={<PollSurveyPage />} />
      <Route path="/admin/poll-survey/create" element={<CreateSurveyPage />} />
      <Route path="/admin/subscriptionplans" element={<SubscriptionPlansPage />} />
      <Route path="/admin/subscriptionplans/create" element={<CreateSubscriptionPlanPage />} />
      <Route path="/admin/popup-messages" element={<PopupMessagesPage />} />
      <Route path="/admin/popup-messages/create" element={<PopupMessagesPage />} />
      <Route path="/admin/call-logs/transporters" element={<CallLogsTrackingPage />} />
      <Route path="/admin/call-logs/drivers" element={<CallLogsTrackingPage />} />

      {/* Referral, Payment, Callbacks */}
      <Route path="/admin/referral-earn" element={<PartnerDashboardPage />} />
      <Route path="/admin/referrals" element={<PartnerDashboardPage />} />
      <Route path="/admin/payments-reward" element={<PaymentAdminPage />} />
      <Route path="/admin/callback-requests" element={<CallbackRequestsPage />} />

      {/* Notifications, Career, Inquiry */}
      <Route path="/admin/notifications" element={<NotificationsAdminPage />} />
      <Route path="/admin/notifications/create" element={<NotificationsAdminPage />} />
      <Route path="/admin/career" element={<CareerAdminPage />} />
      <Route path="/admin/career/create" element={<CareerAdminPage />} />
      <Route path="/admin/inquiry" element={<InquiryAdminPage />} />

      {/* Truck, Driver, Leads, Transporter, DTS */}
      <Route path="/admin/truck-vehicletype" element={<TruckListingsPage />} />
      <Route path="/admin/add-truck" element={<TruckListingsPage />} />
      <Route path="/admin/truck-list" element={<TruckListingsPage />} />
      <Route path="/admin/driver-list" element={<DriverManagementAdminPage />} />
      <Route path="/admin/driver_verifications" element={<DriverManagementAdminPage />} />
      <Route path="/admin/driver-hiring" element={<DriverManagementAdminPage />} />
      <Route path="/admin/tollfree" element={<LeadsAdminPage />} />
      <Route path="/admin/transporter" element={<TransporterAdminPage />} />
      <Route path="/admin/transporter-driver-verification" element={<TransporterAdminPage />} />
      <Route path="/admin/view-truck-institute" element={<DtsAdminPage />} />

      {/* Jobs */}
      <Route path="/admin/jobs" element={<JobAdminPage />} />
      <Route path="/admin/jobs-list" element={<JobAdminPage />} />
      <Route path="/admin/greenline-pending-jobs" element={<JobAdminPage />} />
      <Route path="/admin/greenline-submitted-jobs" element={<JobAdminPage />} />
      <Route path="/admin/active-jobs" element={<JobAdminPage />} />
      <Route path="/admin/inactive-jobs" element={<JobAdminPage />} />
      <Route path="/admin/expired-jobs" element={<JobAdminPage />} />
      <Route path="/admin/pending-for-approval-jobs" element={<JobAdminPage />} />
      <Route path="/admin/master-jobs" element={<JobAdminPage />} />

      {/* Tele Champ, Video, Quiz, Blogs, Dhaba, Team, WhatsApp */}
      <Route path="/admin/telechamp/dashboard" element={<TeleChampAdminPage />} />
      <Route path="/admin/telechamp/department" element={<TeleChampAdminPage />} />
      <Route path="/admin/module" element={<VideoAdminPage />} />
      <Route path="/admin/module-topic" element={<VideoAdminPage />} />
      <Route path="/admin/video" element={<VideoAdminPage />} />
      <Route path="/admin/health-hygiene" element={<VideoAdminPage />} />
      <Route path="/admin/driver-welfare" element={<VideoAdminPage />} />
      <Route path="/admin/add-quiz" element={<QuizAdminPage />} />
      <Route path="/admin/quiz" element={<QuizAdminPage />} />
      <Route path="/admin/blog-category" element={<BlogsAdminPage />} />
      <Route path="/admin/add-blog" element={<BlogsAdminPage />} />
      <Route path="/admin/blogs" element={<BlogsAdminPage />} />
      <Route path="/admin/add-dhaba" element={<AddDhabaPage />} />
      <Route path="/admin/add-employee" element={<AddEmployeePage />} />
      <Route path="/admin/employee" element={<EmployeeListPage />} />
      <Route path="/admin/department/list" element={<DepartmentsListPage />} />
      <Route path="/admin/whatsapp-groups" element={<WhatsAppGroupsPage />} />
      <Route path="/admin/whatsapp-groups/create" element={<CreateWhatsAppGroupPage />} />
      <Route path="/admin/users" element={<UserManagementPage />} />

      {/* ========================================================= */}
      {/* TruckMitr One Operating System Routes (Phase 1 & 2) */}
      {/* ========================================================= */}
      <Route path="/one/login" element={<OneLoginPage />} />
      <Route
        path="/one"
        element={
          <ProtectedRoute>
            <OneLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/one/dashboard" replace />} />
        <Route path="dashboard" element={<RoleDashboardRouter />} />
        <Route path="dashboard/:role" element={<RoleDashboardRouter />} />
        <Route path="drivers" element={<OneDriversPage />} />
        <Route path="transporters" element={<OneTransportersPage />} />
        <Route path="matchmaking" element={<OneMatchmakingPage />} />
        <Route path="partners" element={<OnePartnersPage />} />
        <Route path="crm" element={<OneCrmPage />} />
        <Route path="driver-ki-awaaz" element={<OneDriverKiAwaazPage />} />
        <Route path="revenue" element={<OneRevenuePage />} />
        <Route path="growth-analytics" element={<OneGrowthAnalyticsPage />} />
        <Route path="reports" element={<OneReportsPage />} />
        <Route path="payroll" element={<OnePayrollPage />} />
        <Route path="employees" element={<OneEmployeesPage />} />
        <Route path="attendance" element={<OneAttendancePage />} />
        <Route path="leaves" element={<OneLeavePage />} />
        <Route path="expenses" element={<OneExpensesPage />} />
        <Route path="assets" element={<OneAssetsPage />} />
        <Route path="tasks" element={<OneTasksPage />} />
        <Route path="approvals" element={<OneApprovalsPage />} />
        <Route path="notifications" element={<OneNotificationsPage />} />
        <Route path="audit-logs" element={<OneAuditLogsPage />} />
        <Route path="workflows" element={<OneWorkflowsPage />} />
        <Route path="users" element={<OneUsersPage />} />
        <Route path="roles" element={<OneRolesPage />} />
        <Route path="settings" element={<OneSettingsPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/one/dashboard" replace />} />
    </Routes>
  );
};


