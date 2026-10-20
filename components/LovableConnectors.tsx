"use client";

import { useEffect } from "react";
import { lovableConnectors, type LovableConnectorId } from "../app/connectors";

const connectorEntries = Object.entries(lovableConnectors) as Array<[LovableConnectorId, string]>;

function connectorFor(href: string): LovableConnectorId | undefined {
  const match = connectorEntries.find(([, target]) => href === target);
  if (match) return match[0];
  if (href.startsWith("https://www.google.com/maps/dir/")) return "maps";
}

export default function LovableConnectors() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest("a");
      if (!anchor) return;
      const connector = connectorFor(anchor.href);
      if (!connector) return;
      event.preventDefault();
      anchor.dataset.lovableConnector = connector;
    };

    document.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((anchor) => {
      const connector = connectorFor(anchor.href);
      if (connector) anchor.dataset.lovableConnector = connector;
    });
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return (
    <button
      className="whatsapp-bubble"
      type="button"
      aria-label="Falar com o POA Eco Hostel pelo WhatsApp"
      data-lovable-connector="whatsapp"
      data-lovable-target={lovableConnectors.whatsapp}
    >
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M16 3a12.5 12.5 0 0 0-10.7 19L4 28l6.2-1.6A12.5 12.5 0 1 0 16 3Z" />
        <path d="M11.4 9.8c.3-.7.7-.7 1.1-.7h.8c.3 0 .5.1.7.6l1 2.5c.1.4.1.7-.1 1l-.8 1c-.2.2-.3.4-.1.8.5 1 1.3 2 2.3 2.8 1.2.9 2.2 1.2 2.6 1.4.4.2.7.1.9-.2l1.2-1.5c.3-.3.5-.4.9-.2l2.4 1.1c.4.2.7.3.8.5.1.2.1 1.3-.3 2.2-.4 1-2.2 1.9-3.1 2-1 .1-2.3.3-6.2-1.4-5.1-2.2-8.3-7.5-8.6-7.9-.2-.4-2-2.7-2-5.1 0-2.4 1.2-3.6 1.7-4.1.4-.5.9-.6 1.2-.6Z" />
      </svg>
    </button>
  );
}
