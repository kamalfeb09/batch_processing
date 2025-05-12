import React from 'react'
import { PHOT_AI_TOOLS } from '../../common/enum'
import classes from './styles.module.css'

const BulkLeftSidebar = ({ addStep }) => {
  return (
    <div className={classes.sidebar}>
      <h2 className={classes.title}>Available Tools</h2>
      {Object.values(PHOT_AI_TOOLS).map((tool) => (
        <div
          key={tool}
          draggable
          onDragStart={e => e.dataTransfer.setData('text/plain', tool)}
          className={classes.toolItem}
          onClick={() => addStep(tool)}
        >
          {tool.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
        </div>
      ))}
    </div>
  )
}

export default BulkLeftSidebar