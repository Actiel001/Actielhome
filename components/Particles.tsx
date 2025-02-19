import { Particles as TSParticles } from '@tsparticles/react';

const ParticlesComponent = () => {
  return (
    <TSParticles
      id="tsparticles"
      options={{
        background: {
          color: {
            value: "#141414", 
          },
        },
        particles: {
          number: {
            value: 50,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: 4,
          },
          opacity: {
            value: 0.5,
          },
          move: {
            enable: true,
            speed: 1.5,
            direction: "none",
            random: true,
            straight: false,
            outModes: {
              default: "out",
            },
          },
          density: {
            enable: true,
            area: 800, 
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse",
            },
            onClick: {
              enable: true,
              mode: "push",
            },
          },
          modes: {
            repulse: {
              distance: 100,
              duration: 0.4,
            },
            push: {
              quantity: 4,
            },
          },
        },
      }}
    />
  );
};

export default ParticlesComponent;
