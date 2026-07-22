import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import GlowCard from './GlowCard';

export default function UsageChart({ usedGB, totalGB }) {
  const unlimited = totalGB === null || totalGB === undefined;
  const remaining = unlimited ? null : Math.max(totalGB - usedGB, 0);
  const percent = unlimited ? 0 : totalGB > 0 ? Math.min((usedGB / totalGB) * 100, 100) : 0;

  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setDisplay(unlimited ? 100 : percent));
    return () => cancelAnimationFrame(raf);
  }, [percent, unlimited]);

  return (
    <GlowCard className="p-6 flex flex-col sm:flex-row items-center gap-8">
      <Box sx={{ position: 'relative', display: 'inline-flex', flexShrink: 0 }}>
        <CircularProgress
          variant="determinate"
          value={100}
          size={148}
          thickness={4}
          sx={{ color: 'rgba(250,250,250,0.06)', position: 'absolute' }}
        />
        <svg width="0" height="0">
          <defs>
            <linearGradient id="usageGradientRu" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
        </svg>
        <CircularProgress
          variant="determinate"
          value={display}
          size={148}
          thickness={4}
          sx={{
            color: 'transparent',
            '& .MuiCircularProgress-circle': {
              stroke: 'url(#usageGradientRu)',
              strokeLinecap: 'round',
              transition: 'stroke-dashoffset 900ms cubic-bezier(0.4, 0, 0.2, 1)'
            }
          }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: '1.5rem', color: '#FAFAFA', lineHeight: 1 }}>
            {unlimited ? '∞' : `${percent.toFixed(0)}%`}
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(250,250,250,0.5)' }}>
            {unlimited ? 'Безлимит' : 'Использовано'}
          </Typography>
        </Box>
      </Box>

      <div className="flex flex-col gap-3 w-full">
        <Note color="#3B82F6" label="Использовано" value={`${usedGB.toFixed(1)} ГБ`} />
        <Note
          color="#06B6D4"
          label="Осталось"
          value={unlimited ? 'Безлимит' : `${remaining.toFixed(1)} ГБ`}
        />
        <Note color="#8B5CF6" label="Всего" value={unlimited ? 'Безлимит' : `${totalGB.toFixed(1)} ГБ`} />
      </div>
    </GlowCard>
  );
}

function Note({ color, label, value }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white/[0.03] px-4 py-2.5">
      <div className="flex items-center gap-2.5">
        <span className="h-2 w-2 rounded-full" style={{ background: color }} />
        <Typography variant="body2" sx={{ color: 'rgba(250,250,250,0.7)' }}>
          {label}
        </Typography>
      </div>
      <Typography variant="body2" sx={{ fontWeight: 600, color: '#FAFAFA' }}>
        {value}
      </Typography>
    </div>
  );
}
