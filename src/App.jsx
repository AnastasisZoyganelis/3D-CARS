import Ball from '../components/Ball'
import { Suspense } from 'react'
import './App.css'
import { Canvas } from '@react-three/fiber'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import Info from '../components/Info';
function App() {


  return (
    <div>
    
    <div className='canvas-framer'>
    <h1 className='title'>THE FUTURE IS HERE</h1>
    <Info/>
    <Canvas id='threedcanvas' shadows>
     
    <Suspense fallback={null}>
    <Ball/>
    </Suspense>
    
    </Canvas>
    
    </div>
    </div>
  )
}

export default App
