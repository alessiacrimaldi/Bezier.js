const filesNames = [
  "linear",
  "quadratic",
  "cubic",

  "linearBoundingBox",
  "quadraticBoundingBox",
  "cubicBoudingBox",

  "quadraticLineIntersection",
  "cubicLineIntersection",

  "quadraticQuadraticIntersection",
  "cubicQuadraticIntersection",

  "quadraticCubicIntersection",
  "cubicCubicIntersection",

  "cubicSelfIntersection",

  "linearProjection",
  "quadraticProjection",
  "cubicProjection",

  "linearTangent",
  "quadraticTangent",
  "cubicTangent",

  "openPolyBezier",
  "closedPolyBezier"
];

async function loadScripts() {
  for (const fileName of filesNames) {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = `./examples/${fileName}.js`;
    await new Promise((resolve, reject) => {
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
}

loadScripts();