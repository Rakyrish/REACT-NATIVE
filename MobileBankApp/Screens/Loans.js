import { View,Text, StyleSheet,StatusBar } from "react-native";
export default function Loan(){
    return(
    <View style={styles.Container}>
<Text >Not Eligible For Loan, kindly purpose to save</Text>
    </View>
    )
}
const styles = StyleSheet.create({
Container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: StatusBar.currentHeight,
    backgroundColor: '#fff'
}
})