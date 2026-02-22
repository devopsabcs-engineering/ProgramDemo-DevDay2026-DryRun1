import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC = () => {
  return (
    <div className="ontario-page">
      <Header />
      <main id="main-content" className="ontario-main-content" role="main">
        <div className="ontario-row">
          <div className="ontario-columns ontario-large-12">
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
