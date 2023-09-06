import React, { useEffect, useRef } from 'react';
import { AngleToRadients } from '../helper/angle';
import { useFrame,useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { PerspectiveCamera,OrbitControls, Environment, useTexture } from '@react-three/drei';
import gsap from 'gsap';
import './Ball.css';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';



function Ball() {
    const OrbitControl=useRef(null);
    
    const modelRef = useRef(null);
    const model2Ref = useRef(null);
    const model3Ref = useRef(null);
    const timeline=gsap.timeline();
    const gltf = useLoader(GLTFLoader, '../assets/ferrari.glb');
    const gltf2 = useLoader(GLTFLoader, '../assets/ferrari2.glb');
    const gltf3 = useLoader(GLTFLoader, '../assets/buggati.glb');
    const planeTexture=useTexture('../assets/highway.jpg');
    const parkingTexture=useTexture('../assets/parkingwall.jpg');

    useEffect(()=> {
      if (!!modelRef.current){
            
            gsap.to(modelRef.current.position, { duration: 2.5, ease: "linear", z:2})
            
      }
    },[modelRef.current])
    useEffect(()=> {
      if (!!model2Ref.current){
            
            gsap.to(model2Ref.current.position, { duration: 2.5, ease: "linear", z:2 })
            
      }
    },[model2Ref.current])
    useEffect(()=> {
      if (!!model3Ref.current){
            
            gsap.to(model3Ref.current.position, { duration: 2.5, ease: "linear", z:2 })
            
      }
    },[model3Ref.current])
   

    useFrame((state)=>{
        if (!!OrbitControl.current){
            const {x,y}=state.mouse;
            OrbitControl.current.setAzimuthalAngle(-x*AngleToRadients(90));
            OrbitControl.current.setPolarAngle((y+1)*AngleToRadients(90));
            OrbitControl.current.update();
        }
        
        
    })
    
  return (
    
    <>
   
      <PerspectiveCamera makeDefault position={[0,2,7]}/>
     <OrbitControls ref={OrbitControl} minPolarAngle={AngleToRadients(80)} maxPolarAngle={AngleToRadients(80)} />
      <spotLight args={['white',25,10,AngleToRadients(120),1]} position={[1,2,4]} castShadow/>
      <pointLight position={[-4,1,4]} color={"white"} intensity={5}/>
      <pointLight position={[4,1,4]} color={"white"} intensity={5}/>
      {gltf && (
        <primitive object={gltf.scene} scale={0.5} position={[0, 0, -4]} rotation={[0, 6.2, 0]} ref={modelRef} classname='car1'/>
      )}
      {gltf2 && (
        <primitive object={gltf2.scene} scale={0.5} position={[2, 0, -4]} rotation={[0, 6.2, 0]} ref={model2Ref} />
      )}
      {gltf3 && (
        <primitive object={gltf3.scene} scale={0.5} position={[-2, 0, -4]} rotation={[0, 6.2, 0]} ref={model3Ref} />
      )}
   
      <mesh rotation={[-AngleToRadients(90),0,0]} receiveShadow>
        <planeGeometry args={[8,8]} />
        <meshStandardMaterial  map={planeTexture}/>
  </mesh>
  <mesh rotation={[0,0,0]} position={[0,4,-5]} receiveShadow>
        <planeGeometry args={[8,8]} />
        <meshStandardMaterial  map={parkingTexture}/>
  </mesh>
      <Environment background>
        <mesh scale={100}>
        <sphereGeometry args={[1,64,64]}/>
        <meshBasicMaterial side={THREE.BackSide} color="black"/>
        </mesh>
      </Environment>
    </>
  );
}

export default Ball;
