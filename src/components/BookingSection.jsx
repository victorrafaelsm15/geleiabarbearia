import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextInput, Loader } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { CheckCircle2, Scissors, Clock, User, Phone } from 'lucide-react';
import { services, siteInfo, weekdayLabels } from '../data/siteContent';
import { getNextAvailableDays, getAvailableSlots, formatDateKey } from '../lib/scheduling';
import { createAppointment, listBookedTimes } from '../lib/appointmentsService';
import styles from './BookingSection.module.css';

const days = getNextAvailableDays(14);

export default function BookingSection() {
  const [selectedService, setSelectedService] = useState(services[0].id);
  const [selectedDate, setSelectedDate] = useState(days[0]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [success, setSuccess] = useState(null);

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

  const dateKey = useMemo(() => formatDateKey(selectedDate), [selectedDate]);

  useEffect(() => {
    let active = true;
    setLoadingSlots(true);
    setSelectedTime(null);
    listBookedTimes(dateKey).then((booked) => {
      if (!active) return;
      setAvailableSlots(getAvailableSlots(selectedDate, booked));
      setLoadingSlots(false);
    });
    return () => { active = false; };
  }, [dateKey, selectedDate]);

  const onSubmit = async (formData) => {
    if (!selectedTime) {
      notifications.show({ color: 'red', title: 'Selecione um horário', message: 'Escolha um horário disponível antes de confirmar.' });
      return;
    }
    const service = services.find((s) => s.id === selectedService);
    const record = await createAppointment({
      service_id: service.id,
      service_name: service.name,
      service_price: service.price,
      date: dateKey,
      time: selectedTime,
      client_name: formData.name,
      client_phone: formData.phone,
    });

    setSuccess(record);
    reset();

    // Reabre a lista de horários já atualizada
    const booked = await listBookedTimes(dateKey);
    setAvailableSlots(getAvailableSlots(selectedDate, booked));
    setSelectedTime(null);
  };

  if (success) {
    const dateLabel = selectedDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' });
    const waMessage = encodeURIComponent(
      `Olá! Acabei de agendar: ${success.service_name} em ${dateLabel} às ${success.time}. Nome: ${success.client_name}.`
    );
    return (
      <section className={`section ${styles.section}`} id="agendar">
        <div className={`container ${styles.successBox}`}>
          <CheckCircle2 size={48} color="#25d366" />
          <h2 className={styles.successTitle}>Agendamento recebido!</h2>
          <p className={styles.successText}>
            {success.service_name} — {dateLabel} às {success.time}
          </p>
          <p className={styles.successSub}>
            Guarde essa informação. Se precisar, confirme diretamente pelo WhatsApp.
          </p>
          <div className={styles.successActions}>
            <a href={`https://wa.me/${siteInfo.whatsapp}?text=${waMessage}`} target="_blank" rel="noreferrer">
              <Button color="green" radius="xl">Confirmar pelo WhatsApp</Button>
            </a>
            <Button variant="outline" color="gray" radius="xl" onClick={() => setSuccess(null)}>
              Fazer novo agendamento
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`section ${styles.section}`} id="agendar">
      <div className="container">
        <div className={styles.headingRow}>
          <span className="section-eyebrow">Sem cadastro, sem complicação</span>
          <h1 className={`section-heading ${styles.heading}`}>Agende seu horário agora</h1>
          <p className="section-sub">Escolha o serviço, o dia e o horário — leva menos de 1 minuto.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.card}>
          {/* Serviço */}
          <div className={styles.block}>
            <div className={styles.blockLabel}><Scissors size={15} /> Serviço</div>
            <div className={styles.serviceGrid}>
              {services.map((s) => (
                <button
                  type="button"
                  key={s.id}
                  className={`${styles.serviceChip} ${selectedService === s.id ? styles.serviceChipActive : ''}`}
                  onClick={() => setSelectedService(s.id)}
                >
                  <span>{s.name}</span>
                  <span className={styles.servicePrice}>R$ {s.price}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Data */}
          <div className={styles.block}>
            <div className={styles.blockLabel}><Clock size={15} /> Dia</div>
            <div className={styles.dayScroll}>
              {days.map((d) => {
                const isActive = formatDateKey(d) === dateKey;
                return (
                  <button
                    type="button"
                    key={d.toISOString()}
                    className={`${styles.dayChip} ${isActive ? styles.dayChipActive : ''}`}
                    onClick={() => setSelectedDate(d)}
                  >
                    <span className={styles.dayWeekday}>{weekdayLabels[d.getDay()].slice(0, 3)}</span>
                    <span className={styles.dayNumber}>{d.getDate()}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Horário */}
          <div className={styles.block}>
            <div className={styles.blockLabel}><Clock size={15} /> Horário</div>
            {loadingSlots ? (
              <Loader size="sm" color="red" />
            ) : availableSlots.length ? (
              <div className={styles.slotGrid}>
                {availableSlots.map((t) => (
                  <button
                    type="button"
                    key={t}
                    className={`${styles.slotChip} ${selectedTime === t ? styles.slotChipActive : ''}`}
                    onClick={() => setSelectedTime(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            ) : (
              <p className={styles.noSlots}>Sem horários disponíveis neste dia. Escolha outra data.</p>
            )}
          </div>

          {/* Dados do cliente */}
          <div className={styles.formRow}>
            <TextInput
              placeholder="Seu nome"
              leftSection={<User size={15} />}
              error={errors.name?.message}
              {...register('name', { required: 'Informe seu nome' })}
            />
            <TextInput
              placeholder="WhatsApp / telefone"
              leftSection={<Phone size={15} />}
              error={errors.phone?.message}
              {...register('phone', { required: 'Informe seu telefone' })}
            />
          </div>

          <Button
            type="submit"
            size="md"
            radius="xl"
            fullWidth
            color="red"
            loading={isSubmitting}
            disabled={!availableSlots.length}
          >
            Confirmar agendamento
          </Button>
        </form>
      </div>
    </section>
  );
}
