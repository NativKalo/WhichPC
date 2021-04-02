import './App.css';
import Wizard from './Wizard/Wizard';
import mockData from './mockData'

function App() {
  console.log(mockData)

  return (
    <div className="App">
      <Wizard data={mockData} />
    </div>
  );
}

export default App;
