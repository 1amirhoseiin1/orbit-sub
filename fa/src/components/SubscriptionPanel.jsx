import { Typography } from '@mui/material';
import StatusHeader from './StatusHeader';
import UsageChart from './UsageChart';
import ShareLink from './ShareLink';
import QuickAddBox from './QuickAddBox';
import ConfigList from './ConfigList';
import SplitText from './SplitText';

export default function SubscriptionPanel({ user, subscription, configs }) {
  return (
    <div className="relative z-10 mx-auto w-full max-w-3xl px-4 py-10 sm:py-16 flex flex-col gap-5">
      <div>
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#FAFAFA' }}>
          <SplitText text="پنل اشتراک" splitType="words" delay={70} duration={0.7} />
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(250,250,250,0.5)' }}>
          وضعیت حساب، مصرف حجم و کانفیگ‌های شما
        </Typography>
      </div>

      <div className="animate-list-in" style={{ animationDelay: '20ms' }}>
        <StatusHeader user={user} expiresAt={user.expiresAt} />
      </div>

      <div className="animate-list-in" style={{ animationDelay: '80ms' }}>
        <UsageChart usedGB={subscription.usedGB} totalGB={subscription.totalGB} />
      </div>
      <div className="animate-list-in" style={{ animationDelay: '140ms' }}>
        <ShareLink url={subscription.shareUrl} />
      </div>
      <div className="animate-list-in" style={{ animationDelay: '200ms' }}>
        <QuickAddBox subscriptionUrl={subscription.shareUrl} subscriptionName={user.name} />
      </div>
      <div className="animate-list-in" style={{ animationDelay: '260ms' }}>
        <ConfigList configs={configs} />
      </div>
    </div>
  );
}
