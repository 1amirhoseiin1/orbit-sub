import { useRef, useState, useCallback } from 'react';
import { Typography } from '@mui/material';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import GlowCard from './GlowCard';
import ConfigItem from './ConfigItem';
import IconActionButton from './IconActionButton';
import { useClipboard } from '../hooks/useClipboard';

const LONG_LIST_THRESHOLD = 6;

export default function ConfigList({ configs }) {
  const listRef = useRef(null);
  const [topFade, setTopFade] = useState(0);
  const [bottomFade, setBottomFade] = useState(1);
  const [copiedAll, copyAll] = useClipboard(2200);
  const scrollable = configs.length > LONG_LIST_THRESHOLD;

  const handleScroll = useCallback((e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    setTopFade(Math.min(scrollTop / 40, 1));
    const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
    setBottomFade(scrollHeight <= clientHeight ? 0 : Math.min(distanceFromBottom / 40, 1));
  }, []);

  const handleCopyAll = () => {
    copyAll(configs.map((c) => c.uri).join('\n'));
  };

  return (
    <GlowCard className="p-6">
      <div className="flex items-center justify-between mb-4 gap-3">
        <div className="flex items-center gap-2">
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#FAFAFA' }}>
            سرورهای پیکربندی
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(250,250,250,0.5)' }}>
            {configs.length} مورد
          </Typography>
        </div>

        <IconActionButton
          icon={copiedAll ? <CheckRoundedIcon /> : <ContentCopyRoundedIcon />}
          tooltip={copiedAll ? 'همه کپی شد' : 'کپی همه‌ی کانفیگ‌ها'}
          tint="blue"
          success={copiedAll}
          onClick={handleCopyAll}
          ariaLabel="کپی همه‌ی کانفیگ‌ها"
        />
      </div>

      <div className="relative">
        <div
          ref={listRef}
          onScroll={scrollable ? handleScroll : undefined}
          className={`flex flex-col gap-2 ${scrollable ? 'max-h-[420px] overflow-y-auto pr-1' : ''}`}
        >
          {configs.map((c, index) => (
            <div
              key={c.id}
              className="animate-list-in transition-transform duration-200 hover:scale-[1.01]"
              style={{ animationDelay: `${index * 55}ms` }}
            >
              <ConfigItem config={c} />
            </div>
          ))}
        </div>

        {scrollable && (
          <>
            <div
              className="pointer-events-none absolute top-0 left-0 right-0 h-8 rounded-t-lg"
              style={{
                opacity: topFade,
                background: 'linear-gradient(to bottom, rgba(24,24,27,0.9), transparent)',
                transition: 'opacity 150ms'
              }}
            />
            <div
              className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 rounded-b-lg"
              style={{
                opacity: bottomFade,
                background: 'linear-gradient(to top, rgba(24,24,27,0.9), transparent)',
                transition: 'opacity 150ms'
              }}
            />
          </>
        )}
      </div>
    </GlowCard>
  );
}
