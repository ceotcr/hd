import Image from 'next/image'
import React from 'react'

const Logo = React.memo(() => {
    return (
        <div className="flex gap-2 items-center">
            <Image
                src='/assets/logo.png'
                alt='Logo'
                width={32}
                height={32}
                className='rounded-full'
            />
            <span className='font-bold text-3xl'>HD</span>
        </div>
    )
})

export default Logo