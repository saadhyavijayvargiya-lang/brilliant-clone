const starLayers = [
  { className: "star-layer star-layer-far", count: 42 },
  { className: "star-layer star-layer-near", count: 26 },
];

export function CosmicBackground() {
  return (
    <div className="cosmic-background" aria-hidden="true">
      <div className="galaxy galaxy-one" />
      <div className="galaxy galaxy-two" />
      <div className="supernova supernova-one" />
      <div className="supernova supernova-two" />
      <div className="meteor meteor-one" />
      <div className="meteor meteor-two" />
      <div className="meteor meteor-three" />
      {starLayers.map((layer) => (
        <div className={layer.className} key={layer.className}>
          {Array.from({ length: layer.count }, (_, index) => (
            <span
              className="star"
              key={index}
              style={makeStarStyle(index, layer.count)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function makeStarStyle(index: number, count: number) {
  const x = (index * 37 + (index % 5) * 11) % 100;
  const y = (index * 53 + (index % 7) * 13) % 100;
  const size = 1 + (index % 4) * 0.55;
  const delay = -((index * 0.37) % 7);
  const duration = 4.5 + (index % 6) * 0.8;

  return {
    left: `${x}%`,
    top: `${y}%`,
    width: `${size}px`,
    height: `${size}px`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
    opacity: 0.35 + (index % count) / count,
  };
}
