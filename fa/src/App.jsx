import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import AmbientBackground from './components/AmbientBackground';
import SubscriptionPanel from './components/SubscriptionPanel';
import { getPanelData } from './data/marzbanAdapter';

// getPanelData reads the JSON Marzban injects into index.html at
// request time; if that's missing (e.g. local dev) it hands back the
// mock data from src/data/mockData.js instead. Either way the panel
// below doesn't need to know or care which one it got.
export default function App() {
  const { user, subscription, configs } = getPanelData();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AmbientBackground />
      <SubscriptionPanel user={user} subscription={subscription} configs={configs} />
    </ThemeProvider>
  );
}
