import './index.scss'
import { FaUser } from "react-icons/fa";
const Index = () => {
    return (
        <header>
            <div className={'logo-container'}>
                <h1 className={'logo-container__logo'}><FaUser className='logo-container__icon' /> USERS FILTER</h1>
            </div>
        </header>
    );
};

export default Index;