export const getOtp = async (email: string) => {
    const res = await fetch('/api/auth/otp-request', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    })
    if (!res.ok) {
        throw new Error('Failed to request OTP')
    }
    const data = await res.json()
    if (!data.success) {
        return false
    }
    return true
}