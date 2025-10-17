import Lottie from 'react-lottie-player'
import notFoundAnimation from '../../animation/warrior.json'
import { Button } from '../ui/button';
import { ArrowBigLeft } from 'lucide-react';
import { Link } from '@tanstack/react-router';

const Forbidden = () => {
    return (
        <div className='flex flex-col items-center p-4'>
            <h1 className='text-7xl font-lohengrin text-black'>403</h1>
            <Lottie
                loop
                animationData={notFoundAnimation}
                play
                className='h-72 mb-4'
            />
            <div className='flex flex-col items-center space-y-4 mb-4 text-center'>
                <h1 className='font-bold text-4xl '>Forbidden</h1>
                <p className='text-gray-500 p-4'>Halt, traveler! Thou hast ventured into forbidden lands. Best turn back before ye find trouble!</p>
                <Link to='/'>
                    <Button><ArrowBigLeft /> Go To Homepage</Button>
                </Link>
            </div>
        </div>)
};

export default Forbidden;
