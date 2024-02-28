import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Victory from './assets/Vector.png';
import Cancel from './assets/Cancel.png';
import { useAppContext } from './utils';

const Board = () => {
  const { name, setName, streak, setStreak } = useAppContext();
  const [correctAnswer, setCorrectAnswer] = useState(-1);
  const [math, setMath] = useState({
    left: 10,
    right: 9,
    operator: [`+`],
  });
  const { difficulty } = useParams();

  const streakRecord = JSON.parse(localStorage.getItem(`streak`)!);

  const operation =
    math.operator[Math.floor(Math.random() * math.operator.length)];

  const gameLogic = () => {
    switch (difficulty) {
      case `k-1`:
        setMath({
          left: Math.floor(Math.random() * 5),
          right: Math.floor(Math.random() * 5),
          operator: [`+`],
        });
        break;
      case `1-2`:
        setMath({
          left: Math.floor(Math.random() * 10),
          right: Math.floor(Math.random() * 10),
          operator: [`+`],
        });
        break;
      case `2-3`:
        setMath({
          left: Math.floor(Math.random() * 100),
          right: Math.floor(Math.random() * 100),
          operator: [`+`, `-`],
        });
        break;
      default:
        break;
    }
  };

  // Game logic
  useEffect(() => {
    gameLogic();
    setStreak(streakRecord);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const arithmatic = (a: number, b: number, operator: string) => {
    let solution;
    switch (operator) {
      case `+`:
        solution = b > a ? b + a : a + b;
        break;
      case `-`:
        solution = b > a ? b - a : a - b;
        break;
      case `*`:
        solution = b > a ? b * a : a * b;
        break;
      case `/`:
        solution = b > a ? b / a : a / b;
        break;
      default:
        `No compatable operator`;
        break;
    }

    return solution;
  };

  const equation = arithmatic(math.left, math.right, operation);

  useEffect(() => {
    if (localStorage.getItem('name'))
      setName(JSON.parse(localStorage.getItem('name')!));
  }, [setName]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.currentTarget;
    target.blur();
    if (equation === +target.answer.value) {
      setCorrectAnswer(1);
      difficulty &&
        setStreak((prevStreak) => ({
          ...prevStreak,
          [difficulty!]: prevStreak[difficulty] + 1,
        }));
    } else {
      setCorrectAnswer(0);
      setStreak((prevStreak) => ({
        ...prevStreak,
        [difficulty!]: 0,
      }));
    }

    target.answer.value = ``;
  };

  const nextQuestion = () => {
    gameLogic();
    setCorrectAnswer(-1);
  };

  return (
    <div className='fixed inset-0'>
      {correctAnswer == 1 && (
        <div className='bg-green-700 absolute top-0 -right-4 -left-4 bottom-0 z-50 bg-opacity-75 flex justify-evenly flex-col items-center'>
          <h2 className='text-5xl tracking-[0.4rem] font-heading text-center uppercase relative'>
            CORRECT!
          </h2>
          <img src={Victory} className='h-auto w-60' />
          <button
            type='button'
            className='bg-white w-4/5 border border-green-600 text-green-600 rounded-3xl p-4 font-body bottom-8'
            onClick={nextQuestion}
          >
            NEXT QUESTION
          </button>
        </div>
      )}
      {correctAnswer == 0 && (
        <div className='bg-red-700 absolute top-0 -right-4 -left-4 bottom-0 z-50 bg-opacity-75 flex justify-evenly flex-col items-center'>
          <h2 className='text-6xl tracking-[0.4rem] font-heading text-center uppercase relative'>
            WRONG!
          </h2>
          <p className='font-bold text-2xl'>{`Correct answer is: ${equation}`}</p>
          <img src={Cancel} className='h-auto w-60' />
          <button
            type='button'
            className='bg-white w-4/5 border border-green-600 text-green-600 rounded-3xl p-4 font-body bottom-8'
            onClick={nextQuestion}
          >
            NEXT QUESTION
          </button>
        </div>
      )}
      <div className='relative px-20'>
        <div className='pt-10 flex flex-col items-center h-screen'>
          <Link
            to='/difficulty'
            className='rounded-2xl border-2 border-white w-full text-center py-2 px-4 tracking-widest font-light font-body'
          >
            CHANGE DIFFICULTY
          </Link>
          <div className='mt-4'>
            <h2 className='text-2xl tracking-[0.4rem] font-heading text-center uppercase'>
              {name}, <br />
              Do your best!
            </h2>
            <div className='flex justify-between items-center font-body font-bold'>
              <p>STREAK:</p>
              <p className='text-green-500 tracking-widest'>
                {streak[difficulty!]}
              </p>
            </div>
            <div className='h-96 mt-20'>
              <form
                className='flex flex-col items-center justify-center gap-6'
                onSubmit={(e) => handleSubmit(e)}
              >
                <span className='text-7xl font-black'>{`${
                  math.right > math.left ? math.right : math.left
                } ${operation} ${
                  math.right > math.left ? math.left : math.right
                }`}</span>
                <label htmlFor='answer' />
                <input
                  name='answer'
                  type='text'
                  className='rounded-2xl border-2 border-white w-1/2 min-w-40 text-center py-2 px-4 tracking-widest font-bold font-body bg-transparent overflow-hidden text-6xl'
                  inputMode='numeric'
                />
                <button
                  type='submit'
                  className='bg-[#008B37] w-2/3 border rounded-3xl p-4 font-body fixed bottom-8'
                >
                  CHECK ANSWER
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
