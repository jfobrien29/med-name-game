import { AspectRatio, Box, Flex, Heading, Text, Image, Button, Switch } from '@chakra-ui/react';
import { useToast } from 'hooks/useToast';
import { isElement } from 'lodash';
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

interface Props {}

const Game: React.FC<Props> = ({}) => {
  const [allPeople] = useState<Person[]>(shuffleArray(PERSON_DATA_ARRAY));
  const [index, setIndex] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [correctGuesses, setCorrectGuesses] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showFullName, setShowFullName] = useState(false);
  const toast = useToast();
  const [isSelectedState, setIsSelectedState] = useState<null | number>(null);

  useEffect(() => {
    const name = allPeople[index].names[0];
    const otherOptions = getThreeRandomNames(name);

    setOptions(shuffleArray([name, ...otherOptions]));
  }, [index]);

  const onGuess = useCallback(
    (guessIndex: number) => {
      console.log(guessIndex);
      const correctName = allPeople[index].names[0];
      const guess = options[guessIndex];

      console.log(correctName, guess);

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isSelectedState !== null && e.key === 'Enter') {
        setIsSelectedState(null);
        setIndex((index + 1) % allPeople.length);
      }
      if (isSelectedState === null && ['1', '2', '3', '4'].includes(e.key)) {
        onGuess(Number(e.key) - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [index, isSelectedState, onGuess]);

  const onNext = () => {
    setIsSelectedState(null);
    setIndex((index + 1) % allPeople.length);
  };

  return (
    <Flex align="center" flexDir="column" w="full" pt={[4, 4, 8]}>
      <Heading fontSize={['2xl', '2xl', '4xl']}>Mediter-namean Gamean</Heading>
      <Flex gap={4} fontWeight="semibold" mt={2}>
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
        <AspectRatio ratio={1} w="300px" h="300px" rounded="md" overflow="hidden">
          <Image src={allPeople[index].imageUrl} objectFit="fill" />
        </AspectRatio>
      </Flex>
      {/* <Box>{allPeople[index].names[0]}</Box> */}
      <Box>{allPeople[index].imageUrl}</Box>
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
                <Box border="1px" w="20px" rounded="md">
                  {idx + 1}
                </Box>
                <Flex as="span" flexGrow={1}>
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
  );
};

export default Game;
