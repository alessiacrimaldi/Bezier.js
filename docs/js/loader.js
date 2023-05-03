const filesNames = [
  "linear",
  "quadratic",
  "cubic",

  "linearLookUpTable",
  "quadraticLookUpTable",
  "cubicLookUpTable",

  "linearTangent",
  "quadraticTangent",
  "cubicTangent",

  "linearNormal",
  "quadraticNormal",
  "cubicNormal",

  "quadraticCurvature",
  "cubicCurvature",

  "linearProjection",
  "quadraticProjection",
  "cubicProjection",

  "linearBoundingBox",
  "quadraticBoundingBox",
  "cubicBoudingBox",

  "linearOffset",
  "quadraticOffset",
  "cubicOffset",

  "quadraticArcs",
  "cubicArcs",

  "quadraticLineIntersection",
  "cubicLineIntersection",

  "quadraticQuadraticIntersection",
  "cubicQuadraticIntersection",

  "quadraticCubicIntersection",
  "cubicCubicIntersection",

  "cubicSelfIntersection",

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