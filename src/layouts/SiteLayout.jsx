import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function SiteLayout() {
  return (
    <div id="topo">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
