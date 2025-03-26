import 'package:flutter/material.dart';
import 'package:Campusphere/service/api.service.dart';
class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  String _role = 'student';
  final ApiService _apiService = ApiService();

  void _login() async {
    try {
      final user = await _apiService.login(
        _emailController.text,
        _passwordController.text,
        _role,
      );
      if (user != null) {
        Navigator.pushReplacementNamed(context, '/dashboard');
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(e.toString())));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Login')),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(controller: _emailController, decoration: InputDecoration(labelText: 'Email')),
            TextField(
              controller: _passwordController,
              decoration: InputDecoration(labelText: 'Password'),
              obscureText: true,
            ),
            DropdownButton<String>(
              value: _role,
              onChanged: (value) => setState(() => _role = value!),
              items: ['student', 'teacher', 'parent', 'admin']
                  .map((role) => DropdownMenuItem(value: role, child: Text(role)))
                  .toList(),
            ),
            ElevatedButton(onPressed: _login, child: Text('Login')),
          ],
        ),
      ),
    );
  }
}