const fs = require("fs");

/* run with ts-node day6_Tim.ts */
/* Good case to use typescript with classes :) */

class OrbitMap {
  constructor(public input: OrbitConnection[]) {
    this.planets = {};

    input.forEach(orbitConn => {
      if (!this.planets[orbitConn.target]) {
        this.planets[orbitConn.target] = new Planet(orbitConn.target);
      }
      if (orbitConn.orbiter && !this.planets[orbitConn.orbiter]) {
        this.planets[orbitConn.orbiter] = new Planet(orbitConn.orbiter);
      }
    });

    input.forEach(orbitConn => {
      if (orbitConn.orbiter) {
        this.planets[orbitConn.orbiter].setOrbits(
          this.planets[orbitConn.target]
        );
      }
    });
  }

  sumOrbits() {
    return Object.values(this.planets)
      .map(p => p.count())
      .reduce((a, b) => a + b);
  }
}

class Planet {
  constructor(id: string) {
    this.id = id;
    this.orbits;
  }

  setOrbits(planet: Planet) {
    this.orbits = planet;
  }

  count(): number {
    return this.orbits ? 1 + this.orbits.count() : 0;
  }
}

/* run */
const input = inputToArray(fs.readFileSync("input1.txt", "utf8"));
const _ORBIT_MAP_ = new OrbitMap(input);
const totOrbits = _ORBIT_MAP_.sumOrbits();
console.log("Total: " + totOrbits);

/* Methods */

function inputToArray(input: string): OrbitConnection[] {
  const arr = input.split("\n");
  let orbitConns: OrbitConnection[] = [];
  arr.forEach(obj => {
    const planets = obj.split(")");
    orbitConns.push({
      target: planets[0],
      orbiter: planets[1]
    });
  });
  return orbitConns;
}

/* Types */

type PlanetMap = Record<string, Planet>;

interface OrbitMap {
  planets: PlanetMap;
}

interface OrbitConnection {
  target: string;
  orbiter?: string;
}

interface Planet {
  id: string;
  orbits?: Planet;
}
