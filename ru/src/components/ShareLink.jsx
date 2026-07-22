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
          Ваша ссылка подписки
        </Typography>

        <Typography variant="caption" sx={{ color: 'rgba(250,250,250,0.45)', display: 'block', mb: 1.5 }}>
          Это не отдельная конфигурация, а ссылка на подписку - она включает
          все серверы ниже на этой странице. Добавьте её в приложение вроде
          V2rayNG, Hiddify или Streisand через опцию «Добавить по ссылке»
          (Add from URL), либо отсканируйте этот QR-код камерой приложения,
          чтобы конфигурации добавились автоматически и обновлялись в будущем.
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
              flex: 1
            }}
          >
            {url}
          </Typography>

          <IconActionButton
            icon={copied ? <CheckRoundedIcon /> : <ContentCopyRoundedIcon />}
            tooltip={copied ? 'Скопировано' : 'Копировать ссылку'}
            tint="blue"
            success={copied}
            onClick={() => copy(url)}
            ariaLabel="Копировать ссылку подписки"
          />
        </div>
      </div>
    </GlowCard>
  );
}
