import { StyleSheet, View, Image, TouchableOpacity } from "react-native";

const Bottom = ({ handleChoice }) => {
  return (
    <View style={styles.bottom}>
      <View style={styles.left}>
        <TouchableOpacity activeOpacity={0.5} onPress={() => handleChoice(-1)}>
          <Image style={styles.button} source={require("./assets/trash.png")} />
        </TouchableOpacity>
      </View>
      <View style={styles.right}>
        <TouchableOpacity activeOpacity={0.5} onPress={() => handleChoice(1)}>
          <Image style={styles.button} source={require("./assets/valid.png")} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottom: {
    height: 150,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  left: {
    justifyContent: "center",
    marginLeft: 21,
  },
  right: {
    justifyContent: "center",
    marginRight: 21,
  },
  button: {
    height: 110,
    width: 110,
  },
});

export default Bottom;
