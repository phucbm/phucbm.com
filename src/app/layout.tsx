import {Head} from 'nextra/components'
import 'nextra-theme-blog/style.css'
import '@/styles/globals.css'
import CustomFooter from "@/components/custom-footer";
import CustomHeader from "@/components/custom-header";
import {Layout} from "nextra-theme-blog";
import {GoogleAnalytics} from '@next/third-parties/google'
import {_metadata} from "@/lib/seo";
import {generatePageMetadata} from "@phucbm/next-og-image";
import {EB_Garamond, Plus_Jakarta_Sans} from 'next/font/google'
import {Gap} from "@/components/gap";
import React from "react";

export const generateMetadata = generatePageMetadata({
    ..._metadata,
    canonicalPath: "/"
});

const garamond = EB_Garamond({
    subsets: ['latin', 'vietnamese'],
    variable: '--font-garamond',
    display: 'swap',
    weight: ['400'],
});

const sans = Plus_Jakarta_Sans({
    subsets: ['latin', 'vietnamese'],
    variable: '--font-sans',
    display: 'swap',
    weight: ['300', '400', '500'],
});

export default async function RootLayout({children}) {
    return (
        <html
            // Not required, but good for SEO
            lang="en"
            // Required to be set
            dir="ltr"
            // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
            suppressHydrationWarning

            className={`${garamond.variable} ${sans.variable}`}
        >
        <Head backgroundColor={{dark: '#15120d', light: '#faf5e9'}}>
            <script defer src="https://cloud.umami.is/script.js"
                    data-website-id="f14c0833-d850-4d09-9c74-95cc97d95dc0"></script>
        </Head>
        <body className="min-h-screen">
        <div className="bg-[var(--color-background)]">
            <div className="max-w-[820px] mx-auto px-10">
                <Layout>
                    <CustomHeader/>
                    <Gap height={14}/>
                    <div className="py-2 px-1">
                        {children}
                    </div>
                    <Gap height={14}/>
                    <CustomFooter/>
                </Layout>
            </div>
        </div>
        </body>
        <GoogleAnalytics gaId="G-HXCF8TGQLN"/>
        </html>
    )
}