import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { IconBrandInstagram } from '@tabler/icons-react';
import { siteInfo } from '../data/siteContent';
import logo from '../assets/img/logo.png';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.logo}>
          <img src={logo} alt="Geleia Barber Club" className={styles.logoMark} />
          <span>GELEIA BARBER CLUB</span>
        </div>
        <div className={styles.socials}>
          <a href={siteInfo.instagramUrl} target="_blank" rel="noreferrer" className={styles.instagramBtn}>
            <IconBrandInstagram size={20} /> {siteInfo.instagram}
          </a>
          <a href={`https://wa.me/${siteInfo.whatsapp}`} target="_blank" rel="noreferrer" className={styles.waIconLink}>
            <MessageCircle size={18} />
          </a>
        </div>
        <span className={styles.copy}>© {new Date().getFullYear()} Geleia Barber Club</span>
        <Link to="/admin/login" className={styles.adminLink}>Painel administrativo</Link>
      </div>
    </footer>
  );
}
