import { StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import Cell from './Cell'

const HorizontalPath = ({cells,color}) => {

    const groupedCells = useMemo(() => {
        const groups = []
        for (let i = 0; i < cells.length; i += 6) {
            groups.push(cells.slice(i, i + 6))
        }
        return groups
    },[cells])
  return (
    <View style={styles.metrix}>
      <View style={styles.column}>
        {groupedCells.map((group,groupIndex) => (
            <View
            key={`group-${groupIndex}`}
            style={{flexDirection:'row',width:'16.7%',height:'33.7%'}}>
            {group.map(id=>(
                <Cell key={`cell-${id}`} cell={true} id={id} color={color}/>
            ))}
            </View>
        ))}
      </View>
    </View>
  )
}

export default HorizontalPath

const styles = StyleSheet.create({
    metrix : {
        flexDirection : 'row',
        // justifyContent : 'center',
        alignItems : 'center',
        width : '40%',
        height : '100%'
    },
    column : {
        flexDirection :'column',
        width : '100%',
        height : '100%'
    }
})