import * as React from 'react';
import { Button, View, Text, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';

import {
  Link,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  TextInput,
  VStack,
  Box,
  
} from "native-base";
import { Platform } from "react-native";

import { Image,  StyleSheet, ImageBackground } from 'react-native';
import logo from './assets/logo2.png';
import logo2 from './assets/logo5.png';
import log from './assets/logo.png';
import lo from './assets/logo-removebg-preview.png';
import l from './assets/Screen_Shot_2022-04-17_at_3.28.34_AM-removebg-preview.png';
import que from './assets/Screen_Shot_2022-04-17_at_3.39.26_AM-removebg-preview.png';

const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
  dependencies: {
    "linear-gradient": LinearGradient
  }
};

// extend the theme
export const theme = extendTheme({ config });

function HomeScreen({ navigation }) {
  return (
    <NativeBaseProvider>
    <VStack space={5} alignItems="center">
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <HStack justifyContent="space-between">
          <Box justifyContent="space-between">
            <VStack space="2">
              <ImageBackground source={logo2} style={{ width: 475, height:  930}}>
            <View >
              <Box p="2" bg="" _text={{
              fontSize: "65",
              fontWeight: "medium",
              color: "blue.900",
              letterSpacing: "lg",
              marginLeft: "60",
              marginTop: "50"
            }} shadow={2}>
                POSTERITY
              </Box>
              
              </View>

              <Box style={styles.title} p="2" bg="blue.1000" _text={{
              fontSize: "20",
              fontWeight: "medium",
              color: "blue.400",
              letterSpacing: "lg",
            }} shadow={2}>
                A Machine Learning Approach to Neck Relief
              </Box>
              

              <Image source={que} style={{ width: 175, height:  230, marginLeft:150, marginTop:150, marginBottom:200}} />


              <Box alignItems="center">
              <Button   color="#000080" size="lg" onPress={() => navigation.navigate("About")}
              title="Continue"
              />
                </Box>


              </ImageBackground>
            </VStack>
          </Box>
        </HStack>
    </View>
    </VStack>
    </NativeBaseProvider>

  );
}

function DetailsScreen({ navigation }) {
  return (
<NativeBaseProvider>
      <Center
        _dark={{ bg: "blueGray.900" }}
        _light={{ bg: "blueGray.900" }}
        px={4}
        flex={1}
      >

        <VStack space={5} alignItems="center">
          <View style={styles.container}>
          <View style={{marginRight:50}}>

          <Box alignItems="center">
              <Button size="lg" onPress={() => navigation.navigate("Exercise")}
              title="Neck Tilt"
              />
                </Box>
          </View>
          <View style={{marginLeft:50}}>

                <Box alignItems="center">
              <Button size="lg" onPress={() => navigation.navigate("Exercise")}
              title="Rotations"
              />
                </Box>
            </View>
              </View>

          <View style={styles2.container}>

            <Image source={lo} style={{ width: 175, height:  175, marginRight:20}} />

            <Image source={lo} style={{ width: 175, height:  175}} />

          </View>

          <View style = {{marginLeft:15}} style={styles2.container}>
          <View style={{marginRight:50}}>

          <Box alignItems="center">
              <Button size="lg" onPress={() => navigation.navigate("Exercise")}
              title="Neck Turn"
              />
                </Box>
          </View>
          <View style={{marginLeft:35}}>

                <Box alignItems="center">
              <Button size="lg" onPress={() => navigation.navigate("Exercise")}
              title="Neck Extension"
              />
                </Box>
            </View>
              </View>
 

          <View style={styles2.container}>

            <Image source={l} style={{ width: 175, height:  200, marginRight:20}} />

            <Image source={l} style={{ width: 175, height:  200}} />

          </View>

          <View style={styles.container}>

          <View style={{}}>

                <Box alignItems="center">
              <Button size="lg" onPress={() => navigation.navigate("Exercise")}
              title="Side-Side Neck Tilt"
              />
                </Box>
            </View>

              </View>

              <View style={styles3.container}>

          <Image source={l} style={{ width: 175, height:  200, marginRight:10}} />

          </View>

              <View>

              </View>
              <View>
                
                </View>
        </VStack>
      </Center>
    </NativeBaseProvider>
  );
}

function ExerciseScreen({ navigation }) {
  return (
<NativeBaseProvider>
      <Center
        _dark={{ bg: "blueGray.900" }}
        _light={{ bg: "blueGray.900" }}
        px={4}
        flex={1}
      >

            <Box style={styles.title} p="4" bg="blue.900" _text={{
              fontSize: "20",
              fontWeight: "medium",
              color: "white",
              letterSpacing: "lg",
              marginLeft: 0,
            }} shadow={2}>
                Let's Get Started.
              </Box>
              <Image source={lo} style={{ width: 450, height:  600, marginRight:0, marginTop:20, marginBottom:20}} />

              

        <VStack space={5} alignItems="center">
  
        </VStack>
      </Center>
    </NativeBaseProvider>
    );
  }

function AboutScreen({ navigation }) {
  return (
    <NativeBaseProvider>
    <VStack space={5} alignItems="center">
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <HStack justifyContent="space-between">
          <Box justifyContent="space-between">
            <VStack space="2">
              <ImageBackground source={logo2} style={{ width: 475, height:  930}}>
            <View >
              <Box p="2" bg="" _text={{
              fontSize: "50",
              fontWeight: "medium",
              color: "blue.900",
              letterSpacing: "lg",
              marginLeft: "60",
              marginTop: "50"
            }} shadow={2}>
                About Posterity
              </Box>
              
              </View>

              <Box style={styles.title} p="8" marginBottom = "20" bg="blue.1000" _text={{
              fontSize: "20",
              fontWeight: "medium",
              color: "blue.400",
              letterSpacing: "lg",
            }} shadow={2}>
                After seeing their fellow classmates and experiencing neck pain themselves, a group of four TJ students build Posterity, an application designed for adults, teenagers, and even children.
                It uses Machine Learning to predict the neck movements of individuals
                and creates guided therapy lessons simultaneously. There are a variety of features
                as well including notifications which alert you when your neck position is poor.
                The goal is help people prevent harm to their body from poor posture and improve the lives of our posterity with this revolutionary application.
                
              </Box>
              
              <Box alignItems="center">
              <Button   color="#000080" size="lg" onPress={() => navigation.navigate("Details")}
              title="Begin your journey"
              />
                </Box>


              </ImageBackground>
            </VStack>
          </Box>
        </HStack>
    </View>
    </VStack>
    </NativeBaseProvider>

  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Exercise" component={ExerciseScreen} />
        <Stack.Screen name="About" component={AboutScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack space={2} alignItems="center">
      <Text>Light</Text>
      <Switch
        isChecked={colorMode === "dark"}
        onToggle={toggleColorMode}
        aria-label={
          colorMode === "dark" ? "switch to light mode" : "switch to dark mode"
        }
      />
      <Text>Dark</Text>
    </HStack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "row",
    marginRight: 0
    },
    title: {
      textAlign: 'center',
      marginVertical: 0,
      marginLeft:0,
    },
});

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "row",
    marginLeft: 0,
  },
});

const styles3 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "row",
    marginBottom: 35,
  },
});

const styles4 = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',

  },
});

const containerStyle = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: "#ffffff",
  },
  rowContainer: {
    flexDirection: 'row'
  }
});
