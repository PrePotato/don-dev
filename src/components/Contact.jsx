import { useState } from 'react';
import Reveal from './Reveal.jsx';
import ScrambleText from './ScrambleText.jsx';

const SOCIALS = [
  { label: 'GitHub', handle: '@PrePotato', href: 'https://github.com/PrePotato' },
  { label: 'LinkedIn', handle: '/in/yousef-jadoa', href: 'https://www.linkedin.com/in/yousef-jadoa-759b9541a/' },
];

export default function Contact() {
  const email = 'jadoh2003@gmail.com';
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <section id="contact" className="section contact">
      <div className="contact__panel">
        <Reveal as="span" className="section__eyebrow">
          <ScrambleText text="// let’s build something" trigger="view" />
        </Reveal>
        <Reveal as="h2" className="contact__title" delay={0.05}>
          Got a project, a question,<br />or just want to <span className="grad">say hi?</span>
        </Reveal>
        <Reveal as="p" className="contact__lead" delay={0.1}>
          I’m currently open to freelance work and collaborations. Drop me a line —
          I reply to everything.
        </Reveal>

        <Reveal className="contact__email" delay={0.15}>
          <a href={`mailto:${email}`} className="contact__email-link" data-hover>{email}</a>
          <button className="contact__copy" onClick={copy} data-hover>
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </Reveal>

        <Reveal className="contact__socials" delay={0.2}>
          {SOCIALS.map((s) => {
            const external = s.href.startsWith('http');
            return (
              <a
                key={s.label}
                href={s.href}
                className="contact__social"
                data-hover
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <span className="contact__social-label">{s.label}</span>
                <span className="contact__social-handle">{s.handle}</span>
              </a>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
