import { StyleSheet, View } from "react-native";
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import { Navigate, Route, Routes } from "react-router-native";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import SingleRepository from "./SingleRepository";
import UserReviews from "./UserReviews";
import CreateReview from "./CreateReview";
const styles = StyleSheet.create({
  flexContainer: {
    display: "flex",
    backgroundColor: "#e1e4e8",
  },
  //   flexItemA: {
  //     flexGrow: 0,
  //   },
  //   flexItemB: {
  //     flexGrow: 1,
  //   },
});

const Main = () => {
  return (
    <View style={styles.flexContainer}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/signin" element={<SignIn />} exact />
        <Route path="/signup" element={<SignUp />} exact />
        <Route
          path="/repository/:repoId"
          element={<SingleRepository />}
          exact
        />
        <Route path="/create/review" element={<CreateReview />} exact />
        <Route path="/user/reviews" element={<UserReviews />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />{" "}
      </Routes>
    </View>
  );
};

export default Main;
