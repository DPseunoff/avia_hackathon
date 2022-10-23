import 'package:auto_route/auto_route.dart';
import 'package:avia_hackathon/controllers/home_controller.dart';
import 'package:avia_hackathon/navigation/router.gr.dart';
import 'package:avia_hackathon/utils/app_colors.dart';
import 'package:avia_hackathon/utils/assets_paths.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:lottie/lottie.dart';
import 'package:rxdart/rxdart.dart';
import 'package:shared_preferences/shared_preferences.dart';

// Экран для навигации при запуске приложения
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
    initializeControllers();
    checkAuth();
  }

  // Метод инициализации контроллеров
  void initializeControllers() {
    Get.put(HomeController());
  }

  // Проверка на прохождения авторизации
  // Если человек авторизован, но перезашел в приложение
  // ему не придется проходить ее заново.
  // Сделана задержка для показа сплеш-скрина
  Future<void> checkAuth() async {
    _sub.add(
      Stream.fromFuture(Future.delayed(const Duration(milliseconds: 8000)))
          .listen(
        (event) async {
          final prefs = await SharedPreferences.getInstance();
          final loggedIn = prefs.getString('userId') ?? '';
          if (loggedIn.isEmpty) {
            await context.router.replaceAll([const OnBoardingRouter()]);
          } else {
            await context.router.replaceAll([const HomeRouter()]);
          }
          setState(() {
            _ready = true;
          });
        },
      ),
    );
  }

  bool _ready = false;

  @override
  void dispose() {
    _sub.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      fit: StackFit.expand,
      children: [
        AutoRouter(key: _q),
        if (!_ready)
          Positioned.fill(
            child: Container(
              color: AppColors.mainBlack,
              child: Center(
                child: Lottie.asset(Assets.lottie, width: 500),
              ),
            ),
          ),
      ],
    );
  }
}
