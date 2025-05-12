
import './App.css'
import ImageUploadModal from './Components/ImageUploadModal/ImageUploadModal'
import UploadModal from './Components/UploadModal'
import { ImageModalState } from './context/ImageUpload';

function App() {
  const {isImageModalOpen,setIsImageModalOpen}=ImageModalState();
  return (
    <>
     
      <ImageUploadModal isOpen={isImageModalOpen} onClose={setIsImageModalOpen} />
    </>
  )
}

export default App
