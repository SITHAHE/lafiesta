import { motion } from 'framer-motion';

// Базовый URL ассетов (учитывает base в vite.config — работает в подпапке)
export const asset = (p) => `${import.meta.env.BASE_URL}${p}`;

// Картинка с ленивой загрузкой и плавным появлением
export function Img({ src, alt, className = '', ...rest }) {
  return (
    <img
      src={asset(src)}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className}
      {...rest}
    />
  );
}

// Обёртка для появления при скролле (уважает prefers-reduced-motion автоматически на уровне framer)
export function Reveal({ children, delay = 0, y = 28, className = '', as = 'div' }) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}

export const fadeStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
export const fadeItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
