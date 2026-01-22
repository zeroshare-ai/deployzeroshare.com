'use client';

export function AnimatedBackground() {
  return (
    <>
      {/* Animated gradient orbs */}
      <div
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 20s ease-in-out infinite',
          filter: 'blur(60px)',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-30%',
          right: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(118, 75, 162, 0.3) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 25s ease-in-out infinite reverse',
          filter: 'blur(60px)',
          zIndex: 0,
        }}
      />
      {/* Grid pattern overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          opacity: 0.5,
          zIndex: 0,
        }}
      />
      {/* Subtle particle effect */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(2px 2px at 20% 30%, rgba(255, 255, 255, 0.15), transparent),
            radial-gradient(2px 2px at 60% 70%, rgba(255, 255, 255, 0.1), transparent),
            radial-gradient(1px 1px at 50% 50%, rgba(255, 255, 255, 0.2), transparent),
            radial-gradient(1px 1px at 80% 10%, rgba(255, 255, 255, 0.15), transparent),
            radial-gradient(2px 2px at 90% 60%, rgba(255, 255, 255, 0.1), transparent)
          `,
          backgroundSize: '200% 200%',
          animation: 'particleMove 30s ease-in-out infinite',
          zIndex: 0,
        }}
      />
    </>
  );
}
