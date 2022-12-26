import './Data.css'
import { useSelector } from 'react-redux';

function Data() {
    const person = useSelector((state) => state.person);
    return (
        <div className="Data col-mb-3 mx-auto">
                <div className="DataCol mb-1">
                    <div className="label">
                        Ime
                    </div>
                    <div className="value">
                        {person.name}
                    </div>
                </div>
                <div className="DataCol mb-1">
                    <div className="label">
                        Prezime
                    </div>
                    <div className="value">
                        {person.surname}
                    </div>
                </div>
            <div className="DataCol mb-1">
                    <div className="label">
                        Datum rođenja
                    </div>
                    <div className="value">
                        {person.birthDate}
                    </div>
                </div>
                <div className="DataCol mb-1">
                    <div className="label">
                        Region
                    </div>
                    <div className="value">
                        {person.region}
                    </div>
                </div>
            <div className="DataCol mb-1">
                <div className="label">
                    Pol
                </div>
                <div className="value">
                    {person.gender}
                </div>
                </div>
        </div>
    );
}

export default Data;