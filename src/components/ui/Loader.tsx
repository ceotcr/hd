import Image from 'next/image'
import React from 'react'

const Loader = () => {
    return (
        <Image src="/assets/logo.png" width={40} height={40} alt='loading' className='animate-spin' />
    )
}

export default Loader