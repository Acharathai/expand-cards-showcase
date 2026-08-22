import { Check, PenLine, Send, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { BottomSheet } from "@/components/listing/BottomSheet";
import { GENRE_TITLES, LANGUAGES, PLATFORM_TITLES } from "@/data/products";

type Props = {
  open: boolean;
  onClose: () => void;
};

function ChipRow({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string | null;
  onChange: (v: string | null) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const selected = value === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(selected ? null : opt)}
            aria-pressed={selected}
            className="press flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[12.5px] font-medium transition-all duration-200"
            style={{
              borderColor: selected ? "var(--color-foreground)" : "var(--color-border)",
              backgroundColor: selected ? "var(--color-foreground)" : "var(--color-card)",
              color: selected ? "var(--color-background)" : "var(--color-foreground)",
            }}
          >
            {selected && <Check size={12} strokeWidth={3} />}
            {opt}
          </button>
        );
      })}
    </div>
  );
}

export function RequestStorySheet({ open, onClose }: Props) {
  const [title, setTitle] = useState("");
  const [idea, setIdea] = useState("");
  const [genre, setGenre] = useState<string | null>(null);
  const [platform, setPlatform] = useState<string | null>(null);
  const [language, setLanguage] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setTitle("");
      setIdea("");
      setGenre(null);
      setPlatform(null);
      setLanguage(null);
    }
  }, [open]);

  const canSubmit = title.trim().length > 1 && idea.trim().length > 3;

  const submit = () => {
    if (!canSubmit) return;
    toast.success("Story request sent!", {
      description: "Thanks! Our team will review your idea soon.",
    });
    onClose();
  };

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title="Request a Story"
      full
      footer={
        <button
          onClick={submit}
          disabled={!canSubmit}
          className="press flex w-full items-center justify-center gap-2 rounded-full bg-foreground py-3.5 text-[14px] font-semibold text-background transition-opacity duration-200 disabled:opacity-40"
        >
          <Send size={15} strokeWidth={2.2} />
          Send Request
        </button>
      }
    >
      <div className="flex flex-col gap-6 pb-2">
        <div className="flex items-start gap-3 rounded-2xl bg-muted/60 p-4">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-foreground text-background">
            <PenLine size={17} strokeWidth={2} />
          </span>
          <p className="text-[13px] font-medium leading-relaxed text-muted-foreground">
            Koi story jo aap sunna chahte hain? Humein batayein — title, thodi si idea, aur
            pasandida genre. Hum best requests ko list karte hain.
          </p>
        </div>

        <label className="flex flex-col gap-2">
          <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            <Sparkles size={12} strokeWidth={2.2} />
            Story title
          </span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Raat Ka Aakhri Safar"
            maxLength={80}
            className="rounded-2xl border border-border bg-card px-4 py-3 text-[14px] font-medium text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground/40"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            Story idea
          </span>
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Thoda detail me likhein — plot, characters, ya ending jo aap chahte hain…"
            rows={4}
            maxLength={500}
            className="resize-none rounded-2xl border border-border bg-card px-4 py-3 text-[14px] font-medium leading-relaxed text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground/40"
          />
          <span className="self-end text-[11px] font-medium text-muted-foreground">
            {idea.length}/500
          </span>
        </label>

        <div className="flex flex-col gap-2.5">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            Preferred genre
          </span>
          <ChipRow options={GENRE_TITLES} value={genre} onChange={setGenre} />
        </div>

        <div className="flex flex-col gap-2.5">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            Preferred platform
          </span>
          <ChipRow options={PLATFORM_TITLES} value={platform} onChange={setPlatform} />
        </div>

        <div className="flex flex-col gap-2.5">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            Language
          </span>
          <ChipRow options={LANGUAGES} value={language} onChange={setLanguage} />
        </div>
      </div>
    </BottomSheet>
  );
}
