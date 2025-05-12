import React, { useRef, useState } from 'react'
import classes from './styles.module.css'

const BulkRightSidebar = ({ steps, removeStep, editStep, moveStep }) => {
  const [draggedIdx, setDraggedIdx] = useState(null);
  const dragOverIdx = useRef(null);

  return (
    <div className={classes.rightSidebar}>
      {/* Fixed Input Image Step */}
      <div className={classes.workflowStep}>
        <div className={classes.fixedStep}>
          <span role="img" aria-label="input">📤</span> Input Image
        </div>
      </div>

      {/* Dynamic Steps */}
      {steps.map((step, idx) => (
        <div
          key={step.id}
          className={classes.workflowStep}
          draggable
          onDragStart={() => setDraggedIdx(idx)}
          onDragOver={e => {
            e.preventDefault();
            dragOverIdx.current = idx;
          }}
          onDrop={() => {
            if (draggedIdx !== null && dragOverIdx.current !== null && draggedIdx !== dragOverIdx.current) {
              moveStep(draggedIdx, dragOverIdx.current);
            }
            setDraggedIdx(null);
            dragOverIdx.current = null;
          }}
          style={{
            opacity: draggedIdx === idx ? 0.5 : 1,
            cursor: 'move'
          }}
        >
          <div className={classes.stepHeader}>
            <span className={classes.stepNumber}>Step {idx + 1}</span>
            <span className={classes.stepTool}>{step.tool.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}</span>
            <button onClick={() => editStep(idx, { /* ... */ })} className={classes.editBtn}>✏️</button>
            <button onClick={() => removeStep(idx)} className={classes.deleteBtn}>🗑️</button>
          </div>
        </div>
      ))}

      {/* Fixed Output Settings Step */}
      <div className={classes.workflowStep}>
        <div className={classes.fixedStep}>
          <span role="img" aria-label="output">⬇️</span> Output Settings
        </div>
      </div>
    </div>
  )
}

export default BulkRightSidebar