import { user as mockUser, subscription as mockSubscription, configs as mockConfigs } from './mockData';

const BYTES_PER_GB = 1024 ** 3;

// Rough country lookup for turning a config's remark into a flag emoji.
// Admins name servers however they like, so this is best-effort: it
// matches on country name/code fragments commonly seen in remarks, in
// both English and Russian.
const COUNTRY_FLAGS = [
  [['germany', 'deutschland', 'германия', 'герман', ' de-', '-de', ' de '], '🇩🇪'],
  [['netherlands', 'holland', 'нидерланды', 'голланд', ' nl-', '-nl'], '🇳🇱'],
  [['turkey', 'turkiye', 'турция', 'турц', ' tr-', '-tr'], '🇹🇷'],
  [['united states', 'usa', 'сша', 'америк', ' us-', '-us'], '🇺🇸'],
  [['finland', 'финляндия', 'финлянд', ' fi-', '-fi'], '🇫🇮'],
  [['france', 'франция', 'франц', ' fr-', '-fr'], '🇫🇷'],
  [['united kingdom', 'britain', 'великобритания', 'англия', ' uk-', '-uk', ' gb-'], '🇬🇧'],
  [['iran', 'иран', ' ir-', '-ir'], '🇮🇷'],
  [['emirates', 'dubai', 'эмираты', 'дубай', ' ae-', '-ae'], '🇦🇪'],
  [['singapore', 'сингапур', ' sg-', '-sg'], '🇸🇬'],
  [['japan', 'япония', ' jp-', '-jp'], '🇯🇵'],
  [['korea', 'корея', ' kr-', '-kr'], '🇰🇷'],
  [['canada', 'канада', ' ca-', '-ca'], '🇨🇦'],
  [['sweden', 'швеция', ' se-', '-se'], '🇸🇪'],
  [['poland', 'польша', ' pl-', '-pl'], '🇵🇱'],
  [['romania', 'румыния', ' ro-', '-ro'], '🇷🇴'],
  [['austria', 'австрия', ' at-', '-at'], '🇦🇹'],
  [['switzerland', 'швейцария', ' ch-', '-ch'], '🇨🇭'],
  [['russia', 'россия', 'росси', ' ru-', '-ru'], '🇷🇺'],
  [['india', 'индия', ' in-', '-in'], '🇮🇳'],
  [['australia', 'австралия', ' au-', '-au'], '🇦🇺'],
  [['brazil', 'бразилия', ' br-', '-br'], '🇧🇷'],
  [['hong kong', ' hk-', '-hk'], '🇭🇰'],
  [['ireland', ' ie-', '-ie'], '🇮🇪']
];

// crude emoji-presence check so we don't double up a flag that's
// already baked into the remark by whoever configured the node
function containsEmoji(str) {
  return /\p{Extended_Pictographic}/u.test(str);
}

function guessFlag(remark) {
  if (!remark) return '🌐';
  if (containsEmoji(remark)) return null; // remark already carries its own icon
  const lower = ` ${remark.toLowerCase()} `;
  for (const [keywords, flag] of COUNTRY_FLAGS) {
    if (keywords.some((k) => lower.includes(k))) return flag;
  }
  return '🌐';
}

function protocolOf(uri) {
  const scheme = uri.split('://')[0]?.toLowerCase();
  const map = {
    vless: 'VLESS',
    vmess: 'VMess',
    trojan: 'Trojan',
    ss: 'Shadowsocks',
    hysteria2: 'Hysteria2',
    hy2: 'Hysteria2',
    tuic: 'TUIC'
  };
  return map[scheme] ?? scheme?.toUpperCase() ?? 'Config';
}

function remarkOf(uri) {
  const hashIndex = uri.indexOf('#');
  if (hashIndex === -1) return uri.split('://')[0];
  try {
    return decodeURIComponent(uri.slice(hashIndex + 1));
  } catch {
    return uri.slice(hashIndex + 1);
  }
}

function parseLinks(links) {
  return links.filter(Boolean).map((uri, i) => {
    const remark = remarkOf(uri);
    const flag = guessFlag(remark);
    return {
      id: `cfg-${i}`,
      name: flag ? remark : remark, // remark already shown either way
      flag: flag ?? '', // '' means the emoji is already inside `name`
      protocol: protocolOf(uri),
      uri
    };
  });
}

// Reads the JSON island Marzban's Jinja2 template fills in at request
// time (see index.html). Returns null if it's missing or still holds
// unrendered `{{ }}` placeholders, e.g. when running `npm run dev`
// straight from Vite with no Marzban backend behind it.
function readInjectedData() {
  const el = document.getElementById('marzban-data');
  if (!el) return null;
  const raw = el.textContent.trim();
  if (!raw || raw.includes('{{') || raw.includes('{%')) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

// Marzban's subscription_url is sometimes relative ("/sub/xyz") depending
// on how SUB_DOMAIN / PROXY headers are configured on the server, so we
// always resolve it against the page's own origin before showing it.
function toAbsoluteUrl(maybeRelative) {
  if (!maybeRelative) return window.location.href;
  try {
    return new URL(maybeRelative, window.location.origin).toString();
  } catch {
    return maybeRelative;
  }
}

export function getPanelData() {
  const injected = readInjectedData();

  if (!injected) {
    return { user: mockUser, subscription: mockSubscription, configs: mockConfigs, isLive: false };
  }

  const expireSeconds = injected.expire; // unix seconds, or null for unlimited
  const dataLimitBytes = injected.dataLimit; // bytes, or null for unlimited

  return {
    user: {
      name: injected.username,
      status: injected.status === 'active' ? 'active' : 'inactive',
      expiresAt: expireSeconds ? new Date(expireSeconds * 1000).toISOString() : null
    },
    subscription: {
      totalGB: dataLimitBytes ? dataLimitBytes / BYTES_PER_GB : null,
      usedGB: (injected.usedTraffic ?? 0) / BYTES_PER_GB,
      shareUrl: toAbsoluteUrl(injected.subscriptionUrl)
    },
    configs: parseLinks(injected.links || []),
    isLive: true
  };
}
