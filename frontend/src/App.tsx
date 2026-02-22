import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import SubmitProgram from './pages/SubmitProgram';
import SubmitConfirmation from './pages/SubmitConfirmation';
import SearchPrograms from './pages/SearchPrograms';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="submit" element={<SubmitProgram />} />
          <Route path="submit/confirmation" element={<SubmitConfirmation />} />
          <Route path="search" element={<SearchPrograms />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
