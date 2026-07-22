import { useState } from 'react';
import { Typography, Tooltip } from '@mui/material';
import GlowCard from './GlowCard';
import { useClipboard } from '../hooks/useClipboard';
import streisandIcon from '../assets/app-icons/streisand.png';
import v2rayngIcon from '../assets/app-icons/v2rayng.png';
import v2boxIcon from '../assets/app-icons/v2box.png';
import v2raytunIcon from '../assets/app-icons/v2raytun.png';
import happIcon from '../assets/app-icons/happ.png';

// Deep link formats confirmed from each app's own docs/changelog:
// - v2rayNG: github.com/2dust/v2rayNG (install-config?url=)
// - V2Box: App Store changelog ("Fix install-config scheme import")
// - V2RayTun: docs.v2raytun.com/deep-link (import/{link})
// - Happ: happ.su docs + community sub-page templates (add/{link})
// - Streisand: not on their own marketing site, but it follows the same
//   import/{link}#{name} shape as its sibling apps above, so it's wired
//   the same way. Clipboard copy stays as a fallback for every app in
//   case a particular version doesn't pick the deep link up.
const APPS = [
  {
    id: 'streisand',
    label: 'Streisand',
    icon: streisandIcon,
    buildLink: (url, name) => `streisand://import/${encodeURIComponent(url)}#${encodeURIComponent(name)}`,
    note: 'Если Streisand установлен, подписка добавится автоматически. Если нет - ссылка уже скопирована, используйте + и «Import from Clipboard».'
  },
  {
    id: 'v2rayng',
    label: 'V2rayNG',
    icon: v2rayngIcon,
    buildLink: (url, name) => `v2rayng://install-config?url=${encodeURIComponent(url)}#${encodeURIComponent(name)}`,
    note: 'Если V2rayNG установлен, подписка добавится автоматически.'
  },
  {
    id: 'v2box',
    label: 'V2Box',
    icon: v2boxIcon,
    buildLink: (url) => `v2box://install-config?url=${encodeURIComponent(url)}`,
    note: 'Если V2Box установлен, подписка добавится автоматически.'
  },
  {
    id: 'v2raytun',
    label: 'V2RayTun',
    icon: v2raytunIcon,
    buildLink: (url, name) => `v2raytun://import/${url}#${encodeURIComponent(name)}`,
    note: 'Если V2RayTun установлен, подписка добавится автоматически.'
  },
  {
    id: 'happ',
    label: 'Happ',
    icon: happIcon,
    buildLink: (url) => `happ://add/${url}`,
    note: 'Если Happ установлен, подписка добавится автоматически.'
  }
];

export default function QuickAddBox({ subscriptionUrl, subscriptionName = 'Subscription' }) {
  const [copied, copy] = useClipboard(3000);
  const [activeNote, setActiveNote] = useState('');

  const handleClick = (app) => {
    copy(subscriptionUrl);
    setActiveNote(app.note);
    window.location.href = app.buildLink(subscriptionUrl, subscriptionName);
  };

  return (
    <GlowCard className="p-6">
      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#FAFAFA', mb: 0.5 }}>
        Быстрое добавление в приложение
      </Typography>
      <Typography variant="caption" sx={{ color: 'rgba(250,250,250,0.45)', display: 'block', mb: 2 }}>
        Нажмите на значок приложения - ссылка подписки скопируется и откроется приложение.
      </Typography>

      <div className="flex flex-wrap gap-3">
        {APPS.map((app) => (
          <Tooltip key={app.id} title={app.note}>
            <button
              onClick={() => handleClick(app)}
              aria-label={`Быстро добавить в ${app.label}`}
              className="flex flex-col items-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.03]
                px-4 py-3 transition-all duration-200 hover:border-accent-blue/40 hover:bg-white/[0.06]
                hover:-translate-y-0.5 active:translate-y-0"
            >
              <span className="h-10 w-10 overflow-hidden rounded-[10px]">
                <img src={app.icon} alt="" className="h-full w-full object-cover" />
              </span>
              <span className="text-xs text-white/80">{app.label}</span>
            </button>
          </Tooltip>
        ))}
      </div>

      {(copied || activeNote) && (
        <Typography variant="caption" sx={{ display: 'block', mt: 2, color: '#4ADE80' }}>
          {copied ? 'Ссылка скопирована. ' : ''}
          {activeNote}
        </Typography>
      )}
    </GlowCard>
  );
}
