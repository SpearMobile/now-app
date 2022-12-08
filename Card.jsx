import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from "react-native";
import { useState } from "react";

const ACTION_OFFSET = 100;

const Card = ({ name, photos, swipe, tiltSign, isFirst, ...rest }) => {
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const handlePhoto = () => {
    const next = (index + 1) % photos.length;
    setIndex(next);
    setLoading(true);
  };

  const rotate = Animated.multiply(swipe.x, tiltSign).interpolate({
    inputRange: [-ACTION_OFFSET, 0, ACTION_OFFSET],
    outputRange: ["8deg", "0deg", "-8deg"],
  });

  const animatedCardStyle = {
    transform: [...swipe.getTranslateTransform(), { rotate }],
  };

  return (
    // <TouchableOpacity style={styles.container} onPress={handlePhoto}>
    <Animated.View
      {...rest}
      style={[styles.container, isFirst && animatedCardStyle]}
    >
      <TouchableOpacity onPress={handlePhoto}>
        <ActivityIndicator style={styles.loader} size="large" color="#00ff00" />
        <Image
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 20,
            opacity: loading ? 0 : 1,
          }}
          // source={source}
          source={{
            uri: photos[index],
          }}
          onLoadEnd={() => setLoading(false)}
        />
        <View style={styles.stories}>
          <View
            style={{ ...styles.story, opacity: index === 0 ? 1 : 0.5 }}
          ></View>
          <View
            style={{ ...styles.story, opacity: index === 1 ? 1 : 0.5 }}
          ></View>
          <View
            style={{ ...styles.story, opacity: index === 2 ? 1 : 0.5 }}
          ></View>
          <View
            style={{ ...styles.story, opacity: index === 3 ? 1 : 0.5 }}
          ></View>
        </View>
        <View style={styles.panel}>
          <Text style={styles.name}>{name}, 21</Text>
          {/* <Text style={styles.location}>
          {user.city}, {user.country}
        </Text> */}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 20,
    top: 75,
    height: 437,
    width: 338,
    backgroundColor: "white",
  },
  loader: {
    position: "absolute",
    transform: [{ translateX: 150 }, { translateY: 175 }],
  },
  stories: {
    position: "absolute",
    top: 15,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  story: {
    height: 6,
    width: 60,
    backgroundColor: "white",
    borderRadius: 3,
    opacity: 0.5,
  },
  photo: {
    flex: 1,
    position: "absolute",
    backgroundColor: "green",
  },
  panel: {
    height: 93,
    width: "100%",
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 15,
  },
  name: {
    fontWeight: "900",
    fontSize: 32,
  },
  location: {
    fontWeight: "900",
    fontSize: 17,
    color: "#666666",
  },
});

export default Card;
