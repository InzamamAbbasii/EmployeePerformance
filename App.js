import * as React from 'react';
import { Text, Button, View, DrawerLayoutAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import FirstScreen from './Screens/FirstScreen';
import AdminScreen from './Screens/AdminScreen';
import Login from './Screens/Login';
import SignUp from './Screens/SignUp';
import EvaluatedTeacher from './Screens/EvaluatedTeacher';
import AdminDashboard from './Screens/AdminDashboard';
import Question from './Screens/Question';
import Questionnaire from './Screens/Questionnaire';
import Settings from './Screens/Settings';
import Category from './Screens/Category';
import Kpi from './Screens/Kpi';
import Mcqs from './Screens/Mcqs';
import Student from './Screens/Student';
import TeacherDetails from './Screens/TeacherDetails';
import DirectorDashboard from './Screens/DirectorDashboard';
import StudentCourses from './Screens/StudentCourses';
import Evaluation from './Screens/Evaluation';
import TeacherCourses from './Screens/TeacherCourses';
import TeacherEvaluationResult from './Screens/TeacherEvaluationResult';
import TeacherDashBoard from './Screens/TeacherDashBoard';
import TeacherPerformace_Director from './Screens/TeacherPerformace_Director';
import ChooseEvaluationType from './Screens/ChooseEvaluationType';
import TeachersList from './Screens/TeachersList';
import AcademicQuestions from './Screens/AcademicQuestions';
import AdministrativeQuestions from './Screens/AdministrativeQuestions';
import ChooseEvaluationType_Director from './Screens/ChooseEvaluationType_Director';
import TeachersList_Director from './Screens/TeacherList_Director';
import AdministrationEvaluation_Director from './Screens/AdministrationEvaluation_Director';
import ProjectEvaluation_Director from './Screens/ProjectEvaluation_Director';
const Stack = createNativeStackNavigator();
function App() {  //navigation between screens
  global.ip = '192.168.1.102';
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='FirstScreen' component={FirstScreen} />
        <Stack.Screen name="Login" component={Login}
          options={{
            headerShown: false,
            title: 'HOME',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#FFA07A',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
        <Stack.Screen name="SignUp" component={SignUp}
          options={{
            headerShown: false,
            title: 'SIGN UP',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#FFA07A',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }
          }
        />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard}
          options={{
            title: 'Admin Dashboard',
            headerTitleAlign: 'start',
            headerStyle: {
              backgroundColor: '#5252ff',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
        <Stack.Screen name="AdminScreen" component={AdminScreen}
          options={{
            title: 'Evaluation',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#ffc252',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }
          }
        />

        <Stack.Screen name="Question" component={Question}
          options={{
            title: 'Questions',
            headerTitleAlign: 'left',
            headerStyle: {
              backgroundColor: '#BCC6CC',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
        <Stack.Screen name="Questionnaire" component={Questionnaire}
          options={{
            headerShown: true,
            title: 'All Questions',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: 'red',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
        <Stack.Screen name="Settings" component={Settings}
          options={{
            title: 'Settings',
            headerTitleAlign: 'start',
            headerStyle: {
              backgroundColor: 'red',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
        <Stack.Screen name="Category" component={Category}
          options={{
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#FFA07A',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
        <Stack.Screen name="Kpi" component={Kpi}
          options={{
            title: 'KPI Weightage',
            headerTitleAlign: 'start',
            headerStyle: {
              backgroundColor: '#BCC6CC',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }
          }
        />
        <Stack.Screen name="Mcqs" component={Mcqs}
          options={{
            title: 'Mcqs Weightage',
            headerTitleAlign: 'start',
            headerStyle: {
              backgroundColor: '#BCC6CC',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }
          } />
        <Stack.Screen name="DirectorDashboard" component={DirectorDashboard}
          options={{
            title: 'DirectorDashboard',
            // headerShown:false,
            headerStyle: {
              backgroundColor: '#EB984E'
            },
          }} />
        <Stack.Screen name="TeacherDetails" component={TeacherDetails}
          options={{
            title: 'Teacher Details',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#FFA07A',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
        <Stack.Screen name="StudentCourses" component={StudentCourses}
          options={{
            title: 'StudentCourses',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#FFA07A',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
        <Stack.Screen name="Evaluation" component={Evaluation}
          options={{
            title: 'Evaluation',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#FFA07A',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
        <Stack.Screen name="TeacherCourses" component={TeacherCourses}
          options={{
            title: 'Teacher Courses',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#FFA07A',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
        <Stack.Screen name="TeacherEvaluationResult" component={TeacherEvaluationResult}
          options={{
            title: 'TeacherEvaluationResult',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#FFA07A',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
        <Stack.Screen name="EvaluatedTeacher" component={EvaluatedTeacher}
          options={{
            title: 'EvaluatedTeacher',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#FFA07A',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
        <Stack.Screen name="TeacherDashBoard" component={TeacherDashBoard}
          options={{
            title: 'TeacherDashBoard',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#FFA07A',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
        <Stack.Screen name="TeacherPerformace_Director" component={TeacherPerformace_Director}
          options={{
            title: 'Performance',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#FFA07A',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
        <Stack.Screen name="ChooseEvaluationType" component={ChooseEvaluationType}
          options={{
            title: 'ChooseEvaluationType',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#FFA07A',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
        <Stack.Screen name="TeachersList" component={TeachersList}
          options={{
            title: 'TeachersList',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#FFA07A',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
        <Stack.Screen name="AcademicQuestions" component={AcademicQuestions}
          options={{
            title: 'AcademicQuestions',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#FFA07A',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
        <Stack.Screen name="AdministrativeQuestions" component={AdministrativeQuestions}
          options={{
            title: 'AdministrativeQuestions',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#FFA07A',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
        <Stack.Screen name="ChooseEvaluationType_Director" component={ChooseEvaluationType_Director}
          options={{
            title: 'ChooseEvaluationType_Director',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#FFA07A',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
        <Stack.Screen name="TeachersList_Director" component={TeachersList_Director}
          options={{
            title: 'TeachersList_Director',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#FFA07A',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
        <Stack.Screen name="AdministrationEvaluation_Director" component={AdministrationEvaluation_Director}
          options={{
            title: 'AdministrationEvaluation_Director',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#FFA07A',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
        <Stack.Screen name="ProjectEvaluation_Director" component={ProjectEvaluation_Director}
          options={{
            title: 'ProjectEvaluation_Director',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#FFA07A',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;