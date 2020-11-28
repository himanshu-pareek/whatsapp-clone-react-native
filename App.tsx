import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

// AWS Amplify setup
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import config from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react-native';
import { getUser } from './graphql/queries';
import { createUser } from './graphql/mutations';
Amplify.configure(config);

const imageUriList = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/CatVibrissaeFullFace.JPG/1200px-CatVibrissaeFullFace.JPG',
  'https://images.wagwalkingweb.com/media/articles/cat/laparotomy/laparotomy.jpg',
  'https://www.hdwallpaper.nu/wp-content/uploads/2017/04/cat-11.jpg',
  'https://www.trbimg.com/img-5a68a878/turbine/ct-grumpy-cat-lawsuit-20180124',
  'https://www.journalism.co.uk/assets/33/stevencrostoncat_copy.jpg',
];

const getRandomImageUri = () => {
  return imageUriList[Math.floor(Math.random() * imageUriList.length)];
};

const App = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  useEffect(() => {
    const fetchUser = async () => {
      // Get the current authenticated user
      const userInfo = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });

      if (userInfo) {
        const userData = await API.graphql(
          graphqlOperation(
            getUser,
            {
              id: userInfo.attributes.sub,
            }
          )
        );

        if (userData.data.getUser) {
          console.log("User is already registered in database");
          return;
        }

        const newUser = {
          id: userInfo.attributes.sub,
          name: userInfo.username,
          imageUri: getRandomImageUri(),
          status: 'Hi there, I am using Whatsapp',
        };

        await API.graphql(
          graphqlOperation(
            createUser,
            {
              input: newUser,
            }
          )
        );

      }
    };

    fetchUser();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
};

export default withAuthenticator(App);
