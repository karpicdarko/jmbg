import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux'

export default function JmbgModal(props) {
  const message = useSelector((state) => state.message.value)
    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Uneli ste neispravan JMBG
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {message}
          </Modal.Body>
        <Modal.Footer>
          <p>
            Ukoliko niste sigurni kako JMBG treba da izgleda, ispravan format mozete pronaci na <a href="https://sh.wikipedia.org/wiki/Jedinstveni_mati%C4%8Dni_broj_gra%C4%91ana" target="_blank" rel="noreferrer"> ovom linku.</a>
          </p>
          </Modal.Footer>
      </Modal>
    );
  }
