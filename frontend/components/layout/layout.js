import styles from './layout.module.css'
import utilStyles from '../../styles/utils.module.css'

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

export default function Layout() {
    return <div className={styles.container}>
                <Head>
                    <title>Lokki Trial</title>
                    <link rel="icon" href="/images/connect-small.svg" />
                </Head>
                <header className={styles.header}>
                    <Image
                        priority
                        src="/images/lokki.svg"
                        className={utilStyles.borderCircle}
                        width={300}
                        height={100}
                        alt={'Logo'}
                    />
                    <h1 className={utilStyles.headingXl}>&#129310; Lokki Trial - Technical Test &#129310;</h1>
                    <h2 className={utilStyles.headingMd}>🚀 Currencies converter <Link href="https://lokki.notion.site/Cas-Technique-Full-Stack-Senior-e8399c7df77345a1beb52c84276155cf">(subjet)</Link> 🚀</h2>
                </header>
            </div>
}
