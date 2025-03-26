import 'package:Campusphere/class/user.class.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class ApiService {
  static const String baseUrl = 'http://192.168.0.101:8000/api/v1';

  Future<User?> login(String email, String password, String role) async {
    final response = await http.post(
      Uri.parse('$baseUrl/auth/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email, 'password': password, 'role': role}),
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      final prefs = await SharedPreferences.getInstance();

      // Store token
      await prefs.setString('accessToken', data['token']);

      // Fetch user details using getMe()
      return await getMe();
    } else {
      throw Exception('Login failed: ${response.body}');
    }
  }

  Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('accessToken');
    await http.post(
      Uri.parse('$baseUrl/auth/logout'),
      headers: {'Cookie': 'accessToken=$token'},
    );
    await prefs.remove('accessToken');
  }

  Future<User?> getMe() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('accessToken');
    if (token == null) throw Exception('No token found');

    final response = await http.get(
      Uri.parse('$baseUrl/auth/me'),
      headers: {'Cookie': 'accessToken=$token'},
    );

    if (response.statusCode == 200) {
      return User.fromJson(jsonDecode(response.body));
    } else {
      throw Exception('Failed to fetch user: ${response.body}');
    }
  }
}
