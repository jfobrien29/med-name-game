import { AspectRatio, Box, Flex, Heading, Text, Image, Button } from '@chakra-ui/react';
import { useToast } from 'hooks/useToast';
import { useEffect, useState } from 'react';
import { PERSON_DATA_ARRAY, Person } from 'utils/constants';

const shuffleArray = (array: Person[]) => {
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

interface Props {}

const Game: React.FC<Props> = ({}) => {
  const [allPeople] = useState<Person[]>(shuffleArray(PERSON_DATA_ARRAY));
  const [index, setIndex] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const toast = useToast();

  useEffect(() => {
    const name = allPeople[index].names[0];
    const otherOptions = getThreeRandomNames(name);

    setOptions([name, ...otherOptions]);
  }, [index]);

  const onGuess = (guessIndex: number) => {
    const correctName = allPeople[index].names[0];
    const guess = options[guessIndex];

    if (correctName === guess) {
      toast.success('Woohoo! You got it right!');
    } else {
      toast.error(`Oh no, that's not right. Luckily it's just practice!`);
    }

    setIndex((index + 1) % allPeople.length);
  };

  console.log(allPeople[index].imageUrl);
  return (
    <Flex align="center" flexDir="column" w="full" pt={8}>
      <Heading>Mediterranean Name Game</Heading>
      <AspectRatio ratio={1} w="300px" h="300px" mt={4}>
        <Image src={allPeople[index].imageUrl} objectFit="fill" />
      </AspectRatio>
      <Flex mt={8} align="center" flexDir="column" w="300px" gap={2}>
        {options.map((option: any, idx: number) => {
          return (
            <Button w="full" key={option} onClick={() => onGuess(idx)} colorScheme="green">
              {option}
            </Button>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default Game;
