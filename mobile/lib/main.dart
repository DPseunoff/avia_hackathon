import 'package:auto_route/auto_route.dart';
import 'package:avia_hackathon/utils/app_colors.dart';
import 'package:flutter/material.dart';

import 'navigation/router.gr.dart';

void main() {
  runApp(MyApp());
}

// Корневой виджет дерева виджетов
class MyApp extends StatelessWidget {
  MyApp({Key? key}) : super(key: key);

  final _appRouter = AppRouter();

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      debugShowCheckedModeBanner: false,
      routeInformationParser: _appRouter.defaultRouteParser(),
      routerDelegate: AutoRouterDelegate(
        _appRouter,
        navigatorObservers: () => [AutoRouteObserver()],
      ),
      builder: (context, child) {
        return SafeArea(
          child: Scaffold(
            backgroundColor: AppColors.mainBlack,
            body: child,
          ),
        );
      },
    );
  }
}
