import { CURRENT_SCREEN } from "./common/utils";
import BulkProcessingLayout from "./Components/BulkProcessLayout/Index";
import ImageUploadModal from "./Components/ImageUploadModal/ImageUploadModal";
import { ImageModalState } from "./context/ImageUpload";
import styles from "./Components/BulkProcessLayout/styles.module.css";

function App() {
  const { currentScreen } = ImageModalState();

  return (
    <div className={styles.parentContainer}>
      {currentScreen === CURRENT_SCREEN.BULK_PROCESS_SCREEN && (
        <BulkProcessingLayout />
      )}
      {currentScreen === CURRENT_SCREEN.UPLOAD_SCREEN && <ImageUploadModal />}
      {/* {currentScreen === CURRENT_SCREEN.LOGIN_SCREEN && <LoginScreen />} */}
    </div>
  );
}

export default App;
