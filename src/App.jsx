
import BulkProcessingLayout from './Components/BulkProcessLayout/Index'
import EmailModal from './Components/EmailModal/EmailModal';
import ImageUploadModal from './Components/ImageUploadModal/ImageUploadModal'
function App() {
  const handleClose = () => {
    // Handle any cleanup or state updates when modal closes
  };
  return (
    <>
     <BulkProcessingLayout />

<EmailModal  onClose={handleClose} />
    </>
  )
}

export default App
