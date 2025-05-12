import React, { useState } from 'react';
import BulkLeftSidebar from './BulkLeftSidebar';
import styles from './styles.module.css';
import BulkMainScreen from './BulkMainScreen';
import BulkRightSidebar from './BulkRightSidebar';

const BulkProcessingLayout = () => {
  // Workflow steps (excluding Input Image and Output Settings)
  const [steps, setSteps] = useState([]);

  // Add a tool as a new step
  const addStep = (tool) => {
    setSteps([...steps, { tool, id: Date.now() }]);
  };

  // Remove a step by index
  const removeStep = (index) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  // (Optional) Edit a step
  const editStep = (index, newData) => {
    setSteps(steps.map((step, i) => (i === index ? { ...step, ...newData } : step)));
  };

  // (Optional) Move a step (for reordering)
  const moveStep = (from, to) => {
    const updated = [...steps];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setSteps(updated);
  };

  return (
    <div className={styles.container}>

      {/* <navbar />  */}
      <div className={styles.contentWrapper}>
        <BulkLeftSidebar addStep={addStep} />
        <div className={styles.mainContent}>
          <BulkMainScreen />
        </div>
        <BulkRightSidebar
          steps={steps}
          removeStep={removeStep}
          editStep={editStep}
          moveStep={moveStep}
        />
      </div>
    </div>
  );
};

export default BulkProcessingLayout;
