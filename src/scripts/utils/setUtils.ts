export function checkIfSetsShareAnElement(a: Set<any>, b: Set<any>) {
  for (const item of a) {
    if (b.has(item)) {
      return true;
    }
  }
  return false;
}

export function setIntersection(a: Set<any>, b: Set<any>): Set<any> {
  const s = new Set();

  a.forEach((item) => {
    if (b.has(item)) {
      s.add(item);
    }
  });

  return s;
}
