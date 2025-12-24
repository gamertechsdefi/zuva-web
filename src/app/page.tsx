import Header from "@/components/Header";
import Image from "next/image";
import { Smartphone, Zap, Layout, Gift } from "lucide-react";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="">
      <Header />
      <main className="">
        <section className="px-8 relative flex flex-col items-center justify-start pt-32 md:pt-64 min-h-screen text-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 -z-10">
            <Image
              src="/images/background-landing.png"
              alt="Background"
              fill
              className="object-cover md:object-fill"
              priority
            />
          </div>

          <div className="relative z-10 flex flex-col items-center max-w-7xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-bold text-yellow-500">Mine the new digital mining wealth</h1>
            <p className="mt-4 text-md md:text-lg">Join the future of decentralized finance and mining</p>

            <button className="mt-6 rounded-full border-b-3 border-gray-500 bg-gray-200 px-12 py-3 text-md md:text-lg font-medium text-black hover:bg-gray-300 transition-colors">
              Download App
            </button>
          </div>
        </section>

        <section className="mx-auto py-24 px-8 flex flex-col md:items-center md:justify-center md:text-center mx-auto max-w-6xl">
          <h1 className="text-yellow-500 text-5xl md:text-6xl font-bold">Why Zuva Network</h1>
          <p className="mt-4 text-md md:text-xl  flex flex-col gap-4">
            <span>
              In the crypto world, few pains sting like the regret of missed opportunities. Many dismissed Bitcoin in its early days—when it traded for pennies—only to watch it soar to tens of thousands, turning tiny investments into fortunes. "If only I'd bought when it was cheap," they lament, haunted by stories of 10,000 BTC pizzas and discarded hard drives worth millions.
            </span>
            <span>
              Then came Pi Network in 2019, promising crypto for everyone. Millions "mined" it on their phones with a simple tap, building circles and dreaming it would be &quot;the next Bitcoin.&quot; But after years of delays, the 2025 mainnet launch delivered low prices, high volatility, and limited gains for many, leaving them whispering, <span className="italic font-bold">&quot;We missed again.&quot;</span>
            </span>
            <span>
              Countless everyday people: office workers, students, entrepreneurs felt this double regret: sidelined by Bitcoin&rsquo;s rise and disappointed by Pi&rsquo;s reality.
              From that collective ache rose Zuva.

            </span>
            <span className="font-medium">
              Zuva Network, launched in late 2025 as the crypto for those burned by regret. Founded by developers, economists, and community builders who missed both Bitcoin and Pi&rsquo;s peak, Zuva isn't just another token; it's a <span className="font-bold">redemption arc.</span>
            </span>
          </p>
        </section>

        <section className="py-16 px-8 md:px-32">

          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex flex-col items-center text-center p-6 bg-gray-900 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
                <div className="mb-4 text-yellow-400">
                  <Smartphone size={40} />
                </div>
                <h3 className="text-xl font-bold mb-2">Mobile First Design</h3>
                <p className="text-gray-400">Optimized for seamless experience on all your devices</p>
              </div>

              <div className="flex flex-col items-center text-center p-6 bg-gray-900 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
                <div className="mb-4 text-yellow-400">
                  <Zap size={40} />
                </div>
                <h3 className="text-xl font-bold mb-2">Computationally Effective</h3>
                <p className="text-gray-400">Lightweight protocols that won't drain your battery</p>
              </div>

              <div className="flex flex-col items-center text-center p-6 bg-gray-900 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
                <div className="mb-4 text-yellow-400">
                  <Layout size={40} />
                </div>
                <h3 className="text-xl font-bold mb-2">User Friendly Interface</h3>
                <p className="text-gray-400">Intuitive design making crypto accessible to everyone</p>
              </div>

              <div className="flex flex-col items-center text-center p-6 bg-gray-900 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
                <div className="mb-4 text-yellow-400">
                  <Gift size={40} />
                </div>
                <h3 className="text-xl font-bold mb-2">Rewards</h3>
                <p className="text-gray-400">Earn consistent rewards for participating in the network</p>
              </div>
            </div>
          </div>

        </section>


        <section className="container mx-auto px-8 py-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-left">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Experience the Future of <span className="text-yellow-400 text-4xl md:text-6xl">Social Mining</span>
            </h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Zuva Network isn't just an app; it's a movement. Connect with millions of users worldwide,
              build your mining circle, and secure your financial future, all from the palm of your hand.
              No expensive hardware, no battery drain, just pure potential.
            </p>
            <button className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors">
              Get Started Now
            </button>
          </div>
          <div className="flex-1 relative w-full h-[400px] bg-gray-900/50 rounded-2xl border border-gray-800 flex items-center justify-center overflow-hidden">
            {/* Text placeholder for user image */}
            <div className="text-center p-8">
              <p className="text-gray-500 font-medium">Place your app screenshot here</p>
              <p className="text-xs text-gray-600 mt-2">Recommended size: 600x800</p>
            </div>
            {/* Un-comment the line below to use an image */}
            {/* <Image src="/your-image.png" alt="App Interface" fill className="object-cover" /> */}
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}