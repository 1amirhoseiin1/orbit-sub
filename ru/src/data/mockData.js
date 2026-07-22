// Stand-in for whatever your backend returns. Shape it to match your
// real API and swap the import in App.jsx for a fetch call.

export const user = {
  name: 'Иван Петров',
  status: 'active', // 'active' | 'inactive'
  expiresAt: '2026-11-04T00:00:00Z'
};

export const subscription = {
  totalGB: 100,
  usedGB: 63.4,
  shareUrl: 'https://panel.example.com/sub/8f2c1a9e-4b3d-4f7e-9c1a-2e5d6f8a9b0c'
};

export const configs = [
  {
    id: 'cfg-de-01',
    name: 'Германия - Франкфурт',
    flag: '🇩🇪',
    protocol: 'VLESS',
    uri: 'vless://8f2c1a9e-4b3d@de-fra-01.example.net:443?security=tls&type=ws#DE-Frankfurt-01'
  },
  {
    id: 'cfg-nl-01',
    name: 'Нидерланды - Амстердам',
    flag: '🇳🇱',
    protocol: 'VMess',
    uri: 'vmess://eyJhZGQiOiJubC1hbXMtMDEuZXhhbXBsZS5uZXQiLCJwb3J0IjoiNDQzIn0='
  },
  {
    id: 'cfg-tr-01',
    name: 'Турция - Стамбул',
    flag: '🇹🇷',
    protocol: 'Trojan',
    uri: 'trojan://p4ssw0rd@tr-ist-01.example.net:443?sni=cdn.example.net#TR-Istanbul-01'
  },
  {
    id: 'cfg-us-01',
    name: 'США - Нью-Йорк',
    flag: '🇺🇸',
    protocol: 'VLESS',
    uri: 'vless://8f2c1a9e-4b3d@us-nyc-01.example.net:2096?security=tls&type=grpc#US-NewYork-01'
  },
  {
    id: 'cfg-fi-01',
    name: 'Финляндия - Хельсинки',
    flag: '🇫🇮',
    protocol: 'Shadowsocks',
    uri: 'ss://Y2hhY2hhMjAtaWV0Zi1wb2x5MTMwNTpwNHNzdzByZA==@fi-hel-01.example.net:8443#FI-Helsinki-01'
  }
];
