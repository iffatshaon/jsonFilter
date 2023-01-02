import React, { useState, useEffect } from 'react'
import iso from '../Utils/isoCountry.json'
import { Button, Checkbox, List, Typography, Row, Col } from 'antd'
import ListFilterer from '../Components/Filterer/ListFilterer'
import '../Styles/Filterer.css'

const Filterer = () => {
  const [levelData, setLevelData] = useState([])
  const [selected, setSelected] = useState([])
  let dict = []
  useEffect(() => {
    if (dict.length < 1) {
      let parent = ""
      let level = 0
      let data = { ...iso }
      createlevel(data, level, parent)
      setLevelData(dict)
    }
  }, [])

  const changedData = (work, item, level) => {
    if (item === null) {
      if (work) {
        setLevelData(prevData => ({ ...prevData, [level]: dict[level] }))
      }
      else {
        setLevelData(prevData => ({ ...prevData, [level]: {} }))
      }
    }
    else{

    }
  }

  const removeOnParent = ()=>{
    
  }

  const createlevel = (data, level, parent) => {
    if (data !== null) {
      if (data.constructor == Object) {
        Object.keys(data).forEach(elem => {
          // console.log(first)
          try {
            if (elem in dict[level]) {
              try {
                dict[level][elem].push(parent)
              }
              catch {
                dict[level][elem] = [dict[level][elem]]
                dict[level][elem].push(parent)
              }
            }
            else {
              dict[level] = { ...dict[level], [elem]: parent }
            }
          }
          catch {
            dict[level] = { ...dict[level], [elem]: parent }
          }
          createlevel(data[elem], level + 1, elem)
        })
      }
    }
  }
  const showLists = () => {
    const lists = []
    for (let i = 0; i < levelData.length; i++) {
      lists.push(<ListFilterer level={i} change={changedData} data={Object.keys(levelData[i])} />)
    }
    return lists
  }

  return (
    <div>
      <Row style={{ padding: 10 }}>
        {
          showLists().map(elem => {
            return <Col span={6}>{elem}</Col>
          })
        }
      </Row>
    </div>
  )
}

export default Filterer