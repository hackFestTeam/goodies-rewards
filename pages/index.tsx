import Head from "next/head";
import Container from "../components/Container";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Hackfest Designs - A Fashion tool to play with different types of outfits</title>
        <meta name='Hackfest Designs' content='A fashion tool to test out new outfits before going to shopping.' />
        <link rel='icon' href='/magic-wand.svg' />
      </Head>

      <Container />
    </div>
  );
}
