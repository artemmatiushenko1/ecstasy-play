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
    <Modal
      backdrop="blur"
      hideCloseButton
      placement="center"
      isOpen={isOpen}
      classNames={{ 'base': 'overflow-y-visible' }}
    >
      <ModalContent className="py-9">
        <ModalBody className="text-center">
          <h2 className="absolute top-[-15px] left-[50%] -translate-x-2/4 bg-amber-400 text-white p-3 rounded-md">
            Game is over
          </h2>
          <div className="flex flex-col items-center">
            <p className="mb-5 text-default">You've scored:</p>
            <p className="text-6xl font-bold text-center ">{score}</p>
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
