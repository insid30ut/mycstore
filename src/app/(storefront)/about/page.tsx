import { Metadata } from "next";
import { Sprout, Microscope, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Story | Psilocyber Underworld",
  description: "Learn how Psilocyber Underworld started from a passion for mycology, and our mission to provide the best tools and genetics for mushroom cultivation.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 bg-black">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col items-center text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
            From Hobbyist to <span className="text-primary">Underworld</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            Democratizing mycology with premium genetics, sterile tools, and transparent information for researchers of all levels.
          </p>
        </div>
        
        <div className="glass p-8 md:p-12 rounded-3xl border border-white/10 mb-16 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -z-10" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -z-10" />

          <div className="prose prose-invert max-w-none relative z-10">
            <p className="text-xl leading-relaxed text-white/90 mb-8 font-medium">
              Psilocyber Underworld hasn't always been what it is today. Like many of you, I started exploring the fascinating and vastly complex world of mycology from a small corner of my home, driven purely by curiosity and a profound respect for fungi.
            </p>

            <div className="w-12 h-1 bg-primary/30 rounded-full mb-8" />

            <p className="text-lg leading-relaxed text-muted-foreground mb-6">
              During those early days, I struggled with the same hurdles every beginner faces: finding reliable, clean spores, sourcing quality substrates, and getting access to the right sterile tools without breaking the bank. There was a lot of misinformation out there, and the barrier to entry felt unnecessarily high.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground mb-6">
              Through trial, error, and thousands of hours working under the hood, I perfected my techniques. I developed a deep understanding of what it takes to cultivate successfully, keep genetics preserved, and maintain an absolutely sterile environment.
            </p>
            <p className="text-lg leading-relaxed text-white/80">
              I realized I didn't want this knowledge—and these premium, robust genetics—to stay locked away in my personal lab. That's why I created Psilocyber Underworld. My mission is simple: to provide anyone with the verifiable genetics, sterile tools, and clear information they need to succeed in mycology.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass p-8 rounded-2xl border border-white/10 flex flex-col items-center text-center hover:border-primary/50 transition-colors">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 border border-primary/20">
              <Microscope className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Research Grade</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Top-tier genetics prepared and verified strictly under sterile flow-hood conditions for rigorous microscopy.
            </p>
          </div>
          
          <div className="glass p-8 rounded-2xl border border-white/10 flex flex-col items-center text-center hover:border-primary/50 transition-colors">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 border border-primary/20">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">For Everyone</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Whether a seasoned mycologist or a complete beginner, our tools are accessible and straightforward.
            </p>
          </div>
          
          <div className="glass p-8 rounded-2xl border border-white/10 flex flex-col items-center text-center hover:border-primary/50 transition-colors">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 border border-primary/20">
              <Sprout className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Cultivation Passion</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Built by a hobbyist, for hobbyists. We genuinely care about the craft, the science, and the mycology community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
