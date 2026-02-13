import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { weddingData } from '../data/wedding';
import './Photos.css';

export function Photos() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <section className="photos-section">
      <motion.h2
        className="photos-title"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Наши моменты
      </motion.h2>
      <motion.div
        className="photos-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08 },
          },
        }}
      >
        {weddingData.photos.map((src, i) => (
          <motion.button
            key={i}
            type="button"
            className="photo-card"
            variants={{
              hidden: { scale: 0.9, opacity: 0 },
              visible: { scale: 1, opacity: 1 },
            }}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedIndex(i)}
          >
            <img src={src} alt={`Фото ${i + 1}`} loading="lazy" />
          </motion.button>
        ))}
      </motion.div>
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="photo-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
          >
            <motion.img
              src={weddingData.photos[selectedIndex]}
              alt={`Фото ${selectedIndex + 1}`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
