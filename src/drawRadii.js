import { toRad } from './utils.js';

/**
 * Draws N radii (from center) and angle labels (unit circle convention).
 * @param {SVGSVGElement} svg - The SVG element to render into (will be cleared)
 * @param {number} count - Number of radii and labels (e.g., 12)
 */
export function drawRadiiWithLabels(svg, count = 12) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.innerHTML = "";

  const cx = width / 2;
  const cy = height / 2;
  const margin = 32;
  const labelRadius = Math.min(cx, cy) - margin;
  const lineRadius = Math.sqrt(cx * cx + cy * cy);

  for (let i = 0; i < count; ++i) {
    const angle = i * (360 / count); // 0, 30, 60, ..., 330

    // Unit circle: x = cos, y = sin (y up, so SVG y = cy - ...)
    const x2 = cx + lineRadius * Math.cos(toRad(angle));
    const y2 = cy - lineRadius * Math.sin(toRad(angle));

    // Line
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", cx);
    line.setAttribute("y1", cy);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke", "#eee");
    line.setAttribute("stroke-width", 3);
    svg.appendChild(line);

    // Label
    const labelX = cx + labelRadius * Math.cos(toRad(angle));
    const labelY = cy - labelRadius * Math.sin(toRad(angle));
    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute('x', labelX);
    label.setAttribute('y', labelY);
    label.setAttribute('class', 'angle-label');
    label.textContent = `${angle}°`;
    svg.appendChild(label);
  }
}
