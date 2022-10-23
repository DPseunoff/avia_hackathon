import 'package:auto_route/auto_route.dart';
import 'package:avia_hackathon/navigation/router.gr.dart';
import 'package:avia_hackathon/utils/app_colors.dart';
import 'package:avia_hackathon/utils/assets_paths.dart';
import 'package:flutter/material.dart';
import 'package:avia_hackathon/utils/text_styles.dart';
import 'package:avia_hackathon/widgets/app_button.dart';
import 'package:shared_preferences/shared_preferences.dart';

class OnBoardingPage extends StatefulWidget {
  const OnBoardingPage({Key? key}) : super(key: key);

  @override
  State<OnBoardingPage> createState() => _OnBoardingPageState();
}

// Экран авторизации пользователя
class _OnBoardingPageState extends State<OnBoardingPage> {
  final nameController = TextEditingController();
  final idController = TextEditingController();
  bool _idValidate = false;
  bool _nameValidate = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        physics: const NeverScrollableScrollPhysics(),
        child: Container(
          height: MediaQuery
              .of(context)
              .size
              .height,
          decoration: const BoxDecoration(
            image: DecorationImage(
              image: AssetImage(Assets.backGround),
              fit: BoxFit.fitHeight,
            ),
          ),
          child: Container(
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
                        style: AppTextStyles.heading1().copyWith(
                          color: Colors.white,
                          height: 44 / 36,
                        ),
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
                      constraints: const BoxConstraints(
                        minWidth: 100,
                        maxWidth: 600,
                      ),
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
                                Padding(
                                  padding: const EdgeInsets.only(
                                      left: 44, right: 42),
                                  child: buildTextField(
                                    idController,
                                    'Введите ваш ID',
                                  ),
                                ),
                                Padding(
                                  padding: const EdgeInsets.only(
                                    left: 49,
                                    top: 3,
                                  ),
                                  child: SizedBox(
                                    child: errorText(_idValidate),
                                    height: 14,
                                  ),
                                ),

                                // поле ввода имени
                                Padding(
                                  padding: const EdgeInsets.only(
                                    left: 44,
                                    top: 25,
                                    bottom: 9,
                                  ),
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
                                Padding(
                                  padding: const EdgeInsets.only(
                                    left: 44,
                                    right: 42,
                                  ),
                                  child: buildTextField(
                                    nameController,
                                    'Введите ваше имя',
                                  ),
                                ),
                                Padding(
                                  padding: const EdgeInsets.only(
                                    left: 49,
                                    top: 3,
                                    bottom: 30,
                                  ),
                                  child: SizedBox(
                                    child: errorText(_nameValidate),
                                    height: 14,
                                  ),
                                ),

                                // кнопка авторизации
                                Column(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Padding(
                                      padding: const EdgeInsets.only(
                                        left: 43,
                                        right: 42,
                                        top: 20,
                                      ),
                                      child: AppButton(
                                        title: "Авторизоваться",
                                        onTap: () async {
                                          setState(() {
                                            if (idController.text.isEmpty) {
                                              _idValidate = true;
                                            } else {
                                              _idValidate = false;
                                            }
                                            if (nameController.text.isEmpty) {
                                              _nameValidate = true;
                                            } else {
                                              _nameValidate = false;
                                            }
                                          });
                                          await authAction();
                                        },
                                        height: 66,
                                      ),
                                    ),
                                  ],
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
        ),
      ),
    );
  }

  // При авторизации айди и имя пользователя записываются в устройство
  // (не происходит, если поля ввода - пустые)
  Future<void> authAction() async {
    if (idController.text.isNotEmpty && nameController.text.isNotEmpty) {
      final sp = await SharedPreferences.getInstance();
      sp.setString('userId', idController.text);
      sp.setString('userName', nameController.text);
      context.router.replaceAll([const HomeRouter()]);
    }
  }

  // Виджет поля ввода
  Text errorText(bool validator) {
    if (validator) {
      return Text(
        'Поле не должно быть пустым!',
        style: AppTextStyles.errorText()
      );
    }
    else {
      return const Text('');
    }
  }

  // Метод для создания текстового поля
  TextField buildTextField(TextEditingController controller, String hint) {
    return TextField(
      controller: controller,
      decoration: InputDecoration(
        hintText: hint,
        fillColor: AppColors.lightGrey,
        filled: true,
        contentPadding: const EdgeInsets.fromLTRB(20, 22, 20, 22),
        focusedBorder: const OutlineInputBorder(
          borderRadius: BorderRadius.all(Radius.circular(20.0)),
          borderSide: BorderSide(
            color: AppColors.lightGrey,
          ),
        ),
        enabledBorder: const OutlineInputBorder(
          borderRadius: BorderRadius.all(
            Radius.circular(20.0),
          ),
          borderSide: BorderSide(
            color: AppColors.lightGrey,
          ),
        ),
      ),
    );
  }
}
