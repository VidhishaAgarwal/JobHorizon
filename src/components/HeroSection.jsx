import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Search } from 'lucide-react'

const HeroSection = () => {
    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <span className=' mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>Get Hired Today</span>
                <h1 className='text-5xl font-bold'>Search , Apply & <br /> Get Your <span className='text-[#6A38C2] '>Dream Jobs</span></h1>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, fuga ducimus tempora delectus repellat quis.</p>
                <div className='flex w-[40%] shadow-lg border  border-gray-200 rounded-full items-center gap-4 mx-auto pl-3'>
                    <input
                    className="border-none outline-none w-full"
                    type = "text"
                    placeholder = 'search your dream job'
                    />
                    <Button className='rounded-r-full bg-[#6A38C2]'>
                        <Search className='h-5 w-5'/>
                    </Button>
                </div>
            </div>

        </div>
    )
}

export default HeroSection