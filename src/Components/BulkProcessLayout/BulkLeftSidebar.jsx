import React from 'react'
import { PHOT_AI_TOOLS } from '../../common/enum'
import classes from './styles.module.css'
import { BATCH_PROCESS_TOOLS } from '../../common/utils'

const BulkLeftSidebar = ({ addStep }) => {
  return (
    <div className={classes.sidebar}>
      <h2 className={classes.title}>Available Tools</h2>
      <div className={classes.toolContainer}>
      {(BATCH_PROCESS_TOOLS).map((tool) => (
        <div
          key={tool}
          draggable
          onDragStart={e => e.dataTransfer.setData('text/plain', tool)}
          className={classes.toolItem}
          onClick={() => addStep(tool)}
        >
          {tool.isImage ? (
            <img src={tool.video} alt={tool.name} className={classes.toolImage} />
          ) : (
            <video src={tool.video} autoPlay muted loop className={classes.toolVideo} />
          )}
          <div className={classes.addButton}>
            +
          </div>
          <p>{tool.name}</p>
          </div>
      
      ))}
      </div>
    </div>
  )
}

export default BulkLeftSidebar