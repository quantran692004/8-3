import React, { useMemo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import MessageCard from './components/MessageCard';
import FloatingHearts from './components/FloatingHearts';
import './App.css';

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background:
    radial-gradient(circle at 8% 4%, rgba(255, 206, 224, 0.7), transparent 25%),
    radial-gradient(circle at 92% 88%, rgba(215, 205, 255, 0.75), transparent 28%),
    linear-gradient(135deg, #fff9fb 0%, #fff4f7 52%, #f6f2ff 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  position: relative;
  padding: 54px 24px 72px;
`;

const GlowOrb = styled(motion.div)`
  position: absolute;
  width: 420px;
  height: 420px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 163, 198, 0.32) 0%, rgba(194, 178, 255, 0.18) 38%, transparent 72%);
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
  max-width: 820px;
  margin-bottom: 34px;
`;

const Eyebrow = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 999px;
  color: #9a5276;
  background: rgba(255, 255, 255, 0.76);
  border: 1px solid rgba(194, 119, 157, 0.18);
  box-shadow: 0 8px 22px rgba(151, 91, 126, 0.08);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 6vw, 5rem);
  line-height: 1.08;
  margin: 18px 0 0;
  letter-spacing: -0.02em;
  font-family: 'Pacifico', cursive;
  background: linear-gradient(135deg, #7f3f67 0%, #c96d9b 48%, #8872c2 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(0.95rem, 2vw, 1.35rem);
  color: #785b70;
  margin: 16px auto 0;
  max-width: 560px;
  font-family: 'Roboto', sans-serif;
  font-size: clamp(1rem, 2vw, 1.2rem);
  line-height: 1.65;
`;

const MainContent = styled.div`
  position: relative;
  z-index: 8;
  width: min(1120px, 100%);
  display: grid;
  grid-template-columns: minmax(320px, 0.95fr) minmax(320px, 1.05fr);
  align-items: center;
  gap: clamp(28px, 5vw, 72px);

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
    max-width: 620px;
  }
`;

const PhotoContainer = styled(motion.div)`
  position: relative;
  z-index: 8;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const PhotoFrame = styled.div`
  position: relative;
  width: min(100%, 520px);
  aspect-ratio: 1 / 1;
  padding: 12px;
  border-radius: 36px;
  background: linear-gradient(145deg, #ffffff, #f9eaf4);
  border: 1px solid rgba(167, 105, 147, 0.16);
  box-shadow:
    0 24px 70px rgba(145, 79, 122, 0.18),
    0 0 0 8px rgba(255, 255, 255, 0.55),
    inset 0 0 28px rgba(255, 255, 255, 0.8);
  overflow: hidden;
  transform: rotate(-1deg);
  transition: transform 0.45s ease, box-shadow 0.45s ease;

  &:hover {
    transform: rotate(0deg) translateY(-6px) scale(1.015);
    box-shadow:
      0 30px 80px rgba(145, 79, 122, 0.25),
      0 0 0 8px rgba(255, 255, 255, 0.72),
      inset 0 0 28px rgba(255, 255, 255, 0.9);
  }

  &::before {
    content: '';
    position: absolute;
    inset: 12px;
    border-radius: 27px;
    border: 1px solid rgba(255, 255, 255, 0.8);
    pointer-events: none;
    z-index: 2;
  }
`;

const Portrait = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center;
  border-radius: 27px;
  filter: saturate(1.06) contrast(1.02);
  user-select: none;
`;

const PhotoCaption = styled.div`
  position: absolute;
  left: 28px;
  bottom: 28px;
  z-index: 3;
  padding: 9px 15px;
  border-radius: 999px;
  color: #fff;
  background: rgba(64, 12, 47, 0.58);
  border: 1px solid rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(10px);
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const circles = [
  { size: 300, x: '8%', y: '18%', delay: 0 },
  { size: 220, x: '82%', y: '12%', delay: 0.45 },
  { size: 240, x: '74%', y: '70%', delay: 0.75 },
  { size: 190, x: '12%', y: '72%', delay: 1.1 },
];

function App() {
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
        <Eyebrow
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span aria-hidden="true">✦</span> Một lời chúc thật dịu dàng <span aria-hidden="true">✦</span>
        </Eyebrow>
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

      <MainContent>
        <PhotoContainer
          initial={{ opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          <PhotoFrame>
            <Portrait
              src={`${process.env.PUBLIC_URL}/huongmuoi-8-3.png`}
              alt="Huongmuoi trong tà áo dài màu hồng"
            />
            <PhotoCaption>Gửi người anh thương</PhotoCaption>
          </PhotoFrame>
        </PhotoContainer>

        <MessageCard marginBottom />
      </MainContent>
    </AppContainer>
  );
}

export default App;
