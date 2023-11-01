import {
  Animated,
  Linking,
  Pressable,
  StyleSheet,
  View,
  Image,
} from "react-native";
import theme from "../theme";
import Text from "./Text";
import animateButton from "../utils/animateButton";

const numToFixedStr = (num) => {
  if (isNaN(+num)) return "0";
  return +num > 1000 ? (+num / 1000).toFixed(1) + "k" : `${num}`;
};

const styles = StyleSheet.create({
  parentContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    padding: 24,
  },
  container: {
    display: "flex",
    flexDirection: "row",
  },
  text: {
    color: "white",
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  flexItemAvator: {
    flexGrow: 0,
    borderRadius: 10,
  },

  flexItemInfo: {
    flexGrow: 1,
    marginLeft: 30,
  },
  itemMargin: {
    marginBottom: 10,
  },
  tagItem: {
    // marginBottom: 10,
    backgroundColor: theme.colors.primary,
    alignSelf: "flex-start",
    borderRadius: 10,
    padding: 6,
  },
  colors: {
    color: "white",
  },

  containerStats: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    // alignContent: "center",
    // marginBottom: 16,
    marginTop: 24,
  },
  statisticItem: {
    // marginHorizontal: 16,
    alignItems: "center",
  },
  button: {
    // marginBottom: 10,
    backgroundColor: theme.colors.primary,
    // alignSelf: "center",
    padding: 12,
    marginTop: 24,
    borderRadius: 10,
    alignItems: "center",
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
    marginTop: 6,
  },
});

const Avatar = ({ avatarUrl }) => {
  return (
    <Image
      style={[styles.tinyLogo, styles.flexItemAvator]}
      source={{ uri: avatarUrl }}
    />
  );
};

const InfoSection = ({ item }) => {
  return (
    <View style={styles.flexItemInfo}>
      <Text fontWeight="bold" style={styles.itemMargin}>
        {item.fullName}
      </Text>
      <Text color="textSecondary" style={styles.itemMargin}>
        {item.description}
      </Text>
      <View style={styles.tagItem}>
        <Text style={styles.colors}>{item.language}</Text>
      </View>
    </View>
  );
};

const StatisticSection = ({ item }) => {
  return (
    <View style={styles.containerStats}>
      <View style={styles.statisticItem}>
        <Text fontWeight="bold">{numToFixedStr(item.stargazersCount)}</Text>
        <Text style={styles.colorTextSecondary}>Stars</Text>
      </View>
      <View style={styles.statisticItem}>
        <Text fontWeight="bold">{numToFixedStr(item.forksCount)}</Text>
        <Text style={styles.colorTextSecondary}>Forks</Text>
      </View>
      <View style={styles.statisticItem}>
        <Text fontWeight="bold">{numToFixedStr(item.reviewCount)}</Text>
        <Text style={styles.colorTextSecondary}>Reviews</Text>
      </View>
      <View style={styles.statisticItem}>
        <Text fontWeight="bold"> {numToFixedStr(item.ratingAverage)}</Text>
        <Text style={styles.colorTextSecondary}>Rating</Text>
      </View>
    </View>
  );
};

const RepositoryItem = ({ item, button }) => {
  const { fadeIn, fadeOut, animated } = animateButton();

  return (
    <View testID="repositoryItem" style={styles.parentContainer}>
      <View style={styles.container}>
        <Avatar avatarUrl={item.ownerAvatarUrl} />
        <InfoSection item={item} />
      </View>
      <StatisticSection item={item} />
      {button && (
        <Pressable
          onPress={() => Linking.openURL(item.url)}
          onPressIn={fadeIn}
          onPressOut={fadeOut}
        >
          <Animated.View style={[styles.button, { opacity: animated }]}>
            <Text fontWeight="bold" style={styles.text}>
              Open in GitHub
            </Text>
          </Animated.View>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem;
