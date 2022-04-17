import * as React from 'react';
import {useState, useEffect} from 'react';
import { Button, View, Text, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Video, AVPlaybackStatus } from 'expo-av';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { Accelerometer } from 'expo-sensors';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

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

// const BACKGROUND_FETCH_TASK = 'background-fetch';

// // 1. Define the task by providing a name and the function that should be executed
// // Note: This needs to be called in the global scope (e.g outside of your React components)
// TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
//   const now = Date.now();

//   console.log(`Got background fetch call at date: ${new Date(now).toISOString()}`);

//   // Be sure to return the successful result type!
//   return BackgroundFetch.BackgroundFetchResult.NewData;
// });

// // 2. Register the task at some point in your app by providing the same name, and some configuration options for how the background fetch should behave
// // Note: This does NOT need to be in the global scope and CAN be used in your React components!
// async function registerBackgroundFetchAsync() {
//   return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
//     minimumInterval: 1, // 15 minutes
//     stopOnTerminate: false, // android only,
//     startOnBoot: true, // android only
//   });
// }

// // 3. (Optional) Unregister tasks by specifying the task name
// // This will cancel any future background fetch calls that match the given name
// // Note: This does NOT need to be in the global scope and CAN be used in your React components!
// async function unregisterBackgroundFetchAsync() {
//   return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
// }

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
var lastNotifTimeStamp = Date.now();


function HomeScreen({ navigation }) {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = React.useRef();
  const responseListener = React.useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);


  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);

  const _slow = () => {
    Accelerometer.setUpdateInterval(1000);
  };

  const _fast = () => {
    Accelerometer.setUpdateInterval(16);
  };

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener(accelerometerData => {
        setData(accelerometerData);
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

 
  
  // console.log(lastNotifTimeStamp)
  const { x, y, z } = data;
  // console.log(y)
  if(y > 0 && y <  0.6){
    if((Date.now() - lastNotifTimeStamp)/1000 >= 5){
      schedulePushNotification();
      lastNotifTimeStamp = Date.now();
    }
    
  }

  return (
    <NativeBaseProvider>
    <VStack space={5} alignItems="center">
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <HStack justifyContent="space-between">
          <Box justifyContent="space-between">
            <VStack space="2">
              <ImageBackground source={logo2} style={{ width: 475, height:  930}}>
            <View >
              <Box p="2"_text={{
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

              <Box style={styles.title} alignItems="center" p="2" bg="blue.900" _text={{
              fontSize: "16",
              fontWeight: "medium",
              color: "blue.400",
              letterSpacing: "lg",
              
            }} shadow={2}>
                A Machine Learning Approach for Neck Relief
                <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} style={styles.button}>
          <Text>Notifs: {subscription ? 'On' : 'Off'}</Text>
        </TouchableOpacity>
     
      </View>
   
              </Box>
              

              <Image source={que} style={{ width: 175, height:  230, marginLeft:150, marginTop:150, marginBottom:100}} />


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

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Slouching!!!",
      body: 'Correct Your Posture',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}


function round(n) {
  if (!n) {
    return 0;
  }
  return Math.floor(n * 100) / 100;
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
              <Button size="lg" onPress={() => navigation.navigate("Exercise1")}
              title="Neck Tilt"
              />
                </Box>
          </View>
          <View style={{marginLeft:50}}>

                <Box alignItems="center">
              <Button size="lg" onPress={() => navigation.navigate("Exercise2")}
              title="Rotations"
              />
                </Box>
            </View>
              </View>

          <View style={styles2.container}>

            <Image source={lo} style={{ width: 175, height:  175, marginRight:20}} />

            <Image source={lo} style={{ width: 175, height:  175}} />

          </View>

          <View  style={styles2.container}>
          <View style={{marginRight:50, marginLeft:15}}>

          <Box alignItems="center">
              <Button size="lg" onPress={() => navigation.navigate("Exercise3")}
              title="Neck Turn"
              />
                </Box>
          </View>
          <View style={{marginLeft:35}}>

                <Box alignItems="center">
              <Button size="lg" onPress={() => navigation.navigate("Exercise4")}
              title="Neck Extension"
              />
                </Box>
            </View>
              </View>
 

          <View style={styles2.container}>

            <Image source={l} style={{ width: 175, height:  200, marginRight:20}} />

            <Image source={l} style={{ width: 175, height:  200}} />

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
// require('./assets/neck-tilt.mp4') 
function ExerciseScreen1({ navigation }) {
  const video = React.useRef(null);
  const [status2, setStatus2] = React.useState({});


  return (
<NativeBaseProvider>
      <Center
        _dark={{ bg: "blueGray.900" }}
        _light={{ bg: "blueGray.900" }}
        px={4}
        flex={1}
      >

           
              {/* <Image source={lo} style={{ width: 450, height:  600, marginRight:0, marginTop:20, marginBottom:20}} /> */}

              <View style={vidstyles.container}>
              <Video
                ref={video}
                style={vidstyles.video}
                source={require("./assets/neck-tilt.mp4")}
                useNativeControls
                resizeMode="contain"
                isLooping
                onPlaybackStatusUpdate={status2 => setStatus2(() => status2)}
              />
              <View style={vidstyles.buttons}>
                <Button
                  title={status2.isPlaying ? 'Pause' : 'Play'}
                  onPress={() =>
                    status2.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                  }
                />
              </View>

             
            </View>

        <VStack space={5} alignItems="center">
  
        </VStack>
      </Center>
    </NativeBaseProvider>
    );
  }

  function ExerciseScreen2({ navigation }) {
    const video = React.useRef(null);
    const [status2, setStatus2] = React.useState({});
  
    return (
  <NativeBaseProvider>
        <Center
          _dark={{ bg: "blueGray.900" }}
          _light={{ bg: "blueGray.900" }}
          px={4}
          flex={1}
        >

                {/* <Image source={lo} style={{ width: 450, height:  600, marginRight:0, marginTop:20, marginBottom:20}} /> */}
  
  
                <View style={vidstyles.container}>
                <Video
                  ref={video}
                  style={vidstyles.video}
                  source={require("./assets/rolls.mp4")}
                  useNativeControls
                  resizeMode="contain"
                  isLooping
                  onPlaybackStatusUpdate={status2 => setStatus2(() => status2)}
                />
                <View style={vidstyles.buttons}>
                  <Button
                    title={status2.isPlaying ? 'Pause' : 'Play'}
                    onPress={() =>
                      status2.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                    }
                  />
                </View>
  
               
              </View>
  
          <VStack space={5} alignItems="center">
    
          </VStack>
        </Center>
      </NativeBaseProvider>
      );
    }

    
    function ExerciseScreen3({ navigation }) {
      const video = React.useRef(null);
      const [status2, setStatus2] = React.useState({});
    
      return (
    <NativeBaseProvider>
          <Center
            _dark={{ bg: "blueGray.900" }}
            _light={{ bg: "blueGray.900" }}
            px={4}
            flex={1}
          >
    
                
                   
         
                  {/* <Image source={lo} style={{ width: 450, height:  600, marginRight:0, marginTop:20, marginBottom:20}} /> */}
    
    
                  <View style={vidstyles.container}>
                  <Video
                    ref={video}
                    style={vidstyles.video}
                    source={require("./assets/neck-twists.mp4")}
                    useNativeControls
                    resizeMode="contain"
                    isLooping
                    onPlaybackStatusUpdate={status2 => setStatus2(() => status2)}
                  />
                  <View style={vidstyles.buttons}>
                    <Button
                      title={status2.isPlaying ? 'Pause' : 'Play'}
                      onPress={() =>
                        status2.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                      }
                    />
                  </View>
    
                 
                </View>
    
            <VStack space={5} alignItems="center">
      
            </VStack>
          </Center>
        </NativeBaseProvider>
        );
      }

      
      function ExerciseScreen4({ navigation }) {
        const video = React.useRef(null);
        const [status2, setStatus2] = React.useState({});
      
        return (
      <NativeBaseProvider>
            <Center
              _dark={{ bg: "blueGray.900" }}
              _light={{ bg: "blueGray.900" }}
              px={4}
              flex={1}
            >
      
                 
                
                    {/* <Image source={lo} style={{ width: 450, height:  600, marginRight:0, marginTop:20, marginBottom:20}} /> */}
      
      
                    <View style={vidstyles.container}>
                    <Video
                      ref={video}
                      style={vidstyles.video}
                      source={require("./assets/nods.mp4")}
                      useNativeControls
                      resizeMode="contain"
                      isLooping
                      onPlaybackStatusUpdate={status2 => setStatus2(() => status2)}
                    />
                    <View style={vidstyles.buttons}>
                      <Button
                        title={status2.isPlaying ? 'Pause' : 'Play'}
                        onPress={() =>
                          status2.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                        }
                      />
                    </View>
      
                   
                  </View>
      
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
              <Box p="2"  _text={{
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

              <Box style={styles.title} p="8" marginBottom = "0" bg="blue.900" _text={{
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
        <Stack.Screen name="Exercise1" component={ExerciseScreen1} />
        <Stack.Screen name="Exercise2" component={ExerciseScreen2} />
        <Stack.Screen name="Exercise3" component={ExerciseScreen3} />
        <Stack.Screen name="Exercise4" component={ExerciseScreen4} />
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


const camstyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});


const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "row",
    marginLeft: 0,
  },
});

const styles3 = StyleSheet.create({
  container: {
    flex: 1,
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
    // backgroundColor: "#ffffff",
  },
  rowContainer: {
    flexDirection: 'row'
  }
});

const vidstyles = StyleSheet.create({
  container: {
    marginTop: 400,
    height: 100,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  video: {
    alignSelf: 'center',
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const sstyles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textContainer: {
    margin: 10,
    fontSize: 10
  },
  boldText: {
    fontWeight: 'bold',
  },
});
