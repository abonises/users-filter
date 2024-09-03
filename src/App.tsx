import './style/style.scss'
import HeaderComponent from "./components/HeaderComponent";
import UsersList from "./features/Users/UsersList";

function App() {

  return (
    <div className='app container'>
      <HeaderComponent />
      <UsersList />
    </div>
  )
}

export default App
