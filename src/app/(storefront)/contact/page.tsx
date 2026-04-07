import { Metadata } from "next";
import { Mail, MessageSquare, Send } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Psilocyber Underworld",
  description: "Get in touch with Psilocyber Underworld for any questions regarding our genetics or orders.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 bg-black">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col items-center text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            Have a question about a recent order or curious about our genetics? We're here to help you navigate the underworld.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Contact Info Sidebar */}
          <div className="col-span-1 space-y-6">
            <div className="glass p-8 rounded-3xl border border-white/10 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 border border-primary/20">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Email Us</h3>
              <p className="text-sm text-muted-foreground mb-4">
                We aim to respond to all inquiries within 24 hours.
              </p>
              <a href="mailto:mycelialfunguy@gmail.com" className="text-primary font-medium hover:underline">
                mycelialfunguy@gmail.com
              </a>
            </div>

            <div className="glass p-8 rounded-3xl border border-white/10 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 border border-primary/20">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Support Hours</h3>
              <p className="text-sm text-muted-foreground">
                Monday - Friday<br />
                9:00 AM - 5:00 PM EST
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-span-1 md:col-span-2">
            <div className="glass p-8 md:p-10 rounded-3xl border border-white/10 relative overflow-hidden h-full">
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -z-10" />
              
              <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
              
              <form 
                action="https://formsubmit.co/mycelialfunguy@gmail.com" 
                method="POST"
                className="space-y-6 relative z-10"
              >
                {/* FormSubmit Configuration */}
                <input type="hidden" name="_subject" value="New Contact Form Submission - Psilocyber" />
                <input type="hidden" name="_captcha" value="false" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-muted-foreground">Your Name</label>
                    <input 
                      type="text" 
                      id="name"
                      name="name" 
                      required 
                      className="w-full bg-black/40 border border-white/10 rounded-md p-3 text-white placeholder-muted-foreground focus:ring-1 focus:ring-primary outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-muted-foreground">Email Address</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email" 
                      required 
                      className="w-full bg-black/40 border border-white/10 rounded-md p-3 text-white placeholder-muted-foreground focus:ring-1 focus:ring-primary outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-muted-foreground">Your Message</label>
                  <textarea 
                    id="message"
                    name="message" 
                    rows={6} 
                    required 
                    className="w-full bg-black/40 border border-white/10 rounded-md p-3 text-white placeholder-muted-foreground focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                    placeholder="How can we help?"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full group relative inline-flex items-center justify-center px-8 py-4 font-bold text-black bg-primary rounded-xl overflow-hidden transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Send Message
                    <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
              </form>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
