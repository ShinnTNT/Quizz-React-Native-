import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const Quiz = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState();
  const [options, setOptions] = useState([]);
  const [ques, setQues] = useState(0);
  const [score, setScore] = useState(0);

  const getQuestions = async () => {
    setIsLoading(true);
    const url =
      "https://opentdb.com/api.php?amount=10&type=multiple&encode=url3986";
    const response = await fetch(url);
    const data = await response.json();
    setQuestions(data.results);
    setOptions(generateOptionsAndShuffle(data.results[0]));
    setIsLoading(false);
  };

  const generateOptionsAndShuffle = (_question) => {
    const options = [..._question.incorrect_answers];
    options.push(_question.correct_answer);

    shuffleArray(options);

    return options;
  };

  const handleNext = () => {
    setQues((ques) => ques + 1);
    setOptions(generateOptionsAndShuffle(questions[ques + 1]));
  };

  const handlePrev = () => {
    if (ques > 0) {
      setOptions(generateOptionsAndShuffle(questions[ques - 1]));
      setQues((ques) => ques - 1);
    }
  };

  const handleSelectOption = (__option) => {
    if (__option === questions[ques].correct_answer) {
      setScore((score) => score + 10);
    }
    if (ques !== 9) {
      setQues((ques) => ques + 1);
      setOptions(generateOptionsAndShuffle(questions[ques + 1]));
    }
    if (ques === 9) {
      handleShowResult();
    }
  };

  const handleShowResult = () => {
    navigation.navigate("Result", {
      score,
    });
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Text style={{ fontSize: 32, fontWeight: "700" }}>LOADING...</Text>
        </View>
      ) : (
        questions && (
          <View style={styles.parent}>
            <View style={styles.top}>
              <Text style={styles.question}>
                Q. {decodeURIComponent(questions[ques].question)}
              </Text>
            </View>
            <View style={styles.options}>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => handleSelectOption(options[0])}
              >
                <Text style={styles.option}>
                  {decodeURIComponent(options[0])}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => handleSelectOption(options[1])}
              >
                <Text style={styles.option}>
                  {" "}
                  {decodeURIComponent(options[1])}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => handleSelectOption(options[2])}
              >
                <Text style={styles.option}>
                  {" "}
                  {decodeURIComponent(options[2])}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => handleSelectOption(options[3])}
              >
                <Text style={styles.option}>
                  {" "}
                  {decodeURIComponent(options[3])}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.bottom}>
              {ques > 0 && (
                <TouchableOpacity style={styles.button} onPress={handlePrev}>
                  <Text style={styles.buttonText}>PREV</Text>
                </TouchableOpacity>
              )}
              {ques !== 9 && (
                <TouchableOpacity style={styles.button} onPress={handleNext}>
                  <Text style={styles.buttonText}>NEXT</Text>
                </TouchableOpacity>
              )}
              {ques === 9 && (
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleShowResult}
                >
                  <Text style={styles.buttonText}>SHOW RESULTS</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )
      )}
    </View>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    height: "100%",
  },
  parent: {
    height: "100%",
  },
  top: {
    marginVertical: 16,
  },
  options: {
    marginVertical: 16,
    flex: 1,
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingVertical: 16,
  },
  button: {
    backgroundColor: "#1A759F",
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  question: {
    fontSize: 28,
    fontWeight: "500",
  },
  option: {
    fontSize: 18,
    fontWeight: "500",
    color: "white",
  },
  optionButton: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginVertical: 6,
    backgroundColor: "#34a0a4",
    borderRadius: 12,
  },
});
