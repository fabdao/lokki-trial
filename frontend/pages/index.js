import Head from 'next/head'
import img from 'next/image'
import Layout from '../components/layout/layout'
import FormConverter from  '../components/formConverter/formConverter'
import Result from "../components/result/result";

export default function Home() {
  return (
    <div className="container">
      <Layout />
      <main>
          <FormConverter />
          <Result />
      </main>
    </div>
  )
}
