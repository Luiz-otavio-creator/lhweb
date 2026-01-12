import { ReactThreeFiber } from "@react-three/fiber";
import { ShaderMaterial } from "three";

declare module "@react-three/fiber" {
  interface ThreeElements {
    galaxyGlassMaterial: ReactThreeFiber.Object3DNode<
      ShaderMaterial,
      typeof ShaderMaterial
    >;
  }
}
