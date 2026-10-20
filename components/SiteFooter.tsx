import Link from "next/link";
import { links } from "../app/content";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <strong>POA Eco Hostel</strong>
        <p>Rua Luiz Afonso, 276 · Cidade Baixa · Porto Alegre — RS</p>
      </div>
      <div className="footer-links">
        <Link href="/hospedagem">Hospedagem</Link>
        <Link href="/galeria">Galeria</Link>
        <a href={links.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
        <a href={links.email}>E-mail</a>
      </div>
    </footer>
  );
}
