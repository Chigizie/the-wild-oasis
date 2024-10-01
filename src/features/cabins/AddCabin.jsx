import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Add new cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );

  //   const [isOpenmodal, setIsOpenModal] = useState(false);
  //   return (
  //     <div>
  //       <Row type="horizontal">
  //         <Button onClick={() => setIsOpenModal((isOpenmodal) => !isOpenmodal)}>
  //           modal form
  //         </Button>
  //       </Row>

  //       {isOpenmodal && (
  //         <Modal
  //           onClose={() => {
  //             setIsOpenModal(false);
  //             console.log("ok");
  //           }}
  //         >
  //           <CreateCabinForm
  //             onCloseModal={() => {
  //               setIsOpenModal(false);
  //             }}
  //           />
  //         </Modal>
  //       )}
  //     </div>
  //   );
}

export default AddCabin;
