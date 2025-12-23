import { Check, X, Play, Pause, Volume2, Music, ExternalLink } from "lucide-react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";

const voiceTraits = [
  {
    trait: "Calm",
    description: "Never rushed or pushy. We speak with measured confidence.",
    example: "Take your time. We're here when you're ready."
  },
  {
    trait: "Professional",
    description: "Expert knowledge delivered accessibly.",
    example: "Our process ensures lasting quality, not quick fixes."
  },
  {
    trait: "Honest",
    description: "Transparent about process, pricing, and expectations.",
    example: "Here's exactly what to expect, step by step."
  },
  {
    trait: "Warm",
    description: "Genuinely caring about your home and experience.",
    example: "Your bathroom should bring you joy every day."
  },
  {
    trait: "Confident",
    description: "Assured but never arrogant. Quality speaks for itself.",
    example: "We stand behind every project we complete."
  }
];

interface AudioPlayerProps {
  src: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  externalLink?: string;
}

const AudioPlayer = ({ src, title, subtitle, icon, externalLink }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border flex items-center gap-4">
      <audio ref={audioRef} src={src} onEnded={handleEnded} />
      <Button
        variant="outline"
        size="icon"
        onClick={togglePlay}
        className="w-14 h-14 rounded-full border-2 border-primary bg-primary/5 hover:bg-primary/10 flex-shrink-0"
      >
        {isPlaying ? (
          <Pause className="w-6 h-6 text-primary" />
        ) : (
          <Play className="w-6 h-6 text-primary ml-1" />
        )}
      </Button>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          {icon}
          <h4 className="font-heading text-lg text-foreground truncate">{title}</h4>
        </div>
        <p className="text-muted-foreground font-body text-sm mt-1">{subtitle}</p>
      </div>
      {externalLink && (
        <a
          href={externalLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-primary hover:text-primary/80 text-sm font-body transition-colors"
        >
          <span className="hidden sm:inline">View on ElevenLabs</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      )}
    </div>
  );
};

const VoiceTone = () => {
  return (
    <div>
      <div className="mb-16">
        <span className="text-primary font-body text-sm tracking-widest uppercase">
          05 — Voice & Tone
        </span>
        <h2 className="font-heading text-4xl md:text-5xl text-foreground mt-4 mb-6">
          How We Speak
        </h2>
        <p className="text-lg text-muted-foreground font-body leading-relaxed max-w-3xl">
          Our voice is calm, professional, honest, warm, and confident but not loud. 
          We communicate with clarity and purpose, building trust through every interaction.
        </p>
      </div>

      {/* Audio Samples */}
      <div className="mb-16">
        <h3 className="font-heading text-2xl text-foreground mb-6">Brand Audio</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <AudioPlayer
            src="/audio/voice-flint.wav"
            title="Flint — Commanding Presence"
            subtitle="Brand voiceover by ElevenLabs"
            icon={<Volume2 className="w-5 h-5 text-primary" />}
            externalLink="https://elevenlabs.io/app/voice-library?voiceId=qAZH0aMXY8tw1QufPN0D"
          />
          <AudioPlayer
            src="/audio/music-life-story.wav"
            title="Life Story"
            subtitle="Music by Aleh Ivanovich"
            icon={<Music className="w-5 h-5 text-primary" />}
          />
        </div>
      </div>

      {/* Voice Traits */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {voiceTraits.map((item) => (
          <div 
            key={item.trait}
            className="bg-card rounded-xl p-6 border border-border"
          >
            <h3 className="font-heading text-xl text-foreground mb-2">{item.trait}</h3>
            <p className="text-muted-foreground font-body text-sm mb-4">{item.description}</p>
            <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
              <span className="text-xs text-primary font-body">Example</span>
              <p className="text-foreground font-body text-sm mt-1 italic">"{item.example}"</p>
            </div>
          </div>
        ))}
      </div>

      {/* Headlines Examples */}
      <div className="mb-16">
        <h3 className="font-heading text-2xl text-foreground mb-6">Example Headlines</h3>
        <div className="bg-card rounded-2xl p-8 border border-border space-y-6">
          <div className="border-l-4 border-primary pl-6">
            <h4 className="font-heading text-3xl text-foreground">Transform Your Everyday</h4>
            <p className="text-muted-foreground font-body text-sm mt-2">Hero headline — aspirational, personal</p>
          </div>
          <div className="border-l-4 border-primary pl-6">
            <h4 className="font-heading text-3xl text-foreground">Crafted for Your Life</h4>
            <p className="text-muted-foreground font-body text-sm mt-2">Service headline — emphasizes customization</p>
          </div>
          <div className="border-l-4 border-primary pl-6">
            <h4 className="font-heading text-3xl text-foreground">Quality That Lasts</h4>
            <p className="text-muted-foreground font-body text-sm mt-2">Trust headline — focus on durability</p>
          </div>
        </div>
      </div>

      {/* Do's and Don'ts */}
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-heading text-xl text-foreground mb-4 flex items-center gap-2">
            <Check className="w-5 h-5 text-primary" /> Use This Language
          </h3>
          <div className="bg-card rounded-xl p-6 border border-border space-y-3">
            {[
              '"We\'ll guide you through the process"',
              '"Your vision, our expertise"',
              '"Built to serve your daily life"',
              '"Let\'s create something lasting"',
              '"Premium materials, precise execution"'
            ].map((phrase) => (
              <div key={phrase} className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm font-body text-foreground">{phrase}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-heading text-xl text-foreground mb-4 flex items-center gap-2">
            <X className="w-5 h-5 text-destructive" /> Avoid This Language
          </h3>
          <div className="bg-card rounded-xl p-6 border border-border space-y-3">
            {[
              '"Act now! Limited time offer!"',
              '"Cheap" or "Budget-friendly"',
              '"One-size-fits-all solution"',
              '"Quick and easy renovation"',
              '"We\'re the best in the business"'
            ].map((phrase) => (
              <div key={phrase} className="flex items-center gap-3 p-3 bg-destructive/5 rounded-lg">
                <X className="w-4 h-4 text-destructive flex-shrink-0" />
                <span className="text-sm font-body text-foreground">{phrase}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Client Communication */}
      <div className="mt-16 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 border border-primary/10">
        <h3 className="font-heading text-2xl text-foreground mb-6">Client Communication Example</h3>
        <div className="bg-card rounded-xl p-6 border border-border">
          <p className="text-foreground font-body leading-relaxed">
            "Thank you for reaching out about your bathroom renovation. 
            I'd love to learn more about your vision and how we can bring it to life. 
            Our process begins with a detailed consultation where we'll discuss your goals, 
            preferences, and the scope of the project. From there, I'll provide a clear 
            estimate and timeline so you know exactly what to expect. 
            <br /><br />
            When would be a good time to schedule a call?"
          </p>
        </div>
      </div>
    </div>
  );
};

export default VoiceTone;
