import 'package:flutter/material.dart';
import 'screens/dashboard.screen.dart';
import 'screens/login_screen.dart';


void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Campusphere', // Added app name
      debugShowCheckedModeBanner: false, // Removed debug banner
      initialRoute: '/login',
      routes: {
        '/login': (context) => LoginScreen(),
        '/dashboard': (context) => DashboardScreen(),
      },
    );
  }
}
