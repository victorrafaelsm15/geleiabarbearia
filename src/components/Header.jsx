import { Link } from 'react-router-dom';
import { IconBrandInstagram, IconBrandWhatsapp } from '@tabler/icons-react';
import { siteInfo } from '../data/siteContent';
import logo from '../assets/img/logo.png';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a href="#topo" className={styles.logo}>
          <img src={logo} alt="Geleia Barber Club" className={styles.logoMark} />
          <span className={styles.logoText}>
            GELEIA
            <span className={styles.logoSub}>BARBER CLUB</span>
          </span>
        </a>

        <nav className={styles.nav}>
          <a href="#agendar">Agendar</a>
          <a href="#servicos">Serviços</a>
          <a href="#local">Localização</a>
        </nav>

        <div className={styles.actions}>
          <a href={siteInfo.instagramUrl} target="_blank" rel="noreferrer" className={styles.instagramBtn}>
            <IconBrandInstagram size={20} /> <span className={styles.btnLabel}>{siteInfo.instagram}</span>
          </a>
          <a
            href={`https://wa.me/${siteInfo.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className={styles.whatsappBtn}
          >
            <IconBrandWhatsapp size={18} /> <span className={styles.btnLabel}>WhatsApp</span>
          </a>
        </div>
      </div>
    </header>
  );
}
