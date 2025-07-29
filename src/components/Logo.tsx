import Image from 'next/image'
import React from 'react'

const Logo = React.memo(({ justLogo = false }: { justLogo?: boolean }) => {
    return (
        <div className="flex gap-2 items-center">
            <Image
                src='/assets/logo.png'
                alt='Logo'
                width={24}
                height={24}
                className='rounded-full'
            />
            {
                !justLogo && (
                    <span className='font-bold text-2xl'>HD</span>
                )
            }
        </div>
    )
})

Logo.displayName = 'Logo'
export default Logo