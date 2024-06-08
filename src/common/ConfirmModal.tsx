import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { ReactNode } from 'react';

interface IModal {
  isOpen: boolean
  onConfirm: () => void
  onClose: () => void
  isDismissable: boolean
  title?: string
  children: ReactNode
}

const ConfirmModal: React.FC<IModal> = ({
  isOpen,
  title,
  isDismissable,
  children,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal
      backdrop='blur'
      isOpen={isOpen}
      onClose={onClose}
      isDismissable={isDismissable}
      isKeyboardDismissDisabled={!isDismissable}
    >
      <ModalContent>
        <ModalHeader>
          { title || 'Confirmar ação' }
        </ModalHeader>

        <ModalBody >
          { children }
        </ModalBody>

        <ModalFooter >
          <Button variant='light' onPress={onClose}>
            Cancelar
          </Button>
          <Button color='primary' onPress={onConfirm}>
            Confirmar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ConfirmModal;