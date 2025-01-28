import D3Navigation from './components/D3Navigation';
import './styles/D3Navigation.css';

function App() {
  return (
    <div className="app-container">
      <D3Navigation />
      <main className="content">
        <Routes>
          {/* ... existing routes ... */}
        </Routes>
      </main>
    </div>
  );
}

export default App; 