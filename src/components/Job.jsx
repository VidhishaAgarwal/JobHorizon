import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({job}) => {
    const navigate= useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }

    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
            <div className="flex items-center justify-between">
                <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
                <Button variant="outline" className='rounded-full' size="icon"><Bookmark /></Button>
            </div>
            <div className="flex items-center gap-2 my-2">
                <Button className='p-6' variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAn1BMVEWBvAb/uggFpvDzUyXz8/P/tADz9Pbz8/H29Pbz9/j29Pj59vPy9fn/+fPz8fLz/v/79//43bHzrqG/2KF3twDz5+WXxk3z3Njh6tb25crj7fMAn/AAo/DzQADzn47q7uTzclXJ4fJBrvD07uSy1vK01IfzTBf+v0KGyPH70ofzzMTV48DzMwDzmIav0n3zaU3169n61pP+vTQAmPD7z3wtZuZeAAABhElEQVR4nO3cyTYDURSG0aBSaUSQBulE9E0I4v2fzSCpiqWMLIfI2t8L/HeP7uyUkg2q9NcP+MlyTNoMqpJvVYJKP2PSZiuo+9piof7QDirX5JjudBTS9HF/sXDw1AlqXC1gRjshjU4zzFUpJhgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYmI3EXIf0AdP5LUzSnZ2FNGtlmPZRUEVM8zio7vKITnV8ElR+c2h1q6kWVTZQrQeVFDEbEMy6BrOurTC7UWUDaSOoIiadBNVfatLnXlDFf6Z/HtTt3mKg8fJ6E9PF58tzSX8wDGmQY+7KWyGVv8AMt0OCgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGB+Q5mPghpnmPeykEVMellUJPlEZ1G7zCoSgHzj8ssG4HJewcb/mAatajuPAAAAABJRU5ErkJggg==' />
                    </Avatar>
                </Button>
                <div className="">
                    <h1 className="font-medium text-lg">{job?.company?.name}</h1>
                    <p className="text-sm text-gray-500">India</p>
                </div>
            </div>
            <div className="">
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className="flex items-center gap-2 mt-2">
                <Badge className={'text-blue-700 font-bold bg-transparent cursor-pointer'} varient='ghost'>{job?.position} positions</Badge>
                <Badge className={'text-[#F83002] font-bold bg-transparent cursor-pointer'} varient='ghost'>{job?.jobType} Part Time</Badge>
                <Badge className={'text-[#720B97] font-bold bg-transparent cursor-pointer'} varient='ghost'>{job?.salary} LPA</Badge>
            </div>
            <div className="flex items-center gap-4 mt-4">
                <Button onClick={()=> navigate('/description/${job?._id}')} variant='outline'>Details</Button>
                <Button className='bg-[#7209b7]'>Save For Later</Button>
            </div>
        </div>
    )
}

export default Job