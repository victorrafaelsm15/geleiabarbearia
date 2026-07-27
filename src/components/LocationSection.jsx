import { MapPin, Clock, Phone } from 'lucide-react';
import { IconBrandInstagram } from '@tabler/icons-react';
import { siteInfo, businessHours, weekdayLabels } from '../data/siteContent';
import styles from './LocationSection.module.css';

export default function LocationSection() {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteInfo.address)}`;

  return (
    <section className={`section ${styles.section}`} id="local">
      <div className={`container ${styles.grid}`}>
        <div>
          <span className="section-eyebrow">Onde estamos</span>
          <h2 className="section-heading" style={{ marginBottom: 18 }}>Venha cuidar do seu visual</h2>

          <ul className={styles.infoList}>
            <li><MapPin size={18} /> {siteInfo.address}</li>
            <li><Phone size={18} /> {siteInfo.phone}</li>
            <li><IconBrandInstagram size={18} /> {siteInfo.instagram}</li>
          </ul>

          <div className={styles.actions}>
            <a href={mapsUrl} target="_blank" rel="noreferrer" className={styles.mapBtn}>Como chegar</a>
            <a href={`https://wa.me/${siteInfo.whatsapp}`} target="_blank" rel="noreferrer" className={styles.waBtn}>Chamar no WhatsApp</a>
          </div>
        </div>

        <div className={styles.hoursCard}>
          <div className={styles.hoursTitle}><Clock size={16} /> Horário de funcionamento</div>
          {[1, 2, 3, 4, 5, 6].map((day) => (
            <div key={day} className={styles.hoursRow}>
              <span>{weekdayLabels[day]}</span>
              <span className={styles.hoursValue}>
                {businessHours[day]
                  ? businessHours[day].map((w) => `${w.start}–${w.end}`).join(' / ')
                  : 'Fechado'}
              </span>
            </div>
          ))}
          <div className={styles.hoursRow}>
            <span>Domingo</span>
            <span className={styles.hoursValue}>Fechado</span>
          </div>
        </div>
      </div>
    </section>
  );
}
