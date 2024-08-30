import { Poppins } from 'next/font/google'

export const regular = Poppins ({ subsets: ['latin'], weight: "300", variable: '--fontRegular'})
export const medium = Poppins ({subsets: ['latin'], weight:"500", variable: '--fontMedium'})
export const semiBold = Poppins ({subsets: ['latin'], weight:"700", variable: '--fontSemiBold'})
export const bold = Poppins ({subsets: ['latin'], weight: "900", variable: '--fontBold'})