# POA Eco Hostel

Site público do POA Eco Hostel, pronto para importação no Lovable.

## Conectores

Os destinos de Booking, reservas diretas, WhatsApp, Google Maps, Instagram e e-mail estão centralizados em [`app/connectors.ts`](app/connectors.ts) e também disponíveis em [`public/lovable-connectors.json`](public/lovable-connectors.json).

No preview, os CTAs externos ficam sem redirecionamento. O Lovable pode localizar cada ação pelo atributo `data-lovable-connector` e conectar o destino correspondente no manifesto JSON.

## Desenvolvimento

```bash
npm install
npm run dev
```

Validação sem build local:

```bash
npm run preflight:ci
```
