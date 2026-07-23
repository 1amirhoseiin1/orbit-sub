import { Typography } from '@mui/material';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { QRCodeSVG } from 'qrcode.react';
import GlowCard from './GlowCard';
import IconActionButton from './IconActionButton';
import { useClipboard } from '../hooks/useClipboard';

export default function ShareLink({ url }) {
  const [copied, copy] = useClipboard();

  return (
    <GlowCard className="p-6 flex flex-col sm:flex-row items-center gap-6">
      <div className="rounded-xl bg-white p-3 shrink-0">
        <QRCodeSVG value={url} size={104} bgColor="#ffffff" fgColor="#09090B" level="M" />
      </div>

      <div className="flex-1 w-full min-w-0">
        <Typography variant="subtitle2" sx={{ color: 'rgba(250,250,250,0.5)', mb: 1 }}>
          لینک اشتراک شما
        </Typography>

        <Typography variant="caption" sx={{ color: 'rgba(250,250,250,0.45)', display: 'block', mb: 1.5 }}>
          این یک لینک است، نه یک کانفیگ تکی؛ همه‌ی سرورهای پایین این صفحه را
          یک‌جا شامل می‌شود. آن را در اپلیکیشنی مثل V2rayNG، Hiddify یا
          Streisand با گزینه‌ی «افزودن از لینک» (Add from URL) وارد کنید، یا
          همین QR را با دوربین اپلیکیشن اسکن کنید تا کانفیگ‌ها خودکار اضافه و
          در آینده به‌روزرسانی شوند.
        </Typography>

        <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-black/30 px-3 py-2.5">
          <Typography
            variant="body2"
            sx={{
              color: '#FAFAFA',
              fontFamily: 'monospace',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              flex: 1,
              direction: 'ltr',
              textAlign: 'left'
            }}
          >
            {url}
          </Typography>

          <IconActionButton
            icon={copied ? <CheckRoundedIcon /> : <ContentCopyRoundedIcon />}
            tooltip={copied ? 'کپی شد' : 'کپی لینک'}
            tint="blue"
            success={copied}
            onClick={() => copy(url)}
            ariaLabel="کپی لینک اشتراک"
          />
        </div>
      </div>
    </GlowCard>
  );
}
