// src/app/page.tsx
import Hero from '@/components/Hero';
import Benefits from '@/components/Benefits';
import Curriculum from '@/components/Curriculum';
import ValueProposition from '@/components/ValueProposition';
import Proof from '@/components/Proof';
import Instructor from '@/components/Instructor';
import Steps from '@/components/Steps';
import FAQ from '@/components/FAQ';
import Future from '@/components/Future';
import CallToAction from '@/components/CallToAction';
import FloatingCTA from '@/components/FloatingCTA';


export default function Home() {
  return (
    <main>
      <Hero />

      <Curriculum />
      <ValueProposition />

      <Benefits />
      <Steps />
      <Instructor />

      <Proof />

      <FAQ />
      <Future />
      <CallToAction />
      <FloatingCTA />

    </main>
  );
}