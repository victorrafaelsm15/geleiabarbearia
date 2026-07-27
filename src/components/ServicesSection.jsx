import { Scissors, Wand2, Sparkles, Layers } from 'lucide-react';
import { services } from '../data/siteContent';
import styles from './ServicesSection.module.css';

const ICONS = { corte: Scissors, barba: Wand2, combo: Layers, sobrancelha: Sparkles };

export default function ServicesSection() {
  return (
    <section className={`section ${styles.section}`} id="servicos">
      <div className="container">
        <div className={styles.headingRow}>
          <span className="section-eyebrow">Nossos serviços</span>
          <h2 className="section-heading">O cuidado que seu visual merece</h2>
        </div>
        <div className={styles.grid}>
          {services.map((s) => {
            const Icon = ICONS[s.id] || Scissors;
            return (
              <div key={s.id} className={styles.card}>
                <Icon size={26} color="#e01e1e" />
                <h3 className={styles.name}>{s.name}</h3>
                <span className={styles.price}>R$ {s.price}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
