import Head from "next/head";
import { Headline } from "../components/headline";
import { CardMosaic } from "../components/card";
import { PlaceholderLeft, PlaceholderRight } from "../components/placeholder";
import { Triptych } from "../components/triptych";

export default function About() {
  return (
    <div>
      <Head>
        <title>Clean Cheat Sheet</title>
        <meta name="description" content="Clean Cheat Sheet for everything" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Headline
        title="Stop searching the same thing on Google 10 times a day."
        subtitle="Use sheets made by the community or create yours and never loose time again to find a single command"
      />
      <CardMosaic
        displayText={true}
        title="Discover the CleanCheatSheets"
        text="Use sheets made by the community or create yours and never loose time again to find a single command."
        cards={[
          {
            link: "/markdown",
            title: "Markdown",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
            src: "/markdown.png",
          },
          {
            link: "/markdown",
            title: "Markdown",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
            src: "/markdown.png",
          },
          {
            link: "/markdown",
            title: "Markdown",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
            src: "/markdown.png",
          },
          {
            link: "/markdown",
            title: "Markdown",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
            src: "/markdown.png",
          },
          {
            link: "/markdown",
            title: "Markdown",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
            src: "/markdown.png",
          },
          {
            link: "/markdown",
            title: "Markdown",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
            src: "/markdown.png",
          },
          {
            link: "/markdown",
            title: "Markdown",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
            src: "/markdown.png",
          },
          {
            link: "/markdown",
            title: "Markdown",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
            src: "/markdown.png",
          },
          {
            link: "/markdown",
            title: "Markdown",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
            src: "/markdown.png",
          },
        ]}
      />
      <PlaceholderLeft
        title="Create your own sheet"
        text="Use sheets made by the community or create yours and never loose time again to find a single command"
        src="/image-placeholder.png"
        alt="Image placeholder"
        buttonAngle="bottomRight"
        buttonText="Learn More"
        link="/about"
      />
      <PlaceholderRight
        title="Create your own sheet"
        text="Use sheets made by the community or create yours and never loose time again to find a single command"
        src="/image-placeholder.png"
        alt="Image placeholder"
        buttonAngle="topLeft"
        buttonText="Learn More"
        link="/about"
      />
      <Triptych
        buttonAngle="bottomRight"
        buttonText="Learn More"
        link="/about"
      />
    </div>
  );
}
