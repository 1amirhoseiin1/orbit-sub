import { useState } from 'react';
import { Typography, Popover, Chip } from '@mui/material';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import QrCode2RoundedIcon from '@mui/icons-material/QrCode2Rounded';
import { QRCodeSVG } from 'qrcode.react';
import { useClipboard } from '../hooks/useClipboard';
import Emoji from './Emoji';
import IconActionButton from './IconActionButton';

const protocolColor = {
  VLESS: '#3B82F6',
  VMess: '#8B5CF6',
  Trojan: '#06B6D4',
  Shadowsocks: '#3B82F6'
};

export default function ConfigItem({ config }) {
  const [copied, copy] = useClipboard();
  const [anchorEl, setAnchorEl] = useState(null);
  const openQr = (e) => setAnchorEl(e.currentTarget);
  const closeQr = () => setAnchorEl(null);

  return (
    <div
      className="flex items-center gap-3 rounded-xl border border-transparent bg-white/[0.03]
        px-4 py-3 transition-colors duration-200 hover:border-accent-blue/30 hover:bg-white/[0.05]"
    >
      {config.flag && (
        <span className="text-2xl leading-none" role="img" aria-label={config.name}>
          <Emoji size={22}>{config.flag}</Emoji>
        </span>
      )}

      <div className="flex-1 min-w-0">
        <Typography
          variant="body2"
          sx={{ color: '#FAFAFA', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          <Emoji size={18}>{config.name}</Emoji>
        </Typography>
        <Chip
          label={config.protocol}
          size="small"
          sx={{
            height: 18,
            fontSize: '0.65rem',
            mt: 0.3,
            bgcolor: `${protocolColor[config.protocol] ?? '#3B82F6'}22`,
            color: protocolColor[config.protocol] ?? '#3B82F6',
            fontWeight: 600
          }}
        />
      </div>

      <IconActionButton
        icon={<QrCode2RoundedIcon />}
        tooltip="نمایش QR"
        tint="violet"
        onClick={openQr}
        ariaLabel={`نمایش QR برای ${config.name}`}
      />

      <IconActionButton
        icon={copied ? <CheckRoundedIcon /> : <ContentCopyRoundedIcon />}
        tooltip={copied ? 'کپی شد' : 'کپی کانفیگ'}
        tint="blue"
        success={copied}
        onClick={() => copy(config.uri)}
        ariaLabel={`کپی کانفیگ ${config.name}`}
      />

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={closeQr}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        slotProps={{
          paper: {
            sx: {
              bgcolor: '#18181B',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px',
              p: 2,
              mt: 1
            }
          }
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="rounded-lg bg-white p-2.5">
            <QRCodeSVG value={config.uri} size={140} bgColor="#ffffff" fgColor="#09090B" level="M" />
          </div>
          <Typography variant="caption" sx={{ color: 'rgba(250,250,250,0.5)' }}>
            {config.flag && <Emoji size={16}>{config.flag}</Emoji>} {config.name}
          </Typography>
        </div>
      </Popover>
    </div>
  );
}
