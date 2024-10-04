import { ScrollView, StyleSheet, View } from 'react-native'

export function withPageWrapper(WrappedComponent: React.ComponentType) {
  return (props: any) => (
    <ScrollView>
      <View style={styles.container}>
        <WrappedComponent {...props} />
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    maxWidth: 800,
    width: '100%',
    alignSelf: 'center',
  },
})
