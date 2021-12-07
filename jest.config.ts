import { Config } from '@jest/types';

const unTranspiledModulePatterns = [
  '(jest-)?react-native',
  '@react-native-community',
  'expo(nent)?',
  '@expo(nent)?/.*',
  'react-navigation',
  '@react-navigation/.*',
  '@unimodules/.*',
  'unimodules',
  'sentry-expo',
  'native-base',
  'react-native-svg',
  '@react-native/.*',
  'react-native/.*',
];

const config: Config.InitialOptions = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    `node_modules/(?!${unTranspiledModulePatterns.join('|')})`,
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};

export default config;
