"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, Send } from "lucide-react";

// ─── Fixed Q&A knowledge base ─────────────────────────────────────────
const QA: { keywords: string[]; answer: string }[] = [
  {
    keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"],
    answer:
      "Hello! 👋 I'm the AUF Assistant. I can answer questions about Angeles University Foundation — programs, admissions, accreditations, and more. How can I help you today?",
  },
  {
    keywords: ["what is auf", "about auf", "tell me about", "who is auf", "history", "founded"],
    answer:
      "Angeles University Foundation (AUF) is a premier Catholic university in Angeles City, Pampanga, Philippines. Founded in 1962, AUF is committed to forming truly excellent professionals imbued with a Catholic identity. It holds Autonomous Status from CHED and PAASCU Level IV accreditation.",
  },
  {
    keywords: ["location", "address", "where", "located", "campus", "directions"],
    answer:
      "AUF is located at MacArthur Highway, Angeles City, Pampanga, Philippines 2009. The main campus is easily accessible from Metro Manila via the NLEX.",
  },
  {
    keywords: ["program", "course", "degree", "college", "school", "offer", "study"],
    answer:
      "AUF has 8 colleges and schools offering 30+ degree programs:\n• College of Arts and Sciences (CAS)\n• College of Business Administration (CBA)\n• College of Computing and Architecture (CCA)\n• College of Education (CED)\n• College of Engineering (CENG)\n• College of Health Sciences (CHS)\n• College of Science and Mathematics (CSM)\n• School of Law\n\nVisit the Academics section or a college's microsite for the full program list.",
  },
  {
    keywords: ["apply", "application", "how to apply", "admission", "enroll", "enrolment"],
    answer:
      "To apply at AUF:\n1. Visit the Admissions page on our website\n2. Complete the online application form\n3. Submit the required documents (TOR, certificate of good moral, etc.)\n4. Take the AUF entrance examination\n5. Wait for the results and enrollment schedule\n\nFor more details, contact admissions@auf.edu.ph",
  },
  {
    keywords: ["requirement", "document", "needed", "what to bring", "prerequisites"],
    answer:
      "General admission requirements include:\n• Form 138 / Report Card\n• Certificate of Good Moral Character\n• PSA Birth Certificate\n• 2×2 ID photos\n• Entrance exam results\n\nSpecific requirements may vary per program. Check the Admissions page for the complete list.",
  },
  {
    keywords: ["tuition", "fee", "cost", "scholarship", "financial", "payment"],
    answer:
      "AUF offers competitive tuition fees that vary by program. Scholarships and financial assistance are available, including:\n• CHED Scholarships\n• AUF Academic Scholarship\n• AUF Athletic Scholarship\n• Various government grants (UNIFAST, ESGP-PA)\n\nContact the Finance Office or visit admissions.auf.edu.ph for the latest fee schedules.",
  },
  {
    keywords: ["contact", "reach", "phone", "email", "call", "inquir"],
    answer:
      "📞 Phone: +63 (045) 888-8691\n📧 Email: info@auf.edu.ph\n📧 Admissions: admissions@auf.edu.ph\n📧 Registrar: registrar@auf.edu.ph\n📍 Address: MacArthur Highway, Angeles City, Pampanga 2009\n\nOffice hours: Monday–Friday, 8:00 AM – 5:00 PM",
  },
  {
    keywords: ["accreditation", "ched", "paascu", "faap", "iso", "autonomous", "accredited", "ranking"],
    answer:
      "AUF's recognitions include:\n• CHED Autonomous Status (since 2003)\n• FAAP Institutional Accreditation\n• ISO 21001:2015 Certification (TÜV SÜD)\n• PAASCU Program Accreditations\n• Times Higher Education Impact Rankings (SDGs)\n• QS Asian University Rankings\n• World University Rankings for Innovation (WURI)",
  },
  {
    keywords: ["president", "chancellor", "rector", "administration", "leader", "head"],
    answer:
      "For the current university president and administration details, please visit the About AUF section on our website or contact the Office of the President at info@auf.edu.ph.",
  },
  {
    keywords: ["myau", "my au", "portal", "student portal", "lms", "online"],
    answer:
      "The MyAU portal is the official student information system of AUF. You can access it through the link in the site header. For login issues or technical support, contact the IT Office at it@auf.edu.ph.",
  },
  {
    keywords: ["vision", "mission", "value", "core value", "virtue", "virtus", "veritas", "caritas"],
    answer:
      "AUF's three core virtues shape every Angelenean:\n\n• Virtus (Mabuti / Good) — integrity and character\n• Veritas (Magaling / Excellent) — academic excellence and truth\n• Caritas (May Malasakit / Compassionate) — love and care for others\n\nAUF's vision is to become a leading Catholic university in Asia committed to excellence in instruction, research, and community service.",
  },
  {
    keywords: ["library", "book", "research facility", "facilities"],
    answer:
      "AUF has modern facilities including its main library, research centers, computer laboratories, and health facilities. The library provides access to a wide collection of academic resources, e-journals, and databases. For library inquiries, visit the campus or check the Student Services page.",
  },
  {
    keywords: ["dormitory", "dorm", "housing", "accommodation", "boarding"],
    answer:
      "AUF provides on-campus dormitory facilities for students. For availability and rates, contact the Student Affairs Office at info@auf.edu.ph or visit the campus directly.",
  },
  {
    keywords: ["calendar", "schedule", "semester", "term", "enrollment period", "academic year"],
    answer:
      "The AUF Academic Calendar follows the CHED-prescribed schedule with two semesters and a short summer term. For the official calendar with enrollment dates, please visit the Admissions section of the website or contact the Registrar's Office.",
  },
];

const QUICK_REPLIES = [
  "How do I apply?",
  "What programs are offered?",
  "Tuition & scholarships",
  "Campus location",
  "Contact information",
];

const URL_REGEX = /(https?:\/\/[^\s]+|www\.[^\s]+)/gi;

function renderTextWithLinks(text: string) {
  return text.split("\n").map((line, lineIndex) => {
    const parts = line.split(URL_REGEX);

    return (
      <span key={`line-${lineIndex}`}>
        {parts.map((part, partIndex) => {
          if (!part) return null;

          const isUrl = /^https?:\/\//i.test(part) || /^www\./i.test(part);
          if (!isUrl) return <span key={`text-${lineIndex}-${partIndex}`}>{part}</span>;

          const href = /^https?:\/\//i.test(part) ? part : `https://${part}`;
          return (
            <a
              key={`link-${lineIndex}-${partIndex}`}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:opacity-80 text-navy"
            >
              {part}
            </a>
          );
        })}
        {lineIndex < text.split("\n").length - 1 && <br />}
      </span>
    );
  });
}

function getAnswer(query: string): string {
  const lower = query.toLowerCase();
  for (const item of QA) {
    if (item.keywords.some((k) => lower.includes(k))) {
      return item.answer;
    }
  }
  return "I'm sorry, I don't have specific information on that. If you want to talk to a human, please message our support team on our Facebook page:\n www.facebook.com/aufconnect/\n\nFor detailed inquiries, you can also contact us directly:\n📧 info@auf.edu.ph\n📞 +63 (045) 888-8691\n\nOur staff will be happy to assist you during office hours (Mon–Fri, 8 AM–5 PM).";
}

// ─── Types ────────────────────────────────────────────────────────────
type Message = {
  id: string;
  role: "user" | "bot";
  text: string;
  timestamp: Date;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome",
    role: "bot",
    text: "Hello! 👋 I'm the AUF Assistant. Ask me anything about Angeles University Foundation — programs, admissions, campus, or accreditations.\n\nIf you want to talk to a human at any point, feel free to reach out to us directly on our Facebook page: www.facebook.com/aufconnect/",
    timestamp: new Date(),
  },
];

const PANEL_VARIANTS = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
  exit: {
    opacity: 0, y: 16, scale: 0.97,
    transition: { duration: 0.2, ease: "easeIn" as const },
  },
};

// ─── Message bubble ───────────────────────────────────────────────────
function Bubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
      className={`flex gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {!isUser && (
        <div className="relative mt-0.5 h-7 w-7 shrink-0 overflow-hidden rounded-full border border-white/10 bg-[var(--auf-navy)]">
          <Image src="/assets/great-dane.png" alt="AUF" fill className="object-contain p-0.5" sizes="28px" />
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "rounded-tr-sm bg-[var(--auf-navy)] text-white"
            : "rounded-tl-sm bg-white text-[var(--auf-text)] shadow-sm border border-[var(--auf-border)]"
        }`}
      >
        {renderTextWithLinks(msg.text)}
      </div>
    </motion.div>
  );
}

// ─── Chat panel ───────────────────────────────────────────────────────
function ChatPanel({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const send = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      const userMsg: Message = {
        id: crypto.randomUUID(),
        role: "user",
        text: trimmed,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsTyping(true);

      // Simulate a brief "typing" delay
      setTimeout(() => {
        const botMsg: Message = {
          id: crypto.randomUUID(),
          role: "bot",
          text: getAnswer(trimmed),
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMsg]);
        setIsTyping(false);
      }, 650);
    },
    [],
  );

  return (
    <div className="flex h-[520px] max-h-[70vh] flex-col overflow-hidden rounded-2xl border border-[var(--auf-border)] bg-[var(--auf-off-white)] shadow-2xl shadow-[var(--auf-navy)]/20">
      {/* Header */}
      <div className="flex items-center gap-3 bg-[var(--auf-navy)] px-4 py-3">
        <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-white/10 border border-white/15">
          <Image src="/assets/great-dane.png" alt="AUF" fill className="object-contain p-0.5" sizes="32px" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-white">AUF Assistant</p>
          <p className="text-[10px] text-white/50">Typically replies instantly</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="rounded-full p-1 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X size={16} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((m) => <Bubble key={m.id} msg={m} />)}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full border border-white/10 bg-[var(--auf-navy)]">
              <Image src="/assets/great-dane.png" alt="" fill className="object-contain p-0.5" sizes="28px" />
            </div>
            <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-white border border-[var(--auf-border)] px-3.5 py-2.5 shadow-sm">
              {[0, 0.18, 0.36].map((delay) => (
                <motion.span
                  key={delay}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 0.7, delay, ease: "easeInOut" }}
                  className="block h-1.5 w-1.5 rounded-full bg-[var(--auf-navy)]/30"
                />
              ))}
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick replies */}
      {messages.length <= 2 && (
        <div className="border-t border-[var(--auf-border)] px-4 py-2 flex flex-wrap gap-1.5">
          {QUICK_REPLIES.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => send(q)}
              className="rounded-full border border-[var(--auf-navy)]/15 bg-white px-3 py-1 text-[11px] font-medium text-[var(--auf-navy)] transition-colors hover:border-[var(--auf-navy)] hover:bg-[var(--auf-navy)] hover:text-white"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={(e) => { e.preventDefault(); send(input); }}
        className="flex items-center gap-2 border-t border-[var(--auf-border)] bg-white px-4 py-3"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question…"
          aria-label="Chat message"
          className="flex-1 bg-transparent text-sm text-[var(--auf-text)] placeholder:text-[var(--auf-muted)] focus:outline-none"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          aria-label="Send message"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--auf-navy)] text-white transition-all hover:bg-[var(--auf-navy-mid)] disabled:opacity-30"
        >
          <Send size={14} />
        </button>
      </form>
    </div>
  );
}

// ─── Widget (FAB + panel) ──────────────────────────────────────────────
export function ChatbotWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={PANEL_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-[340px] max-w-[calc(100vw-2rem)]"
          >
            <ChatPanel onClose={() => setOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB — speech bubble + Great Dane (no circular background) */}
      <div className="flex flex-col items-center">
        {/* Speech bubble — only shown when closed */}
        <AnimatePresence>
          {!open && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative mb-1 cursor-pointer"
              onClick={() => setOpen(true)}
            >
              {/* Bubble body */}
              <div
                className="rounded-xl px-3 py-1.5 text-[11px] font-semibold text-navy shadow-md"
                style={{
                  background: "white",
                  border: "1.5px solid var(--auf-gold)",
                  whiteSpace: "nowrap",
                }}
              >
                Talk with GD
              </div>
              {/* Bubble tail (downward pointing triangle) */}
              <div
                className="absolute -bottom-1.75 left-1/2 -translate-x-1/2"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: "6px solid transparent",
                  borderRight: "6px solid transparent",
                  borderTop: "7px solid var(--auf-gold)",
                }}
              />
              <div
                className="absolute -bottom-1.25 left-1/2 -translate-x-1/2"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: "5px solid transparent",
                  borderRight: "5px solid transparent",
                  borderTop: "6px solid white",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Great Dane button */}
        <motion.button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close chat" : "Talk with GD"}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          className="relative"
          animate={
            open
              ? { rotate: 0 }
              : { rotate: [0, 4, -4, 4, 0] }
          }
          transition={
            open
              ? { duration: 0.2 }
              : { duration: 0.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 2 }
          }
          style={{ filter: "drop-shadow(0 4px 12px rgba(14,34,71,0.35))" }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              /* When open: smaller GD + X badge */
              <motion.div
                key="open"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="relative h-14 w-14"
              >
                <Image
                  src="/assets/great-dane.png"
                  alt="Close chat"
                  fill
                  className="object-contain bg-white border border-blue-500 rounded-full"
                  style={{ mixBlendMode: "multiply" }}
                  sizes="56px"
                />
                {/* Close badge */}
                <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-navy shadow">
                  <X size={10} className="text-white" />
                </div>
              </motion.div>
            ) : (
              /* When closed: full-size Great Dane */
              <motion.div
                key="closed"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="relative h-16 w-16 sm:h-18 sm:w-18"
              >
                <Image
                  src="/assets/great-dane.png"
                  alt="Talk with GD"
                  fill
                  className="object-contain bg-white border border-navy rounded-full"
                  style={{ mixBlendMode: "multiply" }}
                  sizes="72px"
                />
              </motion.div>
            )}
          </AnimatePresence>

        </motion.button>
      </div>
    </div>
  );
}
