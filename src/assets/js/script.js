import { spline } from "@georgedoescode/spline"
import SimplexNoise from "simplex-noise";

document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector("section#hero");
    const path = section.querySelector(".row[data-alignment=center] path");

    let hueNoiseOffset = 0;
    let noiseStep = 0.0005;

    const simplex = new SimplexNoise();

    const points = createPoints();

    (function animate() {
        path.setAttribute("d", spline(points, 1, true));

        for (let i = 0; i < points.length; i++) {
            const point = points[i];

            const nX = noise(point.noiseOffsetX, point.noiseOffsetX);
            const nY = noise(point.noiseOffsetY, point.noiseOffsetY);
            const x = map(nX, -1, 1, point.originX - 20, point.originX + 20);
            const y = map(nY, -1, 1, point.originY - 20, point.originY + 20);

            point.x = x;
            point.y = y;

            point.noiseOffsetX += noiseStep;
            point.noiseOffsetY += noiseStep;
        }

        const hueNoise = noise(hueNoiseOffset, hueNoiseOffset);
        const hue = map(hueNoise, -1, 1, 0, 360);

        section.style.setProperty("--startColor", `hsl(${hue}, 100%, 75%)`);
        section.style.setProperty("--stopColor", `hsl(${hue + 60}, 100%, 75%)`);
        section.style.setProperty("--bgColor", `hsl(${hue + 60}, 75%, 5%)`);

        hueNoiseOffset += noiseStep / 6;

        requestAnimationFrame(animate);
    })();

    function map(n, start1, end1, start2, end2) {
        return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
    }

    function noise(x, y) {
        return simplex.noise2D(x, y);
    }

    function createPoints() {
        const points = [];
        const numPoints = 7;
        const angleStep = (Math.PI * 2) / numPoints;
        const rad = 75;

        for (let i = 1; i <= numPoints; i++) {
            const theta = i * angleStep;

            const x = 100 + Math.cos(theta) * rad;
            const y = 100 + Math.sin(theta) * rad;

            points.push({
                x: x,
                y: y,
                originX: x,
                originY: y,
                noiseOffsetX: Math.random() * 1000,
                noiseOffsetY: Math.random() * 1000
            });
        }

        return points;
    }

    path.mouseover = () => noiseStep = 0.005;
    path.mouseleave = () => noiseStep = 0.0005;
});
