const filesNames = [
  "linear",
  "quadratic",
  "cubic",
  "quadraticTangent",
  "cubicTangent",
  "openSubpath",
  "closedSubpath"
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