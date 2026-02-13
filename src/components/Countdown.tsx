import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { weddingData } from '../data/wedding';
import './Countdown.css';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(target: Date): TimeLeft {
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    getTimeLeft(weddingData.weddingDate)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(weddingData.weddingDate));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const units: { key: keyof TimeLeft; label: string; short: string }[] = [
    { key: 'days', label: 'дней', short: 'д' },
    { key: 'hours', label: 'часов', short: 'ч' },
    { key: 'minutes', label: 'минут', short: 'м' },
    { key: 'seconds', label: 'секунд', short: 'с' },
  ];

  const weddingDateStr = weddingData.weddingDate.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <section className="countdown-section">
      <motion.h2
        className="countdown-title"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        До свадьбы осталось
      </motion.h2>
      <motion.p
        className="countdown-date"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {weddingDateStr}
      </motion.p>
      <motion.div
        className="countdown-line"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {units.map(({ key, label, short }, index) => (
          <span key={key} className="countdown-line-inner">
            <motion.span
              className="countdown-unit"
              variants={item}
              title={label}
            >
              <span className="countdown-value">{String(timeLeft[key]).padStart(2, '0')}</span>
              <span className="countdown-label">{short}</span>
            </motion.span>
            {index < units.length - 1 && (
              <span className="countdown-sep" aria-hidden>
                :
              </span>
            )}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
