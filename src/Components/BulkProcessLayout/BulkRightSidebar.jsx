import React, { useRef, useState, useEffect } from "react";
import classes from "./styles.module.css";

const BulkRightSidebar = ({ steps, removeStep, editStep, moveStep }) => {
  const [draggedIdx, setDraggedIdx] = useState(null);
  const [editingStep, setEditingStep] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const dragOverIdx = useRef(null);

  // Check if all required fields are filled
  useEffect(() => {
    const hasBackgroundReplacer = steps.some(step => step.tool === "BACKGROUND_REPLACER");
    const hasImageUpscaler = steps.some(step => step.tool === "IMAGE_UPSCALER");

    const isBackgroundReplacerValid = !hasBackgroundReplacer || 
      steps.find(step => step.tool === "BACKGROUND_REPLACER")?.value?.trim() !== "";

    const isImageUpscalerValid = !hasImageUpscaler || 
      (steps.find(step => step.tool === "IMAGE_UPSCALER")?.value?.width && 
       steps.find(step => step.tool === "IMAGE_UPSCALER")?.value?.height);

    setIsValid(isBackgroundReplacerValid && isImageUpscalerValid);
  }, [steps]);

  const handleEdit = (idx, step) => {
    setEditingStep(idx);
  };

  const handleSave = (idx, value) => {
    editStep(idx, { ...steps[idx], value: value.trim() });
    setEditingStep(null);
  };

  const handleInputChange = (idx, value) => {
    editStep(idx, { ...steps[idx], value });
  };

  const handleDimensionChange = (idx, dimension, value) => {
    const currentStep = steps[idx];
    const currentValue = currentStep.value || {};
    editStep(idx, {
      ...currentStep,
      value: {
        ...currentValue,
        [dimension]: value
      }
    });
  };

  const handleStartBatchProcess = () => {
    if (!isValid) return;
    console.log('Starting batch process with steps:', steps);
  };

  return (
    <div className={classes.rightSidebar}>
      {/* Fixed Input Image Step */}

      {/* Dynamic Steps */}
      {steps.map((step, idx) => (
        <div
          key={step.id}
          className={classes.workflowStep}
          draggable
          onDragStart={() => setDraggedIdx(idx)}
          onDragOver={(e) => {
            e.preventDefault();
            dragOverIdx.current = idx;
          }}
          onDrop={() => {
            if (
              draggedIdx !== null &&
              dragOverIdx.current !== null &&
              draggedIdx !== dragOverIdx.current
            ) {
              moveStep(draggedIdx, dragOverIdx.current);
            }
            setDraggedIdx(null);
            dragOverIdx.current = null;
          }}
          style={{
            opacity: draggedIdx === idx ? 0.5 : 1,
            cursor: "move",
          }}
        >
          <div className={classes.stepHeader}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="18"
              viewBox="0 0 17 18"
              fill="none"
            >
              <g clip-path="url(#clip0_35_12810)">
                <path
                  d="M1.625 3.25C2.24632 3.25 2.75 2.74632 2.75 2.125C2.75 1.50368 2.24632 1 1.625 1C1.00368 1 0.5 1.50368 0.5 2.125C0.5 2.74632 1.00368 3.25 1.625 3.25Z"
                  fill="#1A1A1A"
                  fill-opacity="0.5"
                />
                <path
                  d="M8.375 3.25C8.99632 3.25 9.5 2.74632 9.5 2.125C9.5 1.50368 8.99632 1 8.375 1C7.75368 1 7.25 1.50368 7.25 2.125C7.25 2.74632 7.75368 3.25 8.375 3.25Z"
                  fill="#1A1A1A"
                  fill-opacity="0.5"
                />
                <path
                  d="M1.625 9.625C2.24632 9.625 2.75 9.12132 2.75 8.5C2.75 7.87868 2.24632 7.375 1.625 7.375C1.00368 7.375 0.5 7.87868 0.5 8.5C0.5 9.12132 1.00368 9.625 1.625 9.625Z"
                  fill="#1A1A1A"
                  fill-opacity="0.5"
                />
                <path
                  d="M8.375 9.625C8.99632 9.625 9.5 9.12132 9.5 8.5C9.5 7.87868 8.99632 7.375 8.375 7.375C7.75368 7.375 7.25 7.87868 7.25 8.5C7.25 9.12132 7.75368 9.625 8.375 9.625Z"
                  fill="#1A1A1A"
                  fill-opacity="0.5"
                />
                <path
                  d="M1.625 16C2.24632 16 2.75 15.4963 2.75 14.875C2.75 14.2537 2.24632 13.75 1.625 13.75C1.00368 13.75 0.5 14.2537 0.5 14.875C0.5 15.4963 1.00368 16 1.625 16Z"
                  fill="#1A1A1A"
                  fill-opacity="0.5"
                />
                <path
                  d="M8.375 16C8.99632 16 9.5 15.4963 9.5 14.875C9.5 14.2537 8.99632 13.75 8.375 13.75C7.75368 13.75 7.25 14.2537 7.25 14.875C7.25 15.4963 7.75368 16 8.375 16Z"
                  fill="#1A1A1A"
                  fill-opacity="0.5"
                />
              </g>
              <defs>
                <clipPath id="clip0_35_12810">
                  <rect
                    width="17"
                    height="17"
                    fill="white"
                    transform="translate(0 0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
            <span className={classes.stepTool}>
              {step.tool
                .replace(/_/g, " ")
                .toLowerCase()
                .replace(/\b\w/g, (l) => l.toUpperCase())}
            </span>
            <button
              onClick={() => handleEdit(idx, step)}
              className={classes.editBtn}
            >
              ✏️
            </button>
            <button
              onClick={() => removeStep(idx)}
              className={classes.deleteBtn}
            >
              🗑️
            </button>
          </div>
          
          {/* Show input field for background replacer */}
          {editingStep === idx && step.tool === "BACKGROUND_REPLACER" && (
            <div className={classes.editSection}>
              <textarea
                placeholder="Enter background color or image URL"
                value={step.value || ""}
                onChange={(e) => handleInputChange(idx, e.target.value)}
                className={classes.editInput}
                rows={3}
                required
              />
              {!step.value?.trim() && (
                <span className={classes.errorText}>This field is required</span>
              )}
            </div>
          )}

          {/* Show dimension inputs for image upscaler */}
          {editingStep === idx && step.tool === "AI_EXTENDER" && (
            <div className={classes.editSection}>
              <div className={classes.dimensionInputs}>
                <div className={classes.dimensionGroup}>
                  <label>Width (px)</label>
                  <input
                    type="number"
                    placeholder="Enter width"
                    value={step.value?.width || ""}
                    onChange={(e) => handleDimensionChange(idx, 'width', e.target.value)}
                    className={classes.dimensionInput}
                    min="1"
                    required
                  />
                  {!step.value?.width && (
                    <span className={classes.errorText}>Width is required</span>
                  )}
                </div>
                <div className={classes.dimensionGroup}>
                  <label>Height (px)</label>
                  <input
                    type="number"
                    placeholder="Enter height"
                    value={step.value?.height || ""}
                    onChange={(e) => handleDimensionChange(idx, 'height', e.target.value)}
                    className={classes.dimensionInput}
                    min="1"
                    required
                  />
                  {!step.value?.height && (
                    <span className={classes.errorText}>Height is required</span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Fixed Output Settings Step */}
      <div className={classes.workflowStep}>
        <div className={classes.stepTool}>
          <span role="img" aria-label="output">
            ⬇️
          </span>{" "}
          Output Settings
        </div>
      </div>

      {/* Start Batch Process Button */}
      <button 
        onClick={handleStartBatchProcess}
        className={classes.startBatchButton}
        disabled={!isValid}
      >
        Start Batch Process
      </button>
    </div>
  );
};

export default BulkRightSidebar;
