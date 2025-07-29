import Logo from '@/components/Logo'
import Image from 'next/image'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='h-screen grid grid-cols-1 md:grid-cols-2 p-2'>
            <div className='flex items-center flex-col justify-center h-full w-full p-4'>
                <div className="w-full">
                    <Logo />
                </div>

                <div className='h-full flex w-full flex-col justify-center items-center'>{children}</div>
            </div>
            <div className='w-full h-full hidden md:block'>
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