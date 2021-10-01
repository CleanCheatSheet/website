import Head from "next/head"
import { Tabs } from '../components/tabs'


export default function About() {
  const title = [ "Search through the basics", "Make your own", "Share it"]
  const content1 = []
  content1['title'] = "Enjoy the power of collaboration."
  content1['paragraph'] = "Search in the wide library of existing sheets to get all the tips and tricks of your everydays programming languages and tools."
  
  const content2 = []
  content2['title'] = "Make your own personal cheat sheet."
  content2['paragraph'] = "Use the Clean Cheat Sheet tool to format your very personal notes."
  
  const content3 = []
  content3['title'] = "Contribute."
  content3['paragraph'] = "Share your created sheets on github so that everybody can use it."
  
  const content = [ content1, content2, content3]
  
  console.log(content)

  return (
    <div>
      <Head>
        <title>about page</title>
      </Head>
      {/* <div className="title">
        Clean Cheat Sheet
      </div> */}


      <Tabs title={title} content={content}></Tabs>

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