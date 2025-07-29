export const getOtp = async (email: string, isSigIn = false) => {
    const res = await fetch('/api/auth/otp-request', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, isSigIn }),
    })
    const data = await res.json()
    if (!data.success) {
        return {
            success: false,
            error: data.error || 'Failed to send OTP',
        }
    }
    return {
        success: true,
    }
}