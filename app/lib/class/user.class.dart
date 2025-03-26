class User {
  final String id;
  final String email;
  final String role;
  final String name;
  final String? qrCode; // QR Code field (nullable)

  User({
    required this.name,

    required this.id,
    required this.email,
    required this.role,
    this.qrCode, // Optional field for students
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['data']['_id'],
      name: json['data']['name'],

      email: json['data']['email'],
      role: json['data']['role'],
      qrCode: json['data']['role'] == 'student' ? json['data']['qrCode'] : null,
    );
  }
}
