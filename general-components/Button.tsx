import { PropsWithChildren } from 'react'
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native'
import { presetColors } from '../styles/colours'
type Props = PressableProps &
  PropsWithChildren & {
    text: string
    style?: StyleProp<ViewStyle>
  }
export function Button_C(props: Props) {
  const { text, children, style, ...rest } = props
  return (
    <Pressable
      style={({ pressed }) => {
        console.log('Pressed state:', pressed, styles.pressed.backgroundColor)
        return [styles.button, pressed && styles.pressed]
      }}
      {...rest}
    >
      <Text selectable={false}>{text ?? children}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 2,
    alignSelf: 'center',
    backgroundColor: presetColors.button.base,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderWidth: 1,
  },
  pressed: {
    backgroundColor: presetColors.button.pressed,
  },
})
