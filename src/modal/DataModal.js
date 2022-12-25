import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux'

export default function DataModal(props) {
  const message = useSelector((state) => state.message.value)
    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Uneli ste neispravne podatke!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {message}
          </Modal.Body>
      </Modal>
    );
}