import React, { useState, useEffect } from 'react'
import { Button, Checkbox, List, Typography } from 'antd'

const ListFilterer = ({ level, data, change }) => {
  const [selected, setSelected] = useState({})

  useEffect(() => {
    selectAllClicked()
  }, [])

  const buttonStyle = {
    margin: 4
  }


  const changeCheck = (e, value) => {
    setSelected(prevSel => ({ ...prevSel, [value]: e.target.checked }))
    change(e.target.checked,value,level)
  }
  const selectAllClicked = () => {
    const sel = {}
    data.forEach(element => {
      sel[element] = true
    })
    setSelected(sel)
    change(true,null,level)
  }
  const deselectAllClicked = () => {
    setSelected({})
    change(false,null,level)
  }

  return (
    <List
      header={<div>Level {level + 1} {"(Total: " + Object.keys(selected).length + ", Selected: " + Object.values(selected).filter(value => value === true).length + ')'}</div>}
      footer={<div><Button style={buttonStyle} onClick={selectAllClicked}>Select All</Button><Button style={buttonStyle} onClick={deselectAllClicked}>Deselect All</Button></div>}
      bordered
      style={{ margin: 5 }}
      className='filtLevels'
    >

      {data.map(item => {
        return (<List.Item>
          <Checkbox checked={selected[item]} onChange={e => { return changeCheck(e, item) }}>{item}</Checkbox>
        </List.Item>)
      })}
    </List>
  )
}

export default ListFilterer