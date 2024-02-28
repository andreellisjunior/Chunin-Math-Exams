import { Link } from 'react-router-dom';
import Card from './components/Card';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

const Difficulty = () => {
  const item = localStorage.getItem('name');
  const userName = item && JSON.parse(item);
  const difficultyLevels = [
    { difficulty: 'K - 1', bgColor: 'bg-green-600', link: 'k-1', status: 1 },
    { difficulty: '1 - 2', bgColor: 'bg-lime-500', link: '1-2', status: 1 },
    { difficulty: '2 - 3', bgColor: 'bg-yellow-500', link: '2-3', status: 0 },
    { difficulty: '3 - 4', bgColor: 'bg-orange-500', link: '3-4', status: 0 },
    { difficulty: '5 - 6', bgColor: 'bg-orange-700', link: '5-6', status: 0 },
    { difficulty: 'HARD', bgColor: 'bg-red-800', link: 'hard' },
  ];
  return (
    <div className='flex flex-col'>
      <h1 className='font-heading text-7xl text-center pt-20 mb-5'>
        Hi, {userName}
      </h1>
      <h3 className='font-body text-5xl uppercase text-center font-thin'>
        Choose Your Difficulty
      </h3>
      <div className='grid grid-flow-row grid-cols-2 gap-4 mt-4'>
        {difficultyLevels.map(({ difficulty, bgColor, link, status }, i) => (
          <Card key={i} {...{ difficulty, bgColor, link, status }} />
        ))}
      </div>
      <Link className='flex gap-2 items-center mt-4 self-start p-2' to='/'>
        <ChevronLeftIcon className='w-4 h-full' />
        BACK
      </Link>
    </div>
  );
};

export default Difficulty;
