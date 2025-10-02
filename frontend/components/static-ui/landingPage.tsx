"use client"
import React from 'react'
import { motion } from 'framer-motion';
import Image from 'next/image';
// shadcn/ui components (assumes you scaffolded shadcn into /components/ui)
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { Trophy, ShieldCheck, Bolt, AmpersandIcon} from 'lucide-react';


// NOTE: This is a single-file React component intended to be used as
// the landing page for Azmera Bet. Put this file in `app/(marketing)/page.tsx`
// or `components/LandingPage.tsx` and import it into `app/page.tsx`.
//
// Required packages:
// - shadcn/ui (components scaffolded into /components/ui)
// - lucide-react
// - framer-motion
// - next/image (built-in)
//
// Tailwind is used for styling and assumes shadcn's recommended setup.

const features = [
  {
    title: 'Instant Deposits & Withdrawals',
    desc: 'Fast and reliable payments so you never miss a bet.',
    icon: Bolt,
  },
  {
    title: 'Live Odds & Stats',
    desc: 'Real-time data and analytics for smarter plays.',
    icon: Trophy,
  },
  {
    title: 'Provably Fair & Secure',
    desc: 'Blockchain-backed transparency and enterprise-grade security.',
    icon: ShieldCheck,
  },
  {
    title: 'Multi-language Support',
    desc: 'English, Amharic and more — play in your language.',
    icon: AmpersandIcon
    
  },
];

const LandingPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-slate-100">
  
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-extrabold leading-tight"
          >
            Bet Smarter. <span className="text-indigo-400">Win Bigger</span> with <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">Azmera Bet</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="mt-6 text-slate-300 max-w-xl"
          >
            Real-time odds, fast payouts, and provably fair technology — designed for players who want power and simplicity. Join thousands of players today.
          </motion.p>

          <div className="mt-8 flex gap-4">
            <Button size="lg" className="rounded-xl">Sign Up & Claim Bonus</Button>
            <Button variant="secondary" size="lg" className="rounded-xl">Explore Games</Button>
          </div>

          <div className="mt-8 flex gap-4 items-center text-sm text-slate-400">
            <Badge>Trusted</Badge>
            <p>Verified payouts — Secure and regulated.</p>
          </div>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard label="Active Bets" value="12,482" />
            <StatCard label="Daily Payouts" value="$124K" />
            <StatCard label="Live Markets" value="1,254" />
            <StatCard label="Avg Payout Time" value="< 5 mins" />
          </div>
        </div>

        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-800 to-slate-900"
          >
            <div className="relative w-full h-[420px]">
              <Image
                src="https://images.unsplash.com/photo-1521412644187-c49fa049e84d?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder"
                alt="Live betting mockup"
                fill
                style={{ objectFit: 'cover' }}
                priority
              />

              <div className="absolute bottom-4 left-4 bg-gradient-to-r from-black/50 to-black/20 p-3 rounded-lg backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/10 rounded-md flex items-center justify-center">🏟️</div>
                  <div>
                    <p className="text-xs text-slate-300">LIVE</p>
                    <p className="font-medium">Ethiopia League — Addis FC vs Bahir</p>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2">
                  <OddsChip team="Addis FC" odd="1.85" />
                  <OddsChip team="Draw" odd="3.40" />
                  <OddsChip team="Bahir" odd="2.10" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h3 className="text-2xl font-semibold">Why Azmera Bet?</h3>
        <p className="text-slate-400 mt-2 max-w-2xl">Everything you need for an exceptional betting experience — speed, fairness, and local support.</p>

        <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <Card key={f.title} className="p-4 bg-slate-800/60">
              <CardHeader className="flex items-center gap-3 p-0">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
                  <f.icon className="w-5 h-5 text-black" />
                </div>
                <CardTitle className="text-base">{f.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0 mt-3 text-slate-300">{f.desc}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* SHOWCASE */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ShowcaseCard title="Live Betting" desc="Real-time markets & in-play bets" img="https://images.unsplash.com/photo-1517927033932-b3d6e6e0e6a8?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder" />
          <ShowcaseCard title="Casino & Slots" desc="Top provably fair slot titles" img="https://images.unsplash.com/photo-1549921296-3a6f7a9a2f87?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder" />
          <ShowcaseCard title="Player Dashboard" desc="Easy deposits, fast withdrawals" img="https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder" />
        </div>
      </section>

      {/* PROMOTIONS */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h3 className="text-2xl font-semibold">Promotions</h3>
        <p className="text-slate-400 mt-2 max-w-2xl">Get extra value — new and recurring promotions to keep things exciting.</p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <PromoCard title="Welcome Bonus" subtitle="100% Deposit Match up to $200" />
          <PromoCard title="Free Bet Fridays" subtitle="Weekly free bet for top players" />
        </div>
      </section>

      {/* TRUST */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <h3 className="text-2xl font-semibold">Trusted & Secure</h3>
            <p className="text-slate-400 mt-2 max-w-xl">Azmera Bet is built with privacy, security, and fairness as core principles. We use encryption, audits, and provably fair systems to protect your play.</p>

            <div className="mt-6 flex gap-4 items-center">
              <Badge>Licensed</Badge>
              <Badge>SSL Secured</Badge>
              <Badge>KYC & Responsible Gaming</Badge>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-3 gap-3">
            <TrustStat label="Payouts / day" value="$124K+" />
            <TrustStat label="Players" value="214K" />
            <TrustStat label="Avg Payout" value="< 5 mins" />
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="bg-gradient-to-r from-indigo-600 to-violet-600 py-12 mt-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-3xl font-bold">Join thousands winning at Azmera Bet</h3>
            <p className="mt-2 text-slate-100/90">Fast onboarding. Secure payouts. Play responsibly.</p>
          </div>
          <div className="flex gap-4">
            <Button size="lg">Start Betting Now</Button>
            <Button variant="secondary" size="lg">Learn More</Button>
          </div>
        </div>
      </section>

   
    </main>
  )
}

export default LandingPage


/* ------------------------- Helper / Small components ------------------------- */

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/40 p-4 rounded-lg">
      <p className="text-sm text-slate-50">{label}</p>
      <p className="text-lg font-semibold mt-1">{value}</p>
    </div>
  );
}

function OddsChip({ team, odd }: { team: string; odd: string }) {
  return (
    <div className="px-3 py-2 bg-white/6 rounded-md flex flex-col">
      <span className="text-xs text-slate-50">{team}</span>
      <span className="font-medium">{odd}</span>
    </div>
  );
}

function ShowcaseCard({ title, desc, img }: { title: string; desc: string; img: string }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-40 w-full">
        <Image src={img} alt={title} fill style={{ objectFit: 'cover' }} />
      </div>
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="mt-1">{desc}</CardDescription>
      </CardContent>
    </Card>
  );
}

function PromoCard({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-700/40 to-indigo-700/30">
      <h4 className="text-xl font-semibold">{title}</h4>
      <p className="mt-2 text-slate-200">{subtitle}</p>
      <div className="mt-4">
        <Button>Claim</Button>
      </div>
    </div>
  );
}

function TrustStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-4 rounded-lg bg-slate-800/50 text-center">
      <p className="text-sm text-slate-50">{label}</p>
      <p className="text-lg font-semibold mt-1">{value}</p>
    </div>
  );
}

