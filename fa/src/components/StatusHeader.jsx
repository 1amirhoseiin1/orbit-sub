import { Avatar, Typography, Chip } from '@mui/material';
import GlowCard from './GlowCard';

function initialsOf(name) {
  return name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join('');
}

function formatExpiry(iso) {
  if (!iso) return 'نامحدود';
  const d = new Date(iso);
  return new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(d);
}

function daysLeft(iso) {
  if (!iso) return null;
  const diff = new Date(iso).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default function StatusHeader({ user, expiresAt }) {
  const isActive = user.status === 'active';
  const left = daysLeft(expiresAt);

  return (
    <GlowCard className="p-6 flex items-center justify-between flex-wrap gap-4">
      <div className="flex items-center gap-4">
        <div
          className="rounded-full p-[2px]"
          style={{
            background: isActive
              ? 'conic-gradient(from 0deg, #3B82F6, #8B5CF6, #06B6D4, #3B82F6)'
              : 'rgba(255,255,255,0.12)'
          }}
        >
          <Avatar
            sx={{
              width: 56,
              height: 56,
              fontWeight: 700,
              background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
              color: '#FAFAFA',
              border: '2px solid #18181B'
            }}
          >
            {initialsOf(user.name)}
          </Avatar>
        </div>

        <div>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#FAFAFA', lineHeight: 1.3 }}>
            {user.name}
          </Typography>
          <Chip
            size="small"
            icon={
              isActive ? (
                <span className="relative flex h-2 w-2 ml-1">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                </span>
              ) : undefined
            }
            label={isActive ? 'فعال' : 'غیرفعال'}
            sx={{
              mt: 0.5,
              height: 22,
              fontSize: '0.72rem',
              fontWeight: 600,
              bgcolor: isActive ? 'rgba(34,197,94,0.14)' : 'rgba(239,68,68,0.14)',
              color: isActive ? '#4ADE80' : '#F87171',
              border: '1px solid',
              borderColor: isActive ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)',
              '& .MuiChip-icon': { marginInlineStart: '8px', marginInlineEnd: '-2px' }
            }}
          />
        </div>
      </div>

      <div className="text-left sm:text-right">
        <Typography variant="caption" sx={{ color: 'rgba(250,250,250,0.5)' }}>
          تاریخ انقضا
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 600, color: '#FAFAFA' }}>
          {formatExpiry(expiresAt)}
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: left !== null && left <= 5 ? '#F87171' : 'rgba(250,250,250,0.5)' }}
        >
          {left === null ? 'بدون محدودیت زمانی' : left > 0 ? `${left} روز باقی مانده` : 'منقضی شده'}
        </Typography>
      </div>
    </GlowCard>
  );
}
