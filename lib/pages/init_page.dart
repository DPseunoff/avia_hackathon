import 'package:auto_route/auto_route.dart';
import 'package:avia_hackathon/navigation/router.gr.dart';
import 'package:flutter/material.dart';
import 'package:rxdart/rxdart.dart';
import 'package:shared_preferences/shared_preferences.dart';

class InitPage extends StatefulWidget {
  const InitPage({Key? key}) : super(key: key);

  @override
  State<InitPage> createState() => _InitPageState();
}

class _InitPageState extends State<InitPage> {
  final _q = UniqueKey();
  final _sub = CompositeSubscription();

  @override
  void initState() {
    super.initState();
    checkAuth();
  }

  Future<void> checkAuth() async {
    final prefs = await SharedPreferences.getInstance();
    final loggedIn = prefs.getString('userId');
    if (loggedIn.isEmpty) {
      await context.router.replaceAll([const OnBoardingRouter()]);
    } else {
      await context.router.replaceAll([const HomeRouter()]);
    }
  }

  @override
  void dispose() {
    _sub.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AutoRouter(key: _q);
  }
}
