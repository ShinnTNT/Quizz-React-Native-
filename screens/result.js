import { View, Text, Image, StyleSheet } from "react-native";

const Result = () => {
  return (
    <View>
      <View>
        <Text>Result</Text>
      </View>
      <View style={styles.bannerContainer}>
        <Image
          source={{
            uri: "https://cdni.iconscout.com/illustration/premium/thumb/men-celebrating-victory-4587301-3856211.png",
          }}
          style={styles.banner}
        />
      </View>
    </View>
  );
};

export default Result;

const styles = StyleSheet.create({
  banner: {
    width: 300,
    height: 300,
  },
  bannerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
