import Head from 'next/head'
import img from 'next/image'
import Layout from '../components/layout/layout'
import FormConverter from  '../components/formConverter/formConverter'
import DatePick from '../components/datePick/datePick'

export default function Home() {
  return (
    <div className="container">
      <Layout />
      <main>
          <DatePick />
          <FormConverter />
      </main>
    </div>
  )
}
