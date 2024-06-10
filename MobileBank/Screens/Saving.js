import { View,Text, StyleSheet } from "react-native";
export default function Saving(){
    return(
    <View style={styles.Container}>
<Text >No Saving Yet</Text>
    </View>
    )
}
const styles = StyleSheet.create({
Container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
}
})