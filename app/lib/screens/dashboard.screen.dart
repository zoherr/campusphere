import 'package:flutter/material.dart';
import 'package:qr_flutter/qr_flutter.dart';
import 'package:Campusphere/service/api.service.dart';
import 'package:Campusphere/class/user.class.dart';

class DashboardScreen extends StatefulWidget {
  @override
  _DashboardScreenState createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  final ApiService _apiService = ApiService();
  User? _user;

  @override
  void initState() {
    super.initState();
    _fetchUser();
  }

  void _fetchUser() async {
    try {
      final user = await _apiService.getMe();
      setState(() => _user = user);
    } catch (e) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(SnackBar(content: Text(e.toString())));
    }
  }

  void _logout() async {
    await _apiService.logout();
    Navigator.pushReplacementNamed(context, '/login');
  }

  @override
  Widget build(BuildContext context) {
    if (_user == null)
      return Scaffold(body: Center(child: CircularProgressIndicator()));

    return Scaffold(
      appBar: AppBar(
        title: Text('${_user!.role} Dashboard'),
        actions: [IconButton(icon: Icon(Icons.logout), onPressed: _logout)],
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('Welcome, ${_user!.name}'),
            SizedBox(height: 30),

            if (_user != null &&
                _user!.role == 'student' &&
                _user!.qrCode != null)
              Image.network(
                _user!.qrCode!, // Load QR code image from URL
                width: 200.0,
                height: 200.0,
                fit: BoxFit.cover,
              ),
          ],
        ),
      ),
    );
  }
}
