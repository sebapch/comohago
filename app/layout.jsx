import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Como se hace?</title>
      </head>
      
      <body  className='bg-black'>{children}</body>
    </html>
  )
}
