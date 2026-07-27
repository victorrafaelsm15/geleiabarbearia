import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { IconBrandInstagram } from '@tabler/icons-react';
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
            <IconBrandInstagram size={20} /> {siteInfo.instagram}
          </a>
          <a
            href={`https://wa.me/${siteInfo.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className={styles.whatsappBtn}
          >
            <MessageCircle size={16} /> WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
