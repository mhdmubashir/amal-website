import React from 'react';
import Head from 'next/head';
import { ThemeProvider } from '../context/ThemeContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: { Component: React.ComponentType; pageProps: any }) {
  return (
    <>
     <Head>
             <title>Amal College</title>
        <link rel="icon" href="/images/logo.png" />
            <meta name="description" content="Amal College Nilambur - Official website for Amal College, Amal Campus, Nilambur. Explore courses, events, admissions, and campus life." />
            <meta name="keywords" content="Amal College, Amal Campus, Amal Nilambur, Amal College Nilambur, Nilambur College, Kerala College, Amal College Admission, Amal College Events" />
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href="https://amal-college.vercel.app/" />
            <meta property="og:title" content="Amal College Nilambur | Amal Campus" />
            <meta property="og:description" content="Official website for Amal College, Amal Campus, Nilambur. Explore courses, events, admissions, and campus life." />
            <meta property="og:image" content="/images/logo.png" />
            <meta property="og:url" content="https://amal-college.vercel.app/" />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Amal College Nilambur | Amal Campus" />
            <meta name="twitter:description" content="Official website for Amal College, Amal Campus, Nilambur." />
            <meta name="twitter:image" content="/images/logo.png" />
            <script type="application/ld+json">{`
              {
                "@context": "https://schema.org",
                "@type": "CollegeOrUniversity",
                "name": "Amal College Nilambur",
                "url": "https://amal-college.vercel.app/",
                "logo": "https://amal-college.vercel.app/images/logo.png",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Amal College, Nilambur",
                  "addressLocality": "Nilambur",
                  "addressRegion": "Kerala",
                  "postalCode": "679329",
                  "addressCountry": "IN"
                },
                "sameAs": [
                  "https://www.facebook.com/yourcollegepage",
                  "https://www.instagram.com/yourcollegepage"
                ]
              }
            `}</script>
          </Head>
      
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;