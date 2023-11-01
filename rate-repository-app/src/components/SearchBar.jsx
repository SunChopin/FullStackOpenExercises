import { debounce } from "lodash";
import { useCallback, useState } from "react";
import { View } from "react-native";
import { IconButton, MD3Colors, Searchbar } from "react-native-paper";
import theme from "../theme";

const SearchBar = ({ setSearchKeyword }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const setSearchKeywordDebouncer = useCallback(
    debounce(setSearchKeyword, 500),
    []
  );

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    setSearchKeywordDebouncer(query);
  };

  return (
    <View
      style={{
        flexGrow: 1,
      }}
    >
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        placeholderTextColor={theme.colors.textSecondary}
        clearIcon={() => (
          <IconButton
            icon="backspace-outline"
            size={16}
            iconColor={MD3Colors.secondary50}
          />
        )}
        icon={() => (
          <IconButton
            icon="magnify"
            size={16}
            iconColor={MD3Colors.secondary50}
          />
        )}
        onSubmitEditing={() => console.log("Search softkey pressed!")}
      />
    </View>
  );
};

export default SearchBar;
