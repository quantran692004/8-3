import React, { useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import MessageCard from './components/MessageCard';
import FloatingHearts from './components/FloatingHearts';
import './App.css';

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background:
    radial-gradient(circle at top, rgba(255, 105, 180, 0.24), transparent 30%),
    radial-gradient(circle at bottom, rgba(255, 168, 203, 0.2), transparent 24%),
    linear-gradient(180deg, #0d0716 0%, #120b1e 35%, #07040d 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  padding: 40px 20px 60px;
`;

const GlowOrb = styled(motion.div)`
  position: absolute;
  width: 420px;
  height: 420px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 108, 180, 0.28) 0%, rgba(255, 108, 180, 0.08) 35%, transparent 72%);
  filter: blur(8px);
  z-index: 1;
`;

const StarContainer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
`;

const Star = styled.div`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  opacity: ${props => props.opacity};
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
  animation: twinkle ${props => props.duration}s ease-in-out infinite;

  @keyframes twinkle {
    0%, 100% { opacity: ${props => props.opacity}; transform: scale(1); }
    50% { opacity: ${props => props.opacity * 0.45}; transform: scale(0.7); }
  }
`;

const Header = styled.div`
  position: relative;
  z-index: 10;
  text-align: center;
  margin-bottom: 18px;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.2rem, 5vw, 4.1rem);
  color: #fff;
  margin: 0;
  letter-spacing: 1px;
  font-family: 'Pacifico', cursive;
  text-shadow:
    0 0 18px rgba(255, 132, 198, 0.9),
    0 0 28px rgba(255, 80, 160, 0.8);
  background: linear-gradient(135deg, #ffd0eb 0%, #ff7bc5 28%, #ffd7ee 62%, #ffc4df 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(0.95rem, 2vw, 1.35rem);
  color: rgba(255, 255, 255, 0.8);
  margin-top: 12px;
  font-family: 'Poppins', sans-serif;
  letter-spacing: 0.04em;
`;

const PuppyContainer = styled(motion.div)`
  position: relative;
  z-index: 8;
  width: min(100%, 860px);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 16px auto 8px;
`;

const ModelFrame = styled.div`
  position: relative;
  width: min(82vw, 620px);
  height: clamp(260px, 42vw, 480px);
  border-radius: 32px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.04));
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow:
    0 18px 40px rgba(255, 96, 180, 0.18),
    inset 0 0 24px rgba(255, 255, 255, 0.08);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 10px;
    border-radius: 24px;
    border: 1px solid rgba(255, 196, 223, 0.35);
    pointer-events: none;
  }
`;

const circles = [
  { size: 300, x: '8%', y: '18%', delay: 0 },
  { size: 220, x: '82%', y: '12%', delay: 0.45 },
  { size: 240, x: '74%', y: '70%', delay: 0.75 },
  { size: 190, x: '12%', y: '72%', delay: 1.1 },
];

function App() {
  const modelViewerRef = useRef(null);

  const stars = useMemo(
    () =>
      Array.from({ length: 46 }, (_, i) => {
        const size = Math.random() * 3 + 1.5;
        const opacity = Math.random() * 0.7 + 0.35;
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const duration = Math.random() * 3 + 2;

        return {
          id: i,
          size,
          opacity,
          top,
          left,
          duration,
        };
      }),
    []
  );

  useEffect(() => {
    if (modelViewerRef.current) {
      // placeholder for future model setup
    }
  }, []);

  return (
    <AppContainer>
      <StarContainer>
        {stars.map(star => (
          <Star
            key={star.id}
            size={star.size}
            opacity={star.opacity}
            duration={star.duration}
            style={{ top: `${star.top}%`, left: `${star.left}%` }}
          />
        ))}
      </StarContainer>

      {circles.map((circle, index) => (
        <GlowOrb
          key={index}
          style={{
            width: circle.size,
            height: circle.size,
            left: circle.x,
            top: circle.y,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.75, scale: 1 }}
          transition={{ delay: circle.delay, duration: 1.2 }}
        />
      ))}

      <FloatingHearts count={24} />

      <Header>
        <Title
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          Chúc mừng ngày 8/3, huongmuoi là vịt!
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          Người mà anh luôn muốn giữ bên mình
        </Subtitle>
      </Header>

      <PuppyContainer
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.35 }}
      >
        <ModelFrame>
          <model-viewer
            ref={modelViewerRef}
            src="/toon_cute_dog.glb"
            alt="A cute cartoon dog"
            auto-rotate
            camera-controls
            camera-orbit="0deg 10deg 2m"
            min-camera-orbit="auto auto auto"
            max-camera-orbit="auto auto auto"
            shadow-intensity="1"
            environment-image="neutral"
            exposure="1"
            ar
            ar-modes="webxr scene-viewer quick-look"
            style={{ width: '100%', height: '100%', display: 'block', background: 'transparent' }}
          ></model-viewer>
        </ModelFrame>
      </PuppyContainer>

      <MessageCard marginBottom />
    </AppContainer>
  );
}

export default App;
