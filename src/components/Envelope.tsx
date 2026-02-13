import { motion } from 'framer-motion';
import { weddingData } from '../data/wedding';
import './Envelope.css';

interface EnvelopeProps {
  onOpen: () => void;
}

export function Envelope({ onOpen }: EnvelopeProps) {
  return (
    <motion.div
      className="envelope-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="envelope-container"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 200, delay: 0.2 }}
      >
        <div className="envelope">
          <div className="envelope-flap" />
          <div className="envelope-body">
            <motion.div
              className="envelope-names"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <span className="name groom">{weddingData.groomName}</span>
              <span className="names-separator">&</span>
              <span className="name bride">{weddingData.brideName}</span>
            </motion.div>
            <motion.p
              className="envelope-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              Приглашают на свадьбу
            </motion.p>
            <motion.button
              type="button"
              className="envelope-btn"
              onClick={onOpen}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.1, type: 'spring', damping: 15 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Открыть приглашение
            </motion.button>
          </div>
        </div>
      </motion.div>
      <motion.div
        className="envelope-decorations"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        aria-hidden
      >
        <span className="floating-heart">♥</span>
        <span className="floating-heart delay-1">♥</span>
        <span className="floating-heart delay-2">♥</span>
      </motion.div>
    </motion.div>
  );
}
