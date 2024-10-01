import { useState } from "react";
import Row from "../../ui/Row";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
  const [isOpenmodal, setIsOpenModal] = useState(false);
  return (
    <div>
      <Row type="horizontal">
        <Button onClick={() => setIsOpenModal((isOpenmodal) => !isOpenmodal)}>
          modal form
        </Button>
      </Row>

      {isOpenmodal && (
        <Modal
          onClose={() => {
            setIsOpenModal(false);
            console.log("ok");
          }}
        >
          <CreateCabinForm
            onCloseModal={() => {
              setIsOpenModal(false);
            }}
          />
        </Modal>
      )}
    </div>
  );
}

export default AddCabin;
