import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ToolsPage } from './pages/ToolsPage';
import { SearchPage } from './pages/SearchPage';
import { HelpPage } from './pages/HelpPage';
import { SettingsPage } from './pages/SettingsPage';
import { TooltipProvider } from './components/ui/tooltip';
import { SearchProvider } from './contexts/SearchContext';

function App() {
  return (
    <TooltipProvider>
      <SearchProvider>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<ToolsPage />} />
              <Route path="search" element={<SearchPage />} />
              <Route path="help" element={<HelpPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SearchProvider>
    </TooltipProvider>
  );
}

export default App;
