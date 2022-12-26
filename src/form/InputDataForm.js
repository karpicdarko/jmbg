import './InputDataForm.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Stack } from 'react-bootstrap';
import { useState } from 'react';
import { validate, invalidate } from '../features/validSlice'
import { setName, setSurname, setBirthDate, setRegion, setGender } from '../features/personSlice'
import { setMessage} from '../features/messageSlice'
import { useDispatch, useSelector} from 'react-redux';
import JmbgModal from '../modal/JmbgModal'
import Region from '../data/Region.json'
 
function InputDataForm() {

  const [jmbg, setJmbg] = useState("");
  const [validated, setValidated] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();
  const regionData = Region;

  const onSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    console.log(jmbg.length)
    if(jmbg.length === 13) {
      setValidated(true);
    }
    if (form.checkValidity() === false) {
      event.stopPropagation();
      if(jmbg.length !== 13) {
        dispatch(setMessage("JMBG mora imati 13 cifara!"));
        setModalShow(true);
      }
    } else {
      checkJmbg(jmbg);
    }
  };

  const checkJmbg = (jmbg) => {
    const birthDay = jmbg.substring(0, 2);
    const birthMonth = jmbg.substring(2, 4);
    const birthYear = jmbg.substring(4, 7);
    const birthRegion = jmbg.substring(7, 9);
    const genderNumber = jmbg.substring(9, 12);
    if(!checkJmbgLength(jmbg) || 
       !checkBirthDate(birthDay, birthMonth, birthYear) || 
       !checkBirthRegion(birthRegion) || 
       !checkGender(genderNumber) ||
       !checkControlNumber(jmbg)) {
      setModalShow(true);
      dispatch(invalidate());
      return false;
    }
    dispatch(validate());
    return true;
  }

  const checkJmbgLength = (jmbg) => {
    if(jmbg.length !== 13) {
      dispatch(setMessage("JMBG mora imati 13 cifara!"));
      return false;
    }
    return true;
  }

  const checkBirthDate = (birthDay, birthMonth, birthYear) => {
      const fullYear = formYear(birthYear);
      if(!checkDayAndMonth(birthDay, birthMonth, fullYear)) {
        return false;
      }
      if(!between(parseInt(birthDay), 1, 31)) {
        dispatch(setMessage("Dan rođenja mora biti između 01 i 31!"))
        return false;
      }
      if(!between(parseInt(birthMonth), 1, 12)) {
        dispatch(setMessage("Mesec rođenja mora biti između 01 i 12!"))
        return false;
      }
      if(!between(parseInt(birthYear), 0, 999)) {
        return false;
      }
      const bDay = birthDay + ". " + monthNumberToText(birthMonth) + ", " + fullYear + ".";
      dispatch(setBirthDate(bDay));
      return true;
  }

  const checkDayAndMonth = (birthDay, birthMonth, birthYear) => {
    const longMonths = [1, 3, 5, 7, 8, 10, 12];
    const shortMonths = [4, 6, 9, 11];
    if(longMonths.some(month => month === parseInt(birthMonth))) {
      if(parseInt(birthDay) > 31) {
        dispatch(setMessage("Mesec rođenja koji ste uneli može imati najviše 31  dan!"));
        return false;
      }
    } else if (shortMonths.some(month => month === parseInt(birthMonth))) {
      if(parseInt(birthDay) > 30) {
        dispatch(setMessage("Mesec rođenja koji ste uneli može imati najviše 30 dana!"));
        return false;
      }
    } else { 
      const isLeap = isLeapYear(parseInt(birthYear));
      if(isLeap && parseInt(birthDay) > 29) {
        dispatch(setMessage("Mesec rođenja koji ste uneli može imati najviše 29 dana!"));
        return false;
      } else if(!isLeap && parseInt(birthDay) > 28) {
        dispatch(setMessage("Mesec rođenja koji ste uneli može imati najviše 28 dana!"));
        return false;
      }
    }
    return true;
  }

  const checkBirthRegion = (birthRegion) => {
    let regionValid = false;
    Object.entries(regionData).forEach(([regionKey, regionValue]) => {
      if(between(parseInt(birthRegion), parseInt(regionValue.min), parseInt(regionValue.max))) {
        var data = regionValue.data;
        data.every(entry => {
          if(parseInt(birthRegion) === parseInt(entry.number)) {
            const country = regionKey === "Stranci" ? "" : regionKey + ": ";
            dispatch(setRegion(country + entry.name));
            regionValid = true;
            return false;
          }
          return true;
        })
        if(!regionValid) {
          dispatch(setRegion(regionKey));
          regionValid = true;
          return false;
        }
      }
    });
    if(regionValid) {
      return regionValid;
    }
    dispatch(setMessage("Broj 40 se ne koristi za označavanje političke regije rođenja!"))
    return false; 
  }

  const checkGender = (genderNumber) => { 
   const genderInt = parseInt(genderNumber);
    if(between(genderInt, 0, 499)) {
      dispatch(setGender("Muški"));
    } else {
      dispatch(setGender("Ženski"));
    }
    return true;

  }

  const checkControlNumber = (jmbg) => {
    const sum =  7*(parseInt(jmbg[0])+parseInt(jmbg[6])) + 
                 6*(parseInt(jmbg[1])+parseInt(jmbg[7])) + 
                 5*(parseInt(jmbg[2])+parseInt(jmbg[8])) + 
                 4*(parseInt(jmbg[3])+parseInt(jmbg[9])) + 
                 3*(parseInt(jmbg[4])+parseInt(jmbg[10])) + 
                 2*(parseInt(jmbg[5])+parseInt(jmbg[11]));
    const mod = sum % 11;
    var conNumber = 11 - mod;
    if(conNumber > 9) {
      conNumber = 0;
    }
    if(conNumber !== parseInt(jmbg[12])) {
      dispatch(setMessage("Kontrolni broj je neispravan!"));
      return false;
    }
    return true;
  }

  function monthNumberToText(monthNumber) {
    switch(parseInt(monthNumber)) {
      case 1:  
        return "Januar" 
      case 2:  
        return "Februar" 
      case 3:  
        return "Mart" 
      case 4:  
        return "April" 
      case 5:  
        return "Maj" 
      case 6:  
       return "Jun" 
      case 7:  
        return "Jul" 
      case 8:  
        return "Avgust" 
      case 9:  
        return "Septembar" 
      case 10:  
        return "Oktobar" 
      case 11:  
        return "Novembar" 
      case 12:  
        return "Decembar" 
      default: 
        break;
    }
  }

  function isLeapYear(year){
    return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
  }

  function between(x, min, max) {
    return x >= min && x <= max;
  }

  function formYear(year) {
    if(between(parseInt(year), 900, 999)) {
      return "1" + year;
    }
    return "2" + year;
  }

  //TODO jmbg ne sme da bude zelen ako nije validan?
    return (
      <>
      <Form noValidate validated={validated} onSubmit={e => onSubmit(e)}>
        <Stack gap={2} className="col-md-4 mx-auto">
          <Form.Group className="mb-3" controlId="formName">
            <Form.Control required type="text" placeholder="Unesi ime" onChange={e => {
              dispatch(invalidate())
              dispatch(setName(e.target.value));
              setValidated(false);
            }}/>
            <Form.Control.Feedback type="invalid">
                Ime je obavezno!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSurname">
            <Form.Control required type="text" placeholder="Unesi prezime" onChange={e => {
              dispatch(invalidate())
              dispatch(setSurname(e.target.value))
              setValidated(false);
              }}/>
            <Form.Control.Feedback type="invalid">
                Prezime je obavezno!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formJmbg">
            <Form.Control type="text" placeholder="Unesi JMBG" onChange={e => {
              dispatch(invalidate())
              setJmbg(e.target.value)
              setValidated(false);
              }}/>
            <Form.Control.Feedback type="invalid">
                JMBG je obavezan i mora imati 13 cifara!
            </Form.Control.Feedback>
          </Form.Group>
       </Stack>
        <Button variant="danger" size="lg" type="submit">
            Validiraj
        </Button>
      </Form>
      <JmbgModal show={modalShow} onHide={() => setModalShow(false)} />
      </>
    );
  }
  
  export default InputDataForm;