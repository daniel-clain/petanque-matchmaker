import { ReactNode, useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

type Props = {
  children: ReactNode
  expanded: boolean
  title: string
  onExpanded: () => void
}
export function ExpandCollapseContainer(props: Props) {
  const [expanded, setExpanded] = useState(props.expanded)
  useEffect(() => {
    setExpanded(props.expanded)
  }, [props.expanded])
  return (
    <View>
      <Pressable
        onPress={() =>
          setExpanded((prev) => {
            const newExpanded = !prev
            if (newExpanded == true) props.onExpanded()
            return newExpanded
          })
        }
        style={[
          styles.pressableHeader,
          {
            backgroundColor: expanded ? '#9bcded' : '#9bcded',
          },
        ]}
      >
        <Text>{props.title}</Text>
      </Pressable>
      <View
        style={{
          overflow: 'hidden',
          height: expanded ? 'auto' : 0,
        }}
      >
        <View style={[styles.mainContainer]}>{props.children}</View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
    borderWidth: 1,
    borderBlockColor: 'black',
    alignItems: 'flex-start',
  },
  pressableHeader: {
    padding: 10,
  },
})
