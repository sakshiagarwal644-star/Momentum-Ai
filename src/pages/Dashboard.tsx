import TopNav from '../components/dashboard/TopNav';
import WelcomeHeader from '../components/dashboard/WelcomeHeader';
import SummaryTiles from '../components/dashboard/SummaryTiles';
import QuickActions from '../components/dashboard/QuickActions';
import AISuggestionsPanel from '../components/dashboard/AISuggestionsPanel';
import WeeklyCalendarStrip from '../components/dashboard/WeeklyCalendarStrip';
import RecentContent from '../components/dashboard/RecentContent';
import UploadClips from '../components/dashboard/UploadClips';
import ProfileSidebar from '../components/dashboard/ProfileSidebar';
import DashboardFooter from '../components/dashboard/DashboardFooter';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#F6F9F8]">
      <TopNav />

      <div className="pt-24 pb-8 px-6 lg:px-8">
        <div className="max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            <div className="xl:col-span-9">
              <WelcomeHeader />
              <SummaryTiles />
              <QuickActions />
              <AISuggestionsPanel />
              <WeeklyCalendarStrip />
              <RecentContent />
              <UploadClips />
              <DashboardFooter />
            </div>

            <div className="xl:col-span-3">
              <div className="xl:sticky xl:top-24">
                <ProfileSidebar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
