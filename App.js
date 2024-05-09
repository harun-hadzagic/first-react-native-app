import { useState } from "react";
import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const addGoalHandler = (enteredGoalText) => {
    setCourseGoals((currentCoursGoals) => [
      ...currentCoursGoals,
      { text: enteredGoalText, id: Date.now().toString() },
    ]);
  };

  const deleteGoalHandler = (id) => {
    setCourseGoals((currentCoursGoals) => {
      return currentCoursGoals.filter((goal) => goal.id !== id);
    });
  };

  const startAddGoalHandler = () =>{
    setModalIsVisible(true)
  }
  return (
    <>
    <StatusBar style="light"/>
    <View style={styles.appContainer}>
      <Button title="Add New Goal" color='#a065ec' onPress={startAddGoalHandler}/>
      <GoalInput onAddGoal={addGoalHandler} modalIsVisible={modalIsVisible} setModalIsVisible={setModalIsVisible}/>
      <View style={styles.goalsContainer}>
        <FlatList
          data={courseGoals}
          renderItem={(itemData) => {
            return (
              <GoalItem itemData={itemData} onDeleteItem={deleteGoalHandler} />
            );
          }}
          keyExtractor={(item, _) => {
            return item.id;
          }}
        />
      </View>
    </View>
    </>

  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 5,
  },
});
