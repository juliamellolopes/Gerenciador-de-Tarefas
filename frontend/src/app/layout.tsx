import './globals.css'
import { ReactNode } from 'react'
import StyledComponentsRegistry from './lib/registry'
import { GlobalStyle } from '@/styles/globals'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <GlobalStyle />
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
