import {User} from "../../../../models/models.ts";
import './index.scss'

type Props = {
    user: User,
}

const Index = ({ user }: Props) => {
    return (
        <li className='user-item'>
            <div className='user-info'>
                <span className='user-info__name info'>{user.name}</span>
                <span className='credentials'>Username:</span>
                <span className='user-info__username info'>{user.username}</span>
                <span className='credentials'>Email:</span>
                <span className='user-info__email info'>{user.email}</span>
                <span className='credentials'>Phone:</span>
                <span className='user-info__phone info'>{user.phone}</span>
            </div>
        </li>
    );
};

export default Index;