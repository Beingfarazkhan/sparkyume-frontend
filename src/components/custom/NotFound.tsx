import Lottie from 'react-lottie-player'
import notFoundAnimation from '../../animation/HvkpFkDZxZ.json'
import { Button } from '../ui/button';
import { ArrowBigLeft } from 'lucide-react';
import { Link } from '@tanstack/react-router';

const NotFound = () => {
    return (
        <div className='flex flex-col items-center p-4'>
            <Lottie
                loop
                animationData={notFoundAnimation}
                play
                className='h-96'
            />
            <div className='flex flex-col items-center space-y-4 mb-4 text-center'>
                <h1 className='font-bold text-4xl '>Page Not Found</h1>
                <p className='text-gray-500 p-4'>Oops, it looks like the page you're looking for doesn't exist.</p>
                <Link to='/'>
                    <Button><ArrowBigLeft /> Go To Homepage</Button>
                </Link>
            </div>
        </div>)
};

export default NotFound;
