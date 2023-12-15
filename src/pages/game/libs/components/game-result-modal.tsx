import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
} from '@nextui-org/react';
import { MdEmojiEvents } from 'react-icons/md';

interface IGameResultModal {
  score: number;
  isOpen: boolean;
  onQuitClick: () => void;
  onPlayAgainClick: () => void;
}

const GameResultModal = ({
  score,
  isOpen,
  onPlayAgainClick,
  onQuitClick,
}: IGameResultModal) => {
  return (
    <Modal backdrop="blur" hideCloseButton placement="center" isOpen={isOpen}>
      <ModalContent className="py-9">
        <ModalBody className="text-center">
          <div className="flex flex-col items-center">
            <h2 className="mb-5 text-default">
              Congratulations! You've scored:
            </h2>
            <h3 className="text-6xl font-bold text-center ">{score}</h3>
            <MdEmojiEvents className="text-amber-400 text-8xl text-center mb-5" />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            fullWidth
            color="danger"
            variant="light"
            onPress={onQuitClick}
          >
            Quit
          </Button>
          <Button fullWidth color="primary" onPress={onPlayAgainClick}>
            Play Again
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { GameResultModal };
