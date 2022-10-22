import 'package:avia_hackathon/utils/app_colors.dart';
import 'package:flutter/material.dart';
import 'package:avia_hackathon/utils/text_styles.dart';

class OnBoardingPage extends StatefulWidget {
  const OnBoardingPage({Key? key}) : super(key: key);

  @override
  State<OnBoardingPage> createState() => _OnBoardingPageState();
}

class _OnBoardingPageState extends State<OnBoardingPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        fit: StackFit.expand,
        children: [
          Image.asset(
            "assets/images/plane.png",
            fit: BoxFit.cover,
          ),
          Container(
            decoration:
                BoxDecoration(color: AppColors.mainBlack.withOpacity(0.4)),
            child: Row(
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Padding(
                      padding: const EdgeInsets.only(left: 100, top: 50),
                      child: Text(
                        'АЭРОПОРТ ШЕРЕМЕТЬЕВО',
                        style: AppTextStyles.heading1()
                            .copyWith(color: Colors.white, height: 44 / 36),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(left: 100),
                      child: Text(
                        'Приложение для водителей автобусов',
                        style: AppTextStyles.smallText().copyWith(
                          color: const Color(0xffD0D0D0),
                        ),
                      ),
                    ),
                    Container(
                      constraints:
                          const BoxConstraints(minWidth: 100, maxWidth: 600),
                      padding: const EdgeInsets.only(left: 100, top: 200),
                      child: Text(
                        'Мы заботимся о вашем удобстве',
                        style: AppTextStyles.heading1().copyWith(
                          color: Colors.white,
                          fontSize: 48,
                          fontWeight: FontWeight.w500,
                          height: 58 / 48,
                        ),
                      ),
                    ),
                  ],
                ),
                Column(
                  children: [
                    Padding(
                      padding: const EdgeInsets.only(left: 84, top: 115),
                      child: Container(
                        height: 451,
                        width: 529,
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(10),
                          boxShadow: [
                            BoxShadow(
                              blurRadius: 12,
                              offset: const Offset(3, 6),
                              color: Colors.black.withOpacity(0.3),
                            ),
                          ],
                        ),
                        child: Column(
                          children: [
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Padding(
                                  padding: const EdgeInsets.only(
                                      left: 44, top: 44, bottom: 9),
                                  child: Text(
                                    'ID',
                                    style: AppTextStyles.heading2().copyWith(
                                      fontWeight: FontWeight.w500,
                                      fontSize: 24,
                                      height: 29 / 24,
                                      color: AppColors.mainBlack,
                                    ),
                                  ),
                                ),
                                const Padding(
                                  padding: EdgeInsets.only(left: 44, right: 42),
                                  child: TextField(
                                    decoration: InputDecoration(
                                      hintText: 'Ваш ёбаный ID',
                                      fillColor: AppColors.lightGrey,
                                      filled: true,
                                      contentPadding:
                                          EdgeInsets.fromLTRB(20, 20, 20, 20),
                                      focusedBorder: OutlineInputBorder(
                                        borderRadius: BorderRadius.all(
                                            Radius.circular(20.0)),
                                        borderSide: BorderSide(
                                          color: AppColors.lightGrey,
                                        ),
                                      ),
                                      enabledBorder: OutlineInputBorder(
                                        borderRadius: BorderRadius.all(
                                            Radius.circular(20.0)),
                                        borderSide: BorderSide(
                                          color: AppColors.lightGrey,
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                                Padding(
                                  padding: const EdgeInsets.only(
                                      left: 44, top: 25, bottom: 9),
                                  child: Text(
                                    'Имя',
                                    style: AppTextStyles.heading2().copyWith(
                                      fontWeight: FontWeight.w500,
                                      fontSize: 24,
                                      height: 29 / 24,
                                      color: AppColors.mainBlack,
                                    ),
                                  ),
                                ),
                                const Padding(
                                  padding: EdgeInsets.only(left: 44, right: 42),
                                  child: TextField(
                                    decoration: InputDecoration(
                                      hintText: 'Ваше ёбаное имя',
                                      fillColor: AppColors.lightGrey,
                                      filled: true,
                                      contentPadding:
                                          EdgeInsets.fromLTRB(20, 20, 20, 20),
                                      focusedBorder: OutlineInputBorder(
                                        borderRadius: BorderRadius.all(
                                            Radius.circular(20.0)),
                                        borderSide: BorderSide(
                                          color: AppColors.lightGrey,
                                        ),
                                      ),
                                      enabledBorder: OutlineInputBorder(
                                        borderRadius: BorderRadius.all(
                                            Radius.circular(20.0)),
                                        borderSide: BorderSide(
                                          color: AppColors.lightGrey,
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
          Row(
            crossAxisAlignment: CrossAxisAlignment.end,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Padding(
                padding: EdgeInsets.only(bottom: 20),
                child: TextButton(
                  child: const Text(
                      'политика конфиденциальности | пользовательское соглашение',
                      style: TextStyle(
                        fontWeight: FontWeight.w400,
                        fontSize: 14,
                        height: 16 / 14,
                        color: Colors.white,
                      ),
                  ),
                  onPressed: () {},
                ),
              ),
            ],
          )
        ],
      ),
    );
  }
}
