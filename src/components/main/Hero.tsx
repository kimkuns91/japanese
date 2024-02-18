import Image from 'next/image';
import { IoBook } from 'react-icons/io5';
import LinkButton from '../LinkButton';

const Hero = () => {
  return (
    <div className="">
      <div className="flex justify-between rounded-md bg-[#F4F8FC] px-10 pb-20 pt-10">
        <Image
          src={'/images/Character.png'}
          alt="Character"
          width={120}
          height={100}
        />
        <div className="flex flex-col items-center justify-end">
          <p className="text-2xl font-bold">어휘 학습</p>
          <div className="flex items-center">
            <p>하루 목표 :</p>
            <select>
              <option value="">5개</option>
              <option value="">10개</option>
              <option value="">20개</option>
              <option value="">30개</option>
            </select>
          </div>
        </div>
      </div>
      <LinkButton href="/learning" className='mx-auto mt-[-25px] w-2/3 text-xl'>
        <IoBook />
        오늘의 학습
      </LinkButton>
    </div>
  );
};

export default Hero;
