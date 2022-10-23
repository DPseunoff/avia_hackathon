import 'package:auto_route/auto_route.dart';
import 'package:avia_hackathon/pages/alert_page.dart';
import 'package:avia_hackathon/pages/home_page.dart';
import 'package:avia_hackathon/pages/init_page.dart';
import 'package:avia_hackathon/pages/onboarding_page.dart';

@MaterialAutoRouter(
  replaceInRouteName: 'Page,Route',
  routes: <AutoRoute>[
    AutoRoute(
      path: 'init',
      name: 'InitRouter',
      page: InitPage,
      initial: true,
      children: [
        AutoRoute(
          path: 'home',
          name: 'HomeRouter',
          page: HomePage,
        ),
        AutoRoute(
          path: 'onboard',
          name: 'OnBoardingRouter',
          page: OnBoardingPage,
        ),
      ],
    ),
    AutoRoute(
      path: 'alert',
      name: 'AlertRouter',
      page: AlertPage,
    ),
  ],
)
class $AppRouter {}
