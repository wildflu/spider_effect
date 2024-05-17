import { useEffect, useRef } from 'react';

import './App.css'

const App = () => {
  const bannerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const banner = bannerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const arrayColors = ['#eee', '#545454', '#596d91', '#bb5a68', '#696541'];

    const initializeCanvas = () => {
      canvas.width = banner.offsetWidth;
      canvas.height = banner.offsetHeight;
    };

    const generateDots = () => {
      const dots = [];
      for (let index = 0; index < 50; index++) {
        dots.push({
          x: Math.floor(Math.random() * canvas.width),
          y: Math.floor(Math.random() * canvas.height),
          size: Math.random() * 3 + 5,
          color: arrayColors[Math.floor(Math.random() * 5)]
        });
      }
      return dots;
    };

    const drawDots = (dots) => {
      dots.forEach(dot => {
        ctx.fillStyle = dot.color;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const handleMouseMove = (event) => {
      const mouse = {
        x: event.pageX - banner.getBoundingClientRect().left,
        y: event.pageY - banner.getBoundingClientRect().top
      };
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawDots(dots);
      dots.forEach(dot => {
        const distance = Math.sqrt((mouse.x - dot.x) ** 2 + (mouse.y - dot.y) ** 2);
        if (distance < 300) {
          ctx.strokeStyle = dot.color;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(dot.x, dot.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      });
    };

    const handleMouseOut = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawDots(dots);
    };

    const handleResize = () => {
      initializeCanvas();
      const dots = generateDots();
      drawDots(dots);
    };

    initializeCanvas();
    const dots = generateDots();
    drawDots(dots);

    banner.addEventListener('mousemove', handleMouseMove);
    banner.addEventListener('mouseout', handleMouseOut);

    return () => {
      banner.removeEventListener('mousemove', handleMouseMove);
      banner.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('resize', handleResize);
    };
  }, );

  return (
    <div className="introduction_section" ref={bannerRef}>
      {/* <button>Subscribe Now &#8599;</button> */}
      <h1>
        Spider-Man Effect
      </h1>
      <canvas id="dotsCanvas" ref={canvasRef}></canvas>
    </div>
  );
};

export default App;
