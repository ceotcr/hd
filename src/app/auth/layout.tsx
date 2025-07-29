import Logo from '@/components/Logo'
import Image from 'next/image'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='h-screen grid grid-cols-1 gap-1 md:grid-cols-2'>
            <div className='grid grid-cols-1 items-center overflow-y-auto gap-4 flex-col justify-center h-screen w-full px-4'>
                <div className="w-full h-fit mt-4 flex max-md:justify-center">
                    <Logo />
                </div>

                <div className='flex w-full flex-col my-auto justify-center pb-4 items-center'>{children}</div>
            </div>
            <div className='w-full h-full p-2 hidden md:block'>
                <Image
                    src='/assets/auth-bg-i.jpg'
                    alt='Auth Image'
                    width={1920}
                    height={1080}
                    className='w-full h-full object-cover rounded-2xl'
                />
            </div>
        </div>
    )
}

export default Layout