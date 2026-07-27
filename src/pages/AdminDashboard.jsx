import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, Table, Select, Button, ActionIcon, TextInput, NumberInput, Group, Loader } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { LogOut, Trash2, Plus, CalendarCheck, Scissors } from 'lucide-react';
import { logout } from '../lib/authService';
import { listAppointments, updateAppointmentPaid, deleteAppointment } from '../lib/appointmentsService';
import { listServices, upsertService, deleteService } from '../lib/servicesStore';
import styles from './AdminDashboard.module.css';

function groupByDate(appointments) {
  const map = new Map();
  for (const a of appointments) {
    if (!map.has(a.date)) map.set(a.date, []);
    map.get(a.date).push(a);
  }
  return [...map.entries()];
}

function formatDayHeading(dateKey) {
  const d = new Date(dateKey + 'T00:00:00');
  const weekday = d.toLocaleDateString('pt-BR', { weekday: 'long' });
  return `${weekday.charAt(0).toUpperCase()}${weekday.slice(1)}, ${d.toLocaleDateString('pt-BR')}`;
}

function AppointmentsTab() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    listAppointments().then((data) => { setAppointments(data); setLoading(false); });
  };

  useEffect(load, []);

  const handlePaidChange = async (id, value) => {
    await updateAppointmentPaid(id, value === 'pago');
    load();
  };

  const handleDelete = async (id) => {
    await deleteAppointment(id);
    notifications.show({ message: 'Agendamento removido.', color: 'gray' });
    load();
  };

  if (loading) return <Group justify="center" py={40}><Loader color="red" /></Group>;

  if (!appointments.length) {
    return <p className={styles.empty}>Nenhum agendamento ainda.</p>;
  }

  return (
    <div className={styles.dayGroups}>
      {groupByDate(appointments).map(([date, items]) => (
        <div key={date} className={styles.dayGroup}>
          <h3 className={styles.dayHeading}>{formatDayHeading(date)}</h3>
          <Table verticalSpacing="sm" className={styles.table}>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Cliente</Table.Th>
                <Table.Th>Serviço</Table.Th>
                <Table.Th>Hora</Table.Th>
                <Table.Th>Pagamento</Table.Th>
                <Table.Th></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {items.map((a) => (
                <Table.Tr key={a.id}>
                  <Table.Td>
                    <div>{a.client_name}</div>
                    <div className={styles.subtle}>{a.client_phone}</div>
                  </Table.Td>
                  <Table.Td>{a.service_name}</Table.Td>
                  <Table.Td>{a.time}</Table.Td>
                  <Table.Td>
                    <Select
                      size="xs"
                      data={[
                        { value: 'pago', label: 'Pago' },
                        { value: 'nao_pago', label: 'Não pago' },
                      ]}
                      value={a.paid ? 'pago' : 'nao_pago'}
                      onChange={(v) => handlePaidChange(a.id, v)}
                      allowDeselect={false}
                      w={130}
                      className={a.paid ? styles.paidSelect : styles.unpaidSelect}
                    />
                  </Table.Td>
                  <Table.Td>
                    <ActionIcon color="red" variant="subtle" onClick={() => handleDelete(a.id)}>
                      <Trash2 size={16} />
                    </ActionIcon>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </div>
      ))}
    </div>
  );
}

function ServicesTab() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newService, setNewService] = useState({ name: '', price: '', durationMin: 30 });

  const load = () => {
    setLoading(true);
    listServices().then((data) => { setServices(data); setLoading(false); });
  };

  useEffect(load, []);

  const handleAdd = async () => {
    if (!newService.name || !newService.price) return;
    await upsertService({
      id: newService.name.toLowerCase().replace(/\s+/g, '-'),
      name: newService.name,
      price: Number(newService.price),
      durationMin: Number(newService.durationMin) || 30,
    });
    setNewService({ name: '', price: '', durationMin: 30 });
    load();
  };

  const handleRemove = async (id) => {
    await deleteService(id);
    load();
  };

  if (loading) return <Group justify="center" py={40}><Loader color="red" /></Group>;

  return (
    <div>
      <Table verticalSpacing="sm" className={styles.table} mb="lg">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Serviço</Table.Th>
            <Table.Th>Preço</Table.Th>
            <Table.Th>Duração</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {services.map((s) => (
            <Table.Tr key={s.id}>
              <Table.Td>{s.name}</Table.Td>
              <Table.Td>R$ {s.price}</Table.Td>
              <Table.Td>{s.durationMin} min</Table.Td>
              <Table.Td>
                <ActionIcon color="red" variant="subtle" onClick={() => handleRemove(s.id)}>
                  <Trash2 size={16} />
                </ActionIcon>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      <div className={styles.addRow}>
        <TextInput
          placeholder="Nome do serviço"
          value={newService.name}
          onChange={(e) => setNewService({ ...newService, name: e.currentTarget.value })}
        />
        <NumberInput
          placeholder="Preço (R$)"
          value={newService.price}
          onChange={(v) => setNewService({ ...newService, price: v })}
        />
        <NumberInput
          placeholder="Duração (min)"
          value={newService.durationMin}
          onChange={(v) => setNewService({ ...newService, durationMin: v })}
        />
        <Button leftSection={<Plus size={15} />} color="red" onClick={handleAdd}>Adicionar</Button>
      </div>
      <p className={styles.note}>
        Nota: os preços exibidos no site (arquivo de conteúdo) precisam ser atualizados junto com esta lista
        para refletir no agendamento público.
      </p>
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        <h1 className={styles.title}>Painel — Geleia Barber Club</h1>
        <Button variant="subtle" color="gray" leftSection={<LogOut size={16} />} onClick={handleLogout}>
          Sair
        </Button>
      </header>

      <div className={styles.content}>
        <Tabs defaultValue="appointments" color="red">
          <Tabs.List>
            <Tabs.Tab value="appointments" leftSection={<CalendarCheck size={15} />}>Agendamentos</Tabs.Tab>
            <Tabs.Tab value="services" leftSection={<Scissors size={15} />}>Serviços</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="appointments" pt="lg"><AppointmentsTab /></Tabs.Panel>
          <Tabs.Panel value="services" pt="lg"><ServicesTab /></Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
}
