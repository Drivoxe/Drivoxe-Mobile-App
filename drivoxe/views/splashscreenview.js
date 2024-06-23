import {StyleSheet , View} from 'react-native'
import { Icon, colors } from 'react-native-elements'

export default function splashscreenview() {
  return (
    <View style={styles.container}>
        <View> 
            <Image source={Icon} style={styles.image}/>
        </View>
    </View>
  
  )
}
const styles = StyleSheet.create({
    container: {
        flex:1 ,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.black
    },
    image: {
        width: 100, 
        height: 100,
        resizeMode: "cover"
    }

})
