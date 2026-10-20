"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { asset } from "../app/base";
import { links, nav } from "../app/content";

export default function SiteHeader({ keelway = false }: { keelway?: boolean }) {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  return (
    <header className={`site-header${keelway ? " site-header--keelway" : ""}`}>
      <div className="nav-shell">
        <Link className="brand" href="/" aria-label="POA Eco Hostel — início">
          <img className="brand-logo" src={asset("/assets/logo-mark.svg")} alt="" width="72" height="72" />
          <span className="brand-wordmark"><strong>POA</strong><em>Eco Hostel</em></span>
        </Link>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {nav.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>
        <a className="nav-cta" href={links.directBooking} target="_blank" rel="noreferrer">
          Reservar
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          <span aria-hidden="true">{open ? "×" : "☰"}</span>
        </button>
      </div>
      {open && (
        <nav id={menuId} className="mobile-nav" aria-label="Navegação móvel">
          {nav.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}
        </nav>
      )}
    </header>
  );
}
