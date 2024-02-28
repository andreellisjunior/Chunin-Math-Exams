import { Link } from 'react-router-dom';

type Card = {
  difficulty: string;
  bgColor: string;
  link?: string;
  status?: number;
};

const Card = ({ difficulty, bgColor, link, status }: Card) => {
  return (
    <div className='relative'>
      {!status && (
        <div className='bg-black absolute z-10 h-full w-full bg-opacity-50 rounded-xl flex items-center justify-center text-center'>
          <h3 className='text-3xl -rotate-45'>COMING SOON!</h3>
        </div>
      )}
      <Link
        to={`/difficulty/board/${link}`}
        className={`w-full h-32 ${bgColor} rounded-xl p-2 flex flex-col items-center justify-center border-white border-[1px] font-body`}
      >
        <h4 className='text-5xl'>{difficulty}</h4>
        <p className='font-thin tracking-widest'>GRADE</p>
      </Link>
    </div>
  );
};

export default Card;
