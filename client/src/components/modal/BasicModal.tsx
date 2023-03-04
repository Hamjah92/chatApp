import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { FC, ReactNode } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type Props = {
  children: ReactNode;
  handleOpen: () => void;
  handleClose: () => void;
  isOpen: boolean;
};
export const BasicModal: FC<Props> = function ({
  isOpen,
  handleOpen,
  handleClose,
  children,
}) {
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  );
};
