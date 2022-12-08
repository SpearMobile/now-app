import { StatusBar } from "expo-status-bar";
import {
  Fragment,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import Body from "./Body";
import Header from "./Header";

export default function App() {
  return (
    <View>
      <SafeAreaView>
        <View
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Header />
          <Body />
        </View>
      </SafeAreaView>
    </View>
  );
}
