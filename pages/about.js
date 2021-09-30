import Head from "next/head"
import { Tabs } from '../components/tabs'


export default function About() {
  return (
    <div>
      <Head>
        <title>about page</title>
      </Head>
      <div className="title">
        Clean Cheat Sheet
      </div>

      <Tabs></Tabs>

        {/* <p>
      An open collaborative tool for creating designed and clean cheat sheets.
      You add your content and we generate the cheat sheet.

      1. Enjoy the power of collaboration
         Search in the wide library of existing sheets to get all the tips and tricks of your everydays programming languages and tools.

      1. Make your own personal cheat sheet
       Use the Clean Cheat Sheet tool to format your very personal notes

       We take no credit for any of the contents 
       </p> */}

    </div>
  )
}