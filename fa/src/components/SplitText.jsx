import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(GSAPSplitText, useGSAP);

// Trimmed down from the React Bits SplitText component - dropped
// ScrollTrigger since everything here sits above the fold anyway, so
// it just plays once fonts are ready. splitType defaults to "words":
// splitting Persian/Arabic text into individual characters breaks the
// letter joining (the script is cursive), so words is the safe default
// for RTL copy. Use "chars" only for Latin text.
const SplitText = ({
  text,
  className = '',
  delay = 60,
  duration = 0.9,
  ease = 'power3.out',
  splitType = 'words',
  from = { opacity: 0, y: 24 },
  to = { opacity: 1, y: 0 },
  textAlign = 'inherit',
  tag = 'span'
}) => {
  const ref = useRef(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    if (document.fonts?.status === 'loaded') {
      setFontsLoaded(true);
    } else {
      document.fonts?.ready.then(() => setFontsLoaded(true));
    }
  }, []);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) return undefined;
      const el = ref.current;

      const splitInstance = new GSAPSplitText(el, {
        type: splitType,
        smartWrap: true,
        wordsClass: 'split-word',
        charsClass: 'split-char',
        reduceWhiteSpace: false
      });

      const targets = splitInstance.chars?.length ? splitInstance.chars : splitInstance.words;

      gsap.fromTo(targets, from, {
        ...to,
        duration,
        ease,
        stagger: delay / 1000
      });

      return () => {
        try {
          splitInstance.revert();
        } catch {
          /* already gone */
        }
      };
    },
    { dependencies: [text, splitType, fontsLoaded], scope: ref }
  );

  const Tag = tag;
  return (
    <Tag
      ref={ref}
      className={`split-parent ${className}`}
      style={{ textAlign, display: 'inline-block', willChange: 'transform, opacity' }}
    >
      {text}
    </Tag>
  );
};

export default SplitText;
