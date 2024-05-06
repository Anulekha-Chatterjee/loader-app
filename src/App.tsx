import './App.css';
import Products from './Components/Products/Products';
import Users from './Components/Users/Users';

function App() {
  return (
    <div className='App'>
      <div className="app-details">
        <h1>Products Info</h1>
        <Products />
      </div>
      <div className="app-details">
        <h1>Users Info</h1>
        <Users />
      </div>

    </div>
  );
}

export default App;
