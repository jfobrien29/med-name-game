import {
  AspectRatio,
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Button,
  Switch,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { useToast } from 'hooks/useToast';
import { useCallback, useEffect, useState } from 'react';
import { PERSON_DATA_ARRAY, Person } from 'utils/constants';

const shuffleArray = (array: any[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const getThreeRandomNames = (currentName: string) => {
  const shuffledPeople = shuffleArray(PERSON_DATA_ARRAY).filter(
    (person: Person) => !person.names.includes(currentName),
  );

  return shuffledPeople.slice(0, 3).map((p: Person) => p.names[0]);
};

const getStreakEmoji = (streak: number): string => {
  if (streak < 2) {
    return '';
  } else if (streak < 5) {
    return '🔥';
  } else if (streak < 10) {
    return '🔥🔥';
  } else if (streak < 30) {
    return '🔥🔥🔥';
  } else {
    return '🔥🔥🔥🔥🔥!!🔥🔥!!🔥🔥12$%&@🔥🔥';
  }
};

const getRank = (correct: number): string => {
  if (correct < 17) {
    return 'Worse than chance 🎲 (I think you might be lost!)';
  } else if (correct < 34) {
    return 'Glass half empty 🥛 (Ok you got work to do)';
  } else if (correct < 50) {
    return 'Netwerker 🕺💃 (On the right track, but not quite there)';
  } else if (correct < 58) {
    return "Med-staunaught 🚀 (You've almost got it!)";
  } else if (correct < 65) {
    return 'Med Connector 🤝 (You know almost everyone!)';
  } else {
    return 'The Ultimate Med 👑🙇 (You know everyone!)';
  }
};

const GameOverModal: React.FC<any> = ({ isOpen, correct, streak }) => {
  return (
    <Modal isOpen={isOpen} onClose={() => {}} closeOnOverlayClick={false} closeOnEsc={false}>
      <ModalOverlay backdropFilter="blur(3px)" />
      <ModalContent bg="white">
        <ModalHeader>Woohoo! You got through all {PERSON_DATA_ARRAY.length} people!</ModalHeader>
        <ModalBody>
          <Text>
            Correct guesses: {correct} ({((correct / PERSON_DATA_ARRAY.length) * 100).toFixed(0)}%)
          </Text>
          <Text>Best streak: {streak}</Text>
          <Text>Rank: {getRank(correct)}</Text>
        </ModalBody>

        <ModalFooter>
          <Button as="a" colorScheme="green" mr={3} href="/">
            Try Again?
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

interface Props {
  allPeople: Person[];
}

const Game: React.FC<Props> = ({ allPeople }) => {
  const [index, setIndex] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [correctGuesses, setCorrectGuesses] = useState<number>(0);
  const [streak, setStreak] = useState(0);
  const [showFullName, setShowFullName] = useState(false);
  const toast = useToast();
  const [isSelectedState, setIsSelectedState] = useState<null | number>(null);
  const { onOpen, isOpen } = useDisclosure();

  useEffect(() => {
    const name = allPeople[index].names[0];
    const otherOptions = getThreeRandomNames(name);

    setOptions(shuffleArray([name, ...otherOptions]));
  }, [index]);

  const onGuess = useCallback(
    (guessIndex: number) => {
      const correctName = allPeople[index].names[0];
      const guess = options[guessIndex];

      if (correctName === guess) {
        setCorrectGuesses(correctGuesses + 1);
        setStreak(streak + 1);
        toast.success('Woohoo! You got it right!');
      } else {
        setStreak(0);
        toast.error(`Oh no, that's not right. That's a picture of ${allPeople[index].names[0]}!!`);
      }

      setIsSelectedState(guessIndex);
    },
    [index, allPeople, options, streak, correctGuesses, toast],
  );

  const onNext = useCallback(() => {
    if (index === 1) {
      onOpen();
    } else {
      setIsSelectedState(null);
      setIndex((index + 1) % allPeople.length);
    }
  }, [index]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isSelectedState !== null && e.key === 'Enter') {
        onNext();
      }
      if (isSelectedState === null && ['1', '2', '3', '4'].includes(e.key)) {
        onGuess(Number(e.key) - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [index, isSelectedState, onGuess, onNext]);

  console.log(allPeople[0]);

  return (
    <>
      <GameOverModal correct={correctGuesses} streak={streak} isOpen={isOpen} />

      <Flex align="center" flexDir="column" w="full" pt={[4, 4, 8]}>
        <Heading fontSize={['2xl', '2xl', '4xl']}>Mediter-namean Gamean</Heading>
        <Flex>
          <Text fontSize="xs">
            {allPeople.length - index - (isSelectedState !== null ? 1 : 0)} names left to guess.
            You've gotten{' '}
            {index === 0 && isSelectedState === null
              ? '--'
              : ((correctGuesses / (index + (isSelectedState !== null ? 1 : 0))) * 100).toFixed(0)}
            % right!
            {(correctGuesses / (index + (isSelectedState !== null ? 1 : 0))) * 100 < 20
              ? ' (Yikes)'
              : ''}
          </Text>
        </Flex>
        <Flex gap={4} fontWeight="semibold" mt={2} fontSize={['sm', 'sm', 'md']}>
          <Text>Correct: {correctGuesses}</Text>
          <Text>
            Streak: {streak}
            {getStreakEmoji(streak)}
          </Text>
        </Flex>
        <Flex
          justify="center"
          align="center"
          p={4}
          rounded="lg"
          bg="green.500"
          mt={2}
          dropShadow="2xl"
        >
          <AspectRatio
            ratio={1}
            w={['225px', '225px', '300px']}
            h={['225px', '225px', '300px']}
            rounded="md"
            overflow="hidden"
          >
            <Image
              src={`/people/${allPeople[index].names[0]
                .toLowerCase()
                .replaceAll(' ', '-')
                .trim()}.jpeg`}
              objectFit="fill"
            />
          </AspectRatio>
        </Flex>
        <Flex mt={8} align="center" flexDir="column" w="300px" gap={2}>
          {options.map((option: any, idx: number) => {
            return (
              <Button
                isDisabled={isSelectedState !== null}
                w="full"
                key={option}
                onClick={() => onGuess(idx)}
                colorScheme="green"
              >
                <Flex w="full" gap={2} align="baseline">
                  <Box border="1px" w="20px" rounded="md" display={['none', 'none', 'block']}>
                    {idx + 1}
                  </Box>
                  <Flex
                    as="span"
                    flexGrow={1}
                    justify={['center', 'center', 'start']}
                    w={['full', 'full', 'fit-content']}
                  >
                    {showFullName ? option : option.split(' ')[0]}

                    {isSelectedState !== null && option === allPeople[index].names[0] && ' ✅'}
                  </Flex>
                </Flex>
              </Button>
            );
          })}
        </Flex>

        {isSelectedState !== null && (
          <Flex mt={4} align="center" flexDir="column" w="300px" gap={2}>
            <Button w="full" onClick={onNext} colorScheme="blackAlpha">
              Next ➡️ (ENTER)
            </Button>
          </Flex>
        )}

        <Flex mt={4} gap={2}>
          Show Full Name <Switch onChange={(e) => setShowFullName(e.target.checked)} />
        </Flex>
      </Flex>
    </>
  );
};

export default Game;
