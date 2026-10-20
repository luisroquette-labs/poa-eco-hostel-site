"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { asset } from "../app/base";

type ViewName = "geral" | "fachada" | "jardim" | "piscina";

// Every view is tied to the supplied real photographs; no generated image is used.
export const PHOTO_EVIDENCE = {
  fachada: ["foto_007", "foto_008", "foto_009", "foto_012", "foto_054", "foto_059", "fotos de rua fornecidas em 2026-10-20"],
  lateralEsquerda: ["Street View de julho de 2025", "recortes laterais fornecidos em 2026-10-20"],
  acessos: ["foto_005", "foto_006", "foto_009", "foto_012"],
  corredor: ["foto_009", "foto_015"],
  piscina: ["foto_043", "foto_044", "foto_046", "foto_055"],
  pergolado: ["foto_043", "foto_044", "foto_046", "foto_055", "foto_106"],
  cachorro: ["foto fornecida pelo proprietário em 2026-10-20"],
} as const;

const views: Record<ViewName, { camera: THREE.Vector3Tuple; target: THREE.Vector3Tuple }> = {
  geral: { camera: [14.5, 10.5, 18.5], target: [0, 1.7, -4.8] },
  fachada: { camera: [8.3, 4.8, 14.5], target: [0.1, 2.2, 2.8] },
  jardim: { camera: [-10.8, 6.8, 11.8], target: [-1.25, 3.05, 0.45] },
  piscina: { camera: [7.8, 5.1, -4.7], target: [0.1, 0.8, -10.5] },
};

const viewLabels: Record<ViewName, string> = {
  geral: "Vista geral",
  fachada: "Fachada",
  jardim: "Lateral",
  piscina: "Piscina",
};

function ViewIcon({ view }: { view: ViewName }) {
  if (view === "geral") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 11 9-7 9 7" /><path d="M5 10v10h14V10M9 20v-6h6v6" /></svg>;
  if (view === "fachada") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20V7l8-3 8 3v13" /><path d="M2 20h20M8 10h3v3H8zM14 10h3v3h-3zM10 20v-4h4v4" /></svg>;
  if (view === "jardim") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 21V8h14v13M3 21h18" /><path d="M8 8V4h8v4M9 12h6M12 12v9" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 15c2-2 4-2 6 0s4 2 6 0 4-2 6 0M3 19c2-2 4-2 6 0s4 2 6 0 4-2 6 0" /><path d="M5 12V5M9 12V5M5 8h4" /></svg>;
}

function addBox(parent: THREE.Object3D, size: THREE.Vector3Tuple, position: THREE.Vector3Tuple, material: THREE.Material, rotation: THREE.Vector3Tuple = [0, 0, 0]) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
  mesh.position.set(...position);
  mesh.rotation.set(...rotation);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

function addCylinder(parent: THREE.Object3D, radius: number, height: number, position: THREE.Vector3Tuple, material: THREE.Material, segments = 24) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, height, segments), material);
  mesh.position.set(...position);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

function addHipRoof(parent: THREE.Object3D, width: number, depth: number, height: number, position: THREE.Vector3Tuple, material: THREE.Material) {
  const x = width / 2;
  const z = depth / 2;
  const ridge = Math.max(0, x - z);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute([
    -x, 0, -z, x, 0, -z, x, 0, z, -x, 0, z,
    -ridge, height, 0, ridge, height, 0,
  ], 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute([
    0, 0, 1, 0, 1, 1, 0, 1,
    (x - ridge) / (2 * x), 0.5, (x + ridge) / (2 * x), 0.5,
  ], 2));
  geometry.setIndex([0, 5, 1, 0, 4, 5, 3, 5, 4, 3, 2, 5, 0, 3, 4, 1, 5, 2]);
  geometry.computeVertexNormals();
  const roof = new THREE.Mesh(geometry, material);
  roof.position.set(...position);
  roof.castShadow = true;
  parent.add(roof);
}

function addRidgeTiles(parent: THREE.Object3D, length: number, position: THREE.Vector3Tuple, material: THREE.Material) {
  for (let offset = -length / 2; offset <= length / 2; offset += 0.28) {
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.34, 8), material);
    cap.position.set(position[0] + offset, position[1], position[2]);
    cap.rotation.z = Math.PI / 2;
    cap.castShadow = true;
    parent.add(cap);
  }
}

function addFramedWindow(parent: THREE.Object3D, x: number, y: number, z: number, dark: THREE.Material, white: THREE.Material, width = 1.25, height = 1.45) {
  addBox(parent, [width, height, 0.1], [x, y, z], dark);
  addBox(parent, [width + 0.18, 0.1, 0.18], [x, y + height / 2, z + 0.04], white);
  addBox(parent, [width + 0.18, 0.1, 0.18], [x, y - height / 2, z + 0.04], white);
  addBox(parent, [0.1, height + 0.1, 0.18], [x - width / 2, y, z + 0.04], white);
  addBox(parent, [0.1, height + 0.1, 0.18], [x + width / 2, y, z + 0.04], white);
  addBox(parent, [0.07, height, 0.16], [x, y, z + 0.08], white);
}

function addSideOpening(parent: THREE.Object3D, x: number, y: number, z: number, dark: THREE.Material, white: THREE.Material, width: number, height: number) {
  addBox(parent, [0.1, height, width], [x, y, z], dark);
  addBox(parent, [0.18, 0.1, width + 0.18], [x - 0.04, y + height / 2, z], white);
  addBox(parent, [0.18, 0.1, width + 0.18], [x - 0.04, y - height / 2, z], white);
  addBox(parent, [0.18, height + 0.1, 0.1], [x - 0.04, y, z - width / 2], white);
  addBox(parent, [0.18, height + 0.1, 0.1], [x - 0.04, y, z + width / 2], white);
  addBox(parent, [0.18, height, 0.055], [x - 0.065, y, z], white);
  for (const offset of [-0.26, 0, 0.26]) addBox(parent, [0.18, 0.045, width - 0.08], [x - 0.065, y + offset * height, z], white);
}

function addAirConditioner(parent: THREE.Object3D, x: number, y: number, z: number, casing: THREE.Material, dark: THREE.Material) {
  addBox(parent, [0.42, 0.48, 0.76], [x, y, z], casing);
  for (let offset = -0.22; offset <= 0.22; offset += 0.11) addBox(parent, [0.025, 0.26, 0.025], [x - 0.225, y - 0.02, z + offset], dark);
  for (const offset of [-0.22, 0.22]) addBox(parent, [0.25, 0.045, 0.08], [x - 0.03, y - 0.31, z + offset], dark);
  const hose = new THREE.Mesh(
    new THREE.TubeGeometry(new THREE.CatmullRomCurve3([
      new THREE.Vector3(x - 0.22, y - 0.1, z + 0.38),
      new THREE.Vector3(x - 0.28, y - 0.55, z + 0.5),
      new THREE.Vector3(x - 0.29, y - 0.78, z + 0.68),
    ]), 16, 0.025, 6, false),
    dark,
  );
  parent.add(hose);
}

function addBowGrille(parent: THREE.Object3D, centerX: number, centerZ: number, material: THREE.Material) {
  const point = (angle: number, radius: number, y: number) => new THREE.Vector3(
    centerX + Math.sin(angle) * radius * 1.08,
    y,
    centerZ + Math.cos(angle) * radius,
  );
  const addRail = (radius: number, y: number, thickness: number) => {
    const points = Array.from({ length: 25 }, (_, index) => point(-1.03 + index * (2.06 / 24), radius, y));
    const rail = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 48, thickness, 7, false), material);
    rail.castShadow = true;
    parent.add(rail);
  };

  addRail(1.83, 2.5, 0.045);
  addRail(1.95, 1.5, 0.032);
  addRail(2.13, 0.52, 0.045);
  for (let index = 0; index < 13; index += 1) {
    const angle = -1.01 + index * (2.02 / 12);
    const rib = new THREE.Mesh(
      new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3([
          point(angle, 1.83, 2.48),
          point(angle, 1.88, 1.88),
          point(angle, 1.97, 1.22),
          point(angle, 2.13, 0.54),
        ]),
        18,
        0.024,
        7,
        false,
      ),
      material,
    );
    rib.castShadow = true;
    parent.add(rib);
  }
}

function addPlant(parent: THREE.Object3D, x: number, z: number, scale: number, materials: THREE.Material[]) {
  addCylinder(parent, 0.1 * scale, 1.15 * scale, [x, 0.58 * scale, z], materials[0], 9);
  const crown = new THREE.IcosahedronGeometry(0.62 * scale, 1);
  for (const [dx, dy, dz, index] of [[0, 1.25, 0, 1], [-0.35, 1.05, 0.08, 2], [0.35, 1.05, -0.08, 1]] as const) {
    const leaves = new THREE.Mesh(crown, materials[index]);
    leaves.position.set(x + dx * scale, dy * scale, z + dz * scale);
    leaves.scale.set(1, 0.72, 1);
    leaves.castShadow = true;
    parent.add(leaves);
  }
}

function addPottedPalm(parent: THREE.Object3D, x: number, z: number, scale: number, pot: THREE.Material, trunk: THREE.Material, leaf: THREE.Material) {
  const planter = new THREE.Mesh(new THREE.CylinderGeometry(0.34 * scale, 0.25 * scale, 0.52 * scale, 12), pot);
  planter.position.set(x, 0.34 * scale, z);
  planter.castShadow = true;
  parent.add(planter);
  addCylinder(parent, 0.075 * scale, 1.35 * scale, [x, 1.18 * scale, z], trunk, 9);
  for (let index = 0; index < 7; index += 1) {
    const frond = new THREE.Mesh(new THREE.ConeGeometry(0.16 * scale, 1.5 * scale, 7), leaf);
    const angle = index * Math.PI * 2 / 7;
    frond.position.set(x + Math.cos(angle) * 0.48 * scale, 1.85 * scale, z + Math.sin(angle) * 0.48 * scale);
    frond.rotation.z = Math.PI / 2.6;
    frond.rotation.y = -angle;
    frond.castShadow = true;
    parent.add(frond);
  }
}

function addHostelDog(parent: THREE.Object3D, x: number, z: number) {
  const brown = new THREE.MeshStandardMaterial({ color: 0x9b5e38, roughness: 0.92 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x2a201b, roughness: 0.9 });
  const white = new THREE.MeshStandardMaterial({ color: 0xeee8da, roughness: 0.9 });
  const pink = new THREE.MeshStandardMaterial({ color: 0xe97f8c, roughness: 0.82 });
  const dog = new THREE.Group();

  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.28, 0.55, 6, 12), brown);
  body.position.y = 0.72;
  body.scale.set(1.05, 1, 0.88);
  dog.add(body);
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.46, 0.45), brown);
  head.position.set(0, 1.25, 0.13);
  head.rotation.x = -0.08;
  dog.add(head);
  const muzzle = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.22, 0.2), dark);
  muzzle.position.set(0, 1.16, 0.4);
  dog.add(muzzle);
  const chest = new THREE.Mesh(new THREE.CapsuleGeometry(0.14, 0.4, 5, 10), white);
  chest.position.set(0, 0.75, 0.26);
  chest.scale.set(1, 1, 0.34);
  dog.add(chest);
  const tongue = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.24, 0.05), pink);
  tongue.position.set(0, 1.0, 0.51);
  tongue.rotation.x = -0.22;
  dog.add(tongue);
  for (const side of [-1, 1]) {
    const ear = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.34, 4), dark);
    ear.position.set(side * 0.25, 1.48, 0.08);
    ear.rotation.z = side * 0.42;
    dog.add(ear);
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 6), dark);
    eye.position.set(side * 0.14, 1.32, 0.37);
    dog.add(eye);
  }
  for (const [legX, legZ] of [[-0.2, -0.12], [0.2, -0.12], [-0.2, 0.18], [0.2, 0.18]] as const) {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.075, 0.48, 8), brown);
    leg.position.set(legX, 0.3, legZ);
    dog.add(leg);
    const paw = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 6), white);
    paw.position.set(legX, 0.07, legZ + 0.04);
    paw.scale.set(1, 0.5, 1.25);
    dog.add(paw);
  }
  dog.position.set(x, 0.17, z);
  dog.rotation.y = 0.04;
  dog.scale.setScalar(0.78);
  dog.traverse((object) => { if (object instanceof THREE.Mesh) object.castShadow = true; });
  parent.add(dog);
}

function makePatternTexture(kind: "paving" | "deck" | "roof") {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext("2d")!;
  if (kind === "paving") {
    context.fillStyle = "#8c877b";
    context.fillRect(0, 0, 128, 128);
    for (let row = 0; row < 8; row += 1) for (let column = 0; column < 8; column += 1) {
      context.fillStyle = (row + column) % 2 ? "#777267" : "#a8a092";
      context.fillRect(column * 16 + 1, row * 16 + 1, 14, 14);
    }
  } else if (kind === "deck") {
    context.fillStyle = "#b98a54";
    context.fillRect(0, 0, 128, 128);
    for (let x = 0; x < 128; x += 16) {
      context.fillStyle = x % 32 ? "#c49a67" : "#a97949";
      context.fillRect(x + 1, 0, 13, 128);
      context.fillStyle = "#795735";
      context.fillRect(x, 0, 1, 128);
    }
  } else {
    context.fillStyle = "#87442f";
    context.fillRect(0, 0, 128, 128);
    context.lineWidth = 1.5;
    for (let row = 0; row < 8; row += 1) {
      const y = row * 17 - 2;
      const offset = row % 2 ? -8 : 0;
      for (let x = offset; x < 136; x += 16) {
        context.fillStyle = (row + Math.floor(x / 16)) % 3 === 0 ? "#a95d3d" : "#984f35";
        context.beginPath();
        context.moveTo(x + 1, y);
        context.lineTo(x + 15, y);
        context.lineTo(x + 14, y + 12);
        context.arc(x + 8, y + 12, 6, 0, Math.PI);
        context.closePath();
        context.fill();
        context.strokeStyle = "#663324";
        context.stroke();
      }
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(kind === "roof" ? 2 : 5, kind === "deck" ? 4 : 7);
  return texture;
}

function createHostelModel() {
  const root = new THREE.Group();
  root.userData.photoEvidence = PHOTO_EVIDENCE;

  const green = new THREE.MeshStandardMaterial({ color: 0x62c928, roughness: 0.82 });
  const greenDark = new THREE.MeshStandardMaterial({ color: 0x3f9227, roughness: 0.84 });
  const white = new THREE.MeshStandardMaterial({ color: 0xf6f1df, roughness: 0.72 });
  const glass = new THREE.MeshPhysicalMaterial({ color: 0xb8d3c6, roughness: 0.2, metalness: 0.05, transparent: true, opacity: 0.76 });
  const iron = new THREE.MeshStandardMaterial({ color: 0xf7f5e9, roughness: 0.48, metalness: 0.25 });
  const stone = new THREE.MeshStandardMaterial({ color: 0x746c5e, roughness: 0.96 });
  const paving = new THREE.MeshStandardMaterial({ map: makePatternTexture("paving"), roughness: 0.98 });
  const tile = new THREE.MeshStandardMaterial({ map: makePatternTexture("roof"), roughness: 0.91 });
  const gutter = new THREE.MeshStandardMaterial({ color: 0x273d2d, roughness: 0.56, metalness: 0.28 });
  const deck = new THREE.MeshStandardMaterial({ map: makePatternTexture("deck"), roughness: 0.9 });
  const pergola = new THREE.MeshStandardMaterial({ color: 0xa8422d, roughness: 0.83 });
  const wood = new THREE.MeshStandardMaterial({ color: 0x603924, roughness: 0.88 });
  const leaf = new THREE.MeshStandardMaterial({ color: 0x246a2b, roughness: 0.94 });
  const leafLight = new THREE.MeshStandardMaterial({ color: 0x58a63a, roughness: 0.93 });
  const yellow = new THREE.MeshStandardMaterial({ color: 0xf5cf34, roughness: 0.72 });
  const mural = new THREE.MeshStandardMaterial({ color: 0x284d72, roughness: 0.94 });

  // Narrow urban lot: paved front court, lateral passage and pool deck (009, 015, 043–046).
  addBox(root, [11.4, 0.16, 23], [0, 0, -5.6], paving);
  addBox(root, [7.8, 0.08, 8.2], [0.7, 0.12, -10.7], deck);
  for (let z = 5.2; z > -5.6; z -= 0.62) addBox(root, [1.5, 0.035, 0.035], [-4.65, 0.19, z], white);
  // Street frontage from the supplied street photo: mural gate, pedestrian gate and green wall.
  const muralTexture = new THREE.TextureLoader().load(asset("/assets/gate-mural-reference.png"));
  muralTexture.colorSpace = THREE.SRGBColorSpace;
  const muralGate = new THREE.MeshStandardMaterial({ map: muralTexture, roughness: 0.82 });
  addBox(root, [2.8, 2.25, 0.1], [-4.08, 1.2, 5.78], muralGate);
  for (let x = -2.15; x <= -0.82; x += 0.22) addBox(root, [0.035, 2.05, 0.045], [x, 1.1, 5.78], iron);
  for (const y of [0.16, 1.08, 2.05]) addBox(root, [1.45, 0.055, 0.055], [-1.48, y, 5.78], iron);
  addBox(root, [4.3, 1.2, 0.18], [3.55, 0.66, 5.76], green);
  for (let x = 1.62; x <= 5.45; x += 0.28) addBox(root, [0.035, 0.78, 0.04], [x, 1.58, 5.77], iron);
  addBox(root, [4.15, 0.07, 0.06], [3.55, 2.0, 5.77], iron);
  for (const x of [-2.36, -0.58, 1.32, 5.67]) addBox(root, [0.28, 2.55, 0.3], [x, 1.29, 5.73], green);

  // Main house: recessed porch + ground bow window + set-back upper storey (007–009, 012, 054).
  addBox(root, [7.5, 2.75, 5.5], [0.45, 1.49, 0.8], green);
  addBox(root, [5.2, 2.2, 4.55], [0.7, 4.05, 0.3], green);
  // Current Street View: green ground floor; the exposed upper left elevation is white.
  addBox(root, [0.08, 2.2, 4.55], [-1.94, 4.05, 0.3], white);
  addSideOpening(root, -2.0, 4.02, 1.25, glass, white, 0.76, 1.72);
  addSideOpening(root, -2.0, 4.1, -0.72, glass, white, 0.94, 1.18);
  addBox(root, [0.19, 1.06, 0.06], [-2.08, 4.1, -0.72], white);
  addAirConditioner(root, -2.18, 3.55, -1.67, white, gutter);
  const bow = new THREE.Mesh(new THREE.CylinderGeometry(1.72, 1.72, 2.68, 32, 1, false, 0, Math.PI), green);
  bow.position.set(1.55, 1.53, 3.28);
  bow.scale.x = 1.08;
  bow.castShadow = true;
  bow.receiveShadow = true;
  root.add(bow);

  // Curved three-part window and its characteristic flared white grille (007, 008).
  for (const angle of [-0.6, 0, 0.6]) {
    const window = new THREE.Group();
    addFramedWindow(window, 0, 0, 0, glass, white, 0.78, 1.58);
    window.position.set(1.55 + Math.sin(angle) * 1.72 * 1.08, 1.62, 3.28 + Math.cos(angle) * 1.72);
    window.rotation.y = angle;
    root.add(window);
  }
  addBowGrille(root, 1.55, 3.28, iron);

  // Continuous L-shaped balcony/parapet from the current street photograph.
  addBox(root, [3.75, 0.72, 0.28], [-0.25, 3.28, 3.83], green);
  const parapet = new THREE.Mesh(new THREE.CylinderGeometry(1.9, 1.9, 0.68, 32, 1, true, 0, Math.PI), green);
  parapet.position.set(1.55, 3.28, 3.25);
  parapet.scale.x = 1.08;
  parapet.castShadow = true;
  root.add(parapet);
  for (const [x, width] of [[-1.12, 0.92], [0.12, 0.7]] as const) {
    for (const y of [3.15, 3.37, 3.59]) addBox(root, [width, 0.075, 0.12], [x, y, 4.01], white);
  }
  for (const y of [3.15, 3.37, 3.59]) addBox(root, [0.72, 0.075, 0.12], [1.98, y, 4.98], white);
  for (const y of [0.47, 0.82]) addBox(root, [3.65, 0.11, 0.13], [1.55, y, 4.88], white);

  // Recessed porch and two distinct access flows (009, 012).
  addBox(root, [2.65, 0.16, 2.0], [-2.38, 2.86, 3.75], white);
  addBox(root, [2.55, 1.02, 0.08], [-2.4, 0.88, 4.45], tile);
  addBox(root, [1.03, 2.0, 0.11], [-2.15, 1.63, 4.5], glass);
  for (const x of [-2.5, -2.32, -2.15, -1.98, -1.8]) addBox(root, [0.025, 1.82, 0.04], [x, 1.63, 4.63], iron);
  addBox(root, [0.92, 0.035, 0.05], [-2.15, 1.63, 4.64], iron);
  addFramedWindow(root, -3.28, 1.64, 4.5, glass, white, 0.58, 1.45);
  addCylinder(root, 0.17, 2.68, [-3.65, 1.48, 4.35], green, 20);
  addCylinder(root, 0.29, 0.16, [-3.65, 2.82, 4.35], white, 12);
  for (let step = 0; step < 4; step += 1) addBox(root, [1.85 - step * 0.12, 0.17, 0.55], [-2.15, 0.19 + step * 0.16, 5.15 - step * 0.35], stone);
  for (let x = -5.2; x <= -3.9; x += 0.26) addBox(root, [0.035, 1.85, 0.04], [x, 1.14, 4.86], greenDark);
  for (const y of [0.24, 2.05]) addBox(root, [1.55, 0.055, 0.05], [-4.55, y, 4.86], iron);

  addFramedWindow(root, -0.92, 4.12, 2.62, glass, white, 1.05, 1.3);
  addFramedWindow(root, 1.25, 4.12, 2.62, glass, white, 1.72, 1.3);
  addBox(root, [0.07, 1.3, 0.16], [0.96, 4.12, 2.7], white);
  addBox(root, [0.07, 1.3, 0.16], [1.54, 4.12, 2.7], white);
  addBox(root, [7.15, 0.12, 5.8], [0.25, 5.2, 0.2], white);
  addHipRoof(root, 7.15, 5.8, 1.05, [0.25, 5.22, 0.2], tile);
  addHipRoof(root, 2.85, 2.45, 0.48, [-2.35, 2.92, 3.65], tile);
  addRidgeTiles(root, 1.36, [0.25, 6.3, 0.2], tile);
  addRidgeTiles(root, 0.42, [-2.35, 3.43, 3.65], tile);
  addBox(root, [7.42, 0.11, 0.15], [0.25, 5.18, 3.14], gutter);
  addBox(root, [7.42, 0.11, 0.15], [0.25, 5.18, -2.74], gutter);
  addBox(root, [0.15, 0.11, 6.0], [-3.39, 5.18, 0.2], gutter);
  addBox(root, [0.15, 0.11, 6.0], [3.89, 5.18, 0.2], gutter);
  addBox(root, [3.04, 0.09, 0.13], [-2.35, 2.89, 4.9], gutter);

  // Side corridor: close walls, mural, lockers and tiled service building (015).
  addBox(root, [0.12, 3.0, 10.8], [-5.48, 1.5, -0.4], white);
  addBox(root, [0.14, 2.2, 4.8], [-5.39, 1.18, -1.7], mural);
  for (let z = 1.0; z > -4.2; z -= 1.25) addBox(root, [0.17, 1.5, 0.82], [-3.88, 0.85, z], z > -1.5 ? greenDark : tile);
  addBox(root, [2.25, 2.35, 1.8], [-4.15, 1.23, -5.8], white);
  addHipRoof(root, 2.65, 2.15, 0.48, [-4.15, 2.43, -5.8], tile);

  // Rounded pool, broad pale rim, deck and stainless ladder (043, 044, 046, 055).
  const poolShape = new THREE.Shape();
  poolShape.moveTo(-2.55, -2.15);
  poolShape.bezierCurveTo(-3.25, -1.2, -3.2, 1.25, -2.1, 2.15);
  poolShape.bezierCurveTo(-0.4, 2.75, 2.8, 2.35, 3.15, 0.65);
  poolShape.bezierCurveTo(3.45, -0.9, 2.05, -2.15, -0.3, -2.38);
  poolShape.bezierCurveTo(-1.3, -2.45, -2.15, -2.4, -2.55, -2.15);
  const rim = new THREE.Mesh(new THREE.ShapeGeometry(poolShape), white);
  rim.rotation.x = -Math.PI / 2;
  rim.position.set(0.45, 0.21, -10.35);
  rim.scale.set(1.14, 1.14, 1.14);
  rim.receiveShadow = true;
  root.add(rim);
  const water = new THREE.Mesh(new THREE.ShapeGeometry(poolShape), new THREE.MeshPhysicalMaterial({ color: 0x35bed2, roughness: 0.08, transmission: 0.16, transparent: true, opacity: 0.92 }));
  water.rotation.x = -Math.PI / 2;
  water.position.set(0.45, 0.25, -10.35);
  root.add(water);
  for (const x of [2.25, 2.85]) {
    const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(x, 0.18, -8.1), new THREE.Vector3(x, 0.95, -8.0), new THREE.Vector3(x, 1.14, -8.45)]);
    root.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 18, 0.045, 8, false), iron));
  }

  // Longitudinal red pergola stays beside the pool and never crosses the water (043–046, 106).
  for (const x of [-4.75, -3.0]) for (const z of [-7.2, -10.2, -13.15]) addBox(root, [0.17, 2.75, 0.17], [x, 1.48, z], pergola);
  for (const x of [-4.75, -3.0]) addBox(root, [0.19, 0.17, 6.3], [x, 2.83, -10.15], pergola);
  for (let z = -7.2; z >= -13.15; z -= 0.62) addBox(root, [2.05, 0.12, 0.13], [-3.88, 2.88, z], pergola);
  for (let z = -7.65; z >= -12.7; z -= 0.46) addBox(root, [1.62, 0.08, 0.12], [-3.88, 1.7, z], wood);

  // Rear outbuilding with green trim, glass blocks and clay hip roof (044–046, 055).
  addBox(root, [6.8, 2.75, 2.55], [1.35, 1.48, -15.0], white);
  addBox(root, [2.0, 1.3, 0.12], [1.7, 1.45, -13.69], glass);
  for (const x of [0.78, 1.23, 1.68, 2.13, 2.58]) addBox(root, [0.04, 1.28, 0.15], [x, 1.45, -13.62], greenDark);
  addBox(root, [1.05, 1.95, 0.12], [-0.8, 1.15, -13.69], wood);
  addHipRoof(root, 7.25, 3.0, 0.72, [1.35, 2.9, -15.0], tile);
  addRidgeTiles(root, 4.26, [1.35, 3.65, -15.0], tile);
  addBox(root, [7.48, 0.1, 0.14], [1.35, 2.87, -13.45], gutter);

  // Dense, irregular landscaping based on the front garden and pool photographs.
  for (const [x, z, scale] of [[-2.75, 3.7, 0.72], [3.25, 4.2, 0.92], [4.25, 3.35, 1.08], [-2.2, -13.7, 0.85], [4.2, -12.9, 1.1]] as const) addPlant(root, x, z, scale, [wood, leaf, leafLight]);
  addPottedPalm(root, -2.55, -7.55, 0.9, tile, wood, leafLight);
  addPottedPalm(root, 4.25, -8.3, 0.78, tile, wood, leaf);
  addPottedPalm(root, 3.9, -13.0, 0.92, tile, wood, leafLight);
  for (const [x, z] of [[-2.8, 3.85], [3.35, 4.25], [4.05, 3.7]] as const) {
    for (let bloom = 0; bloom < 4; bloom += 1) {
      const flower = new THREE.Mesh(new THREE.SphereGeometry(0.085, 8, 6), yellow);
      flower.position.set(x + (bloom - 1.5) * 0.12, 1.1 + (bloom % 2) * 0.25, z);
      root.add(flower);
    }
  }
  addHostelDog(root, -1.15, 4.75);
  return root;
}

export default function HostelModel3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const selectViewRef = useRef<(view: ViewName) => void>(() => undefined);
  const toggleRotationRef = useRef<() => void>(() => undefined);
  const [activeView, setActiveView] = useState<ViewName>("geral");
  const [available, setAvailable] = useState(true);
  const [rotating, setRotating] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      setAvailable(false);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.055;
    controls.minDistance = 5;
    controls.maxDistance = 36;
    controls.maxPolarAngle = Math.PI * 0.49;
    controls.enablePan = false;
    controls.autoRotate = !reducedMotion.matches;
    controls.autoRotateSpeed = 0.28;
    setRotating(controls.autoRotate);

    scene.add(new THREE.HemisphereLight(0xf8ffe9, 0x50604a, 2.35));
    const sun = new THREE.DirectionalLight(0xfff2cd, 4.1);
    sun.position.set(-9, 17, 12);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1536, 1536);
    sun.shadow.camera.left = -19;
    sun.shadow.camera.right = 19;
    sun.shadow.camera.top = 19;
    sun.shadow.camera.bottom = -19;
    scene.add(sun);
    scene.add(createHostelModel());

    let currentView: ViewName = "geral";
    const nextPosition = new THREE.Vector3();
    const nextTarget = new THREE.Vector3();
    const currentTarget = new THREE.Vector3();
    let moving = false;
    let frame = 0;
    let observer: IntersectionObserver | undefined;
    let visible = true;

    const fitView = (view: ViewName, instant = false) => {
      const aspect = mount.clientWidth / Math.max(mount.clientHeight, 1);
      const scale = aspect < 0.85 ? 1.42 : aspect < 1.2 ? 1.2 : 1;
      const config = views[view];
      nextTarget.set(...config.target);
      nextPosition.set(...config.camera).sub(nextTarget).multiplyScalar(scale).add(nextTarget);
      if (instant || reducedMotion.matches) {
        camera.position.copy(nextPosition);
        controls.target.copy(nextTarget);
        currentTarget.copy(nextTarget);
        moving = false;
      } else {
        moving = true;
      }
    };

    fitView("geral", true);
    selectViewRef.current = (view) => {
      currentView = view;
      controls.autoRotate = false;
      setRotating(false);
      fitView(view);
      setActiveView(view);
    };
    toggleRotationRef.current = () => {
      controls.autoRotate = !controls.autoRotate && !reducedMotion.matches;
      setRotating(controls.autoRotate);
    };
    const stopRotation = () => {
      moving = false;
      controls.autoRotate = false;
      setRotating(false);
    };
    controls.addEventListener("start", stopRotation);

    const resize = () => {
      renderer.setSize(mount.clientWidth, mount.clientHeight, false);
      camera.aspect = mount.clientWidth / Math.max(mount.clientHeight, 1);
      camera.updateProjectionMatrix();
      fitView(currentView, true);
    };
    const handleReducedMotion = () => {
      if (!reducedMotion.matches) return;
      controls.autoRotate = false;
      setRotating(false);
      fitView(currentView, true);
    };
    const render = () => {
      frame = window.requestAnimationFrame(render);
      if (!visible || document.hidden) return;
      if (moving) {
        camera.position.lerp(nextPosition, 0.06);
        currentTarget.lerp(nextTarget, 0.06);
        controls.target.copy(currentTarget);
        if (camera.position.distanceTo(nextPosition) < 0.02) moving = false;
      } else {
        currentTarget.copy(controls.target);
      }
      controls.update();
      renderer.render(scene, camera);
    };

    resize();
    window.addEventListener("resize", resize);
    reducedMotion.addEventListener("change", handleReducedMotion);
    observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0.02 });
    observer.observe(mount);
    render();

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      reducedMotion.removeEventListener("change", handleReducedMotion);
      observer?.disconnect();
      controls.removeEventListener("start", stopRotation);
      controls.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      scene.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        object.geometry.dispose();
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.forEach((material) => {
          if (material instanceof THREE.MeshStandardMaterial) material.map?.dispose();
          material.dispose();
        });
      });
    };
  }, []);

  return (
    <div className="model-stage">
      {!available && <img className="model-stage__fallback" src={asset("/assets/model-fallback-real.jpg")} alt="Fachada verde real do POA Eco Hostel" />}
      {available && <div ref={mountRef} className="model-stage__canvas" style={{ "--model-cursor-open": `url("${asset("/assets/cursors/glove-open.png")}") 24 8`, "--model-cursor-grab": `url("${asset("/assets/cursors/glove-grab.png")}") 28 24` } as CSSProperties} aria-label="Maquete 3D navegável do POA Eco Hostel baseada em fotografias reais" role="img" />}
      {available && (
        <div className="model-stage__gesture-hint" aria-label="Arraste para girar e use a roda do mouse para aproximar ou afastar">
          <svg className="gesture-icon gesture-icon--rotate" viewBox="0 0 40 40" aria-hidden="true">
            <path d="M30 13a13 13 0 0 0-20 2" />
            <path d="m8 10 1 6 6-1" />
            <path d="M10 27a13 13 0 0 0 20-2" />
            <path d="m32 30-1-6-6 1" />
          </svg>
          <svg className="gesture-icon gesture-icon--zoom-in" viewBox="0 0 40 40" aria-hidden="true">
            <rect x="13" y="5" width="14" height="25" rx="7" />
            <path d="M20 6v7" /><path d="m16 20 4-4 4 4" />
            <path d="M31 28v8M27 32h8" />
          </svg>
          <svg className="gesture-icon gesture-icon--zoom-out" viewBox="0 0 40 40" aria-hidden="true">
            <rect x="13" y="5" width="14" height="25" rx="7" />
            <path d="M20 6v7" /><path d="m16 16 4 4 4-4" />
            <path d="M27 32h8" />
          </svg>
        </div>
      )}
      {available && (
        <div className="model-stage__controls">
          <div className="model-stage__views" aria-label="Vistas guiadas da maquete 3D">
            {(Object.keys(views) as ViewName[]).map((view) => (
              <button key={view} className={activeView === view ? "is-active" : ""} type="button" aria-pressed={activeView === view} onClick={() => selectViewRef.current(view)}>
                <ViewIcon view={view} />
                <span className="sr-only">{viewLabels[view]}</span>
              </button>
            ))}
          </div>
          <button className="model-stage__rotation" type="button" aria-label={rotating ? "Pausar rotação" : "Girar maquete"} aria-pressed={rotating} onClick={() => toggleRotationRef.current()}>
            {rotating
              ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 7v10M15 7v10" /></svg>
              : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 7v5h-5" /><path d="M19 12a7 7 0 1 0-1 5" /></svg>}
          </button>
        </div>
      )}
    </div>
  );
}
