import React, { useState, useEffect, useCallback } from 'react';
import {
  Button,
  Center,
  Box,
  VStack,
  HStack,
  Text,
  Input,
  KeyboardAvoidingView,
  Divider,
  Link,
  Icon,
  IconButton,
  useToast,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamsList } from 'src/types/navigation';
import { login } from 'src/clients/firebase/auth';

type NavigationProp = {
  navigation: NativeStackNavigationProp<StackParamsList, 'SignUp'>;
};

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp['navigation']>();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleIsVisible = useCallback(() => setIsVisible(prev => !prev), []);

  const showSuccessToast = useCallback(() => {
    toast.show({
      title: 'Succeeded to Login!',
      status: 'success',
      placement: 'top',
    });
  }, [toast]);

  const showErrorToast = useCallback(() => {
    toast.show({
      title: 'Failed to login',
      status: 'error',
      description: 'Enter a valid email and password.',
      placement: 'top',
    });
  }, [toast]);

  const handlePressLoginButton = useCallback(() => {
    setIsLoading(true);
    login(email, password)
      .then(showSuccessToast)
      .catch(showErrorToast)
      .finally(() => {
        setIsLoading(false);
      });
  }, [email, password, showSuccessToast, showErrorToast]);

  const handlePressSingUpText = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, []);

  return (
    <>
      <Box safeAreaTop bg="indigo.600" />
      <Box flex={1} my="auto" bg="indigo.600">
        <Box flex={1} justifyContent="center">
          <VStack space={2} px="3">
            <Text fontSize="3xl" fontWeight="bold" color="indigo.50">
              Welcome back!
            </Text>
            <Text fontSize="md" color="indigo.50">
              Login to continue
            </Text>
          </VStack>
        </Box>
        <Box flex={3} bg="white" borderTopRadius="xl">
          <VStack flex={1} my="auto" space={5}>
            <KeyboardAvoidingView>
              <VStack justifyContent="space-between" space={5} m={9}>
                <Input
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email"
                  isDisabled={isLoading}
                  fontSize="md"
                />
                <Input
                  type={isVisible ? 'text' : 'password'}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Password"
                  isDisabled={isLoading}
                  fontSize="md"
                  InputRightElement={
                    <IconButton
                      icon={
                        <Icon
                          as={MaterialIcons}
                          name={isVisible ? 'visibility' : 'visibility-off'}
                          size={5}
                          color="muted.400"
                        />
                      }
                      onPress={toggleIsVisible}
                    />
                  }
                />
                <Button
                  onPress={handlePressLoginButton}
                  colorScheme="indigo"
                  isLoading={isLoading}
                >
                  LOGIN
                </Button>
              </VStack>
            </KeyboardAvoidingView>
            <HStack alignItems="center" justifyContent="center" space={2}>
              <Divider w="40%" />
              <Text color="coolGray.300">or</Text>
              <Divider w="40%" />
            </HStack>
            <Center>
              <Link
                _text={{
                  color: 'indigo.900',
                  textDecoration: 'none',
                  fontSize: 'md',
                }}
                onPress={handlePressSingUpText}
              >
                Sign up
              </Link>
            </Center>
          </VStack>
        </Box>
      </Box>
    </>
  );
};

export default LoginScreen;
