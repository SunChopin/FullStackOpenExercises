import { FlatList, View, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { repositoriesQueryVariables } from "../utils";
import OrderMenu from "./OrderMenu";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export const RepositoryListContainer = ({
  repositories,
  setSearchKeyword,
  setQueryVariables,
  renderItem,
  onEndReach,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <View style={{ flexDirection: "row", margin: 8, alignItems: "center" }}>
          <SearchBar setSearchKeyword={setSearchKeyword} />
          <OrderMenu setQueryVariables={setQueryVariables} />
        </View>
      }
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      // other props
    />
  );
};

export const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [queryVariables, setQueryVariables] = useState(
    repositoriesQueryVariables.latest
  );

  const { repositories, fetchMore } = useRepositories({
    ...queryVariables,
    searchKeyword,
  });

  const onEndReach = () => {
    fetchMore();
    console.log("You have reached the end of the list");
  };

  const navigate = useNavigate();

  const renderItem = ({ item }) => (
    <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
      <RepositoryItem item={item} />
    </Pressable>
  );

  return (
    <RepositoryListContainer
      repositories={repositories}
      setSearchKeyword={setSearchKeyword}
      setQueryVariables={setQueryVariables}
      onEndReach={onEndReach}
      renderItem={renderItem}
    />
  );
};

export default RepositoryList;
