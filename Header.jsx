import { StyleSheet, Text, View, Image } from "react-native";

const Header = () => (
  <View style={styles.header}>
    <View style={styles.left}>
      <Image
        style={styles.settings}
        source={require("./assets/settings.png")}
      />
    </View>
    <View style={styles.center}>
      <Text style={styles.title}>now</Text>
    </View>
    <View style={styles.right}>
      <View style={styles.badge}>
        <Text style={styles.badgeNumber}>2</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  header: {
    height: 80,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  left: {
    justifyContent: "center",
    marginLeft: 21,
  },
  center: {
    justifyContent: "center",
  },
  right: {
    justifyContent: "center",
    marginRight: 21,
  },
  settings: {
    height: 38,
    width: 38,
  },
  title: {
    fontSize: 50,
    fontWeight: "700",
    color: "#FE3C72",
  },
  badge: {
    height: 38,
    width: 38,
    backgroundColor: "#FE3C72",
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeNumber: {
    fontSize: 18,
    color: "white",
    fontWeight: "700",
  },
});

export default Header;
