import './View.css'
import InputDataForm from '../form/InputDataForm';
import Data from '../data/Data';
import { useSelector } from 'react-redux';

function View() {
  const valid = useSelector((state) => state.valid.value)

  return (
    <div className="App">
      <div className="Drawer">
        <div className="Crest">
        <img src="/grb.svg" />
        </div>
      </div>
      <div className="Content">
      <div className="Header">
        <div className="Icon"> 
        </div>
        <div className="Title">
          <h1>JMBG Validator</h1>
        </div>
        <div className="Form">
          <InputDataForm />
        </div>
      </div>
      <div className="Data col-md-4 mx-auto">
        {valid && <Data />}
      </div>
      </div>
    </div>
  );
}

export default View;