import 'package:avia_hackathon/controllers/home_controller.dart';
import 'package:avia_hackathon/utils/app_colors.dart';
import 'package:avia_hackathon/utils/enums.dart';
import 'package:avia_hackathon/utils/route_points.dart';
import 'package:avia_hackathon/utils/text_styles.dart';
import 'package:avia_hackathon/widgets/app_button.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

// Класс всплывающих диалоговых окон
class AppDialogs {

  final barrierColor = Colors.black.withOpacity(0.65);
  static const String choose = 'Выберите опцию';
  static const String takeRest = 'Вы уверены, что хотите взять перерыв?';
  static const String doneRest = 'Вы уверены, что хотите закончить перерыв?';
  static const String chooseLocation =
      'Пожалуйста, укажите пункт, где находитесь в данный момент';
  static const String alert =
      'У Вас возникла проблема и вы хотите связаться с диспетчером?';
  static const String exit = 'Вы уверены, что хотите завершить работу?';

  String mainText(DialogState state) {
    switch (state) {
      case DialogState.takingRest:
        return takeRest;
      case DialogState.doneRest:
        return doneRest;
      case DialogState.alert:
        return alert;
      case DialogState.exit:
        return exit;
    }
  }

  String buttonText(DialogState state) {
    switch (state) {
      case DialogState.takingRest:
      case DialogState.doneRest:
        return 'Принять';
      case DialogState.alert:
        return 'Связаться';
      case DialogState.exit:
        return 'Завершить';
    }
  }

  Widget optionText() {
    return Column(
      children: [
        const SizedBox(height: 7),
        Text(
          choose,
          style: AppTextStyles.mainText(
            fontWeight: FontWeight.w500,
            color: AppColors.additionalColor,
          ),
        ),
      ],
    );
  }

  // Основные диалоги
  Future<bool> showDialogWindow(BuildContext context, DialogState state) async {
    final res = await showDialog(
      context: context,
      barrierColor: barrierColor,
      builder: (context) {
        return Row(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              width: 551,
              height: 377,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(20),
                color: Colors.white,
              ),
              child: Padding(
                padding: const EdgeInsets.symmetric(
                  horizontal: 54,
                ),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const SizedBox(height: 44),
                    Text(
                      mainText(state),
                      style: AppTextStyles.mainText(
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    optionText(),
                    const SizedBox(height: 35),
                    AppButton(
                      title: buttonText(state),
                      height: 66,
                      onTap: () => Navigator.of(context).pop(true),
                    ),
                    const SizedBox(height: 20),
                    AppButton(
                      title: 'Отмена',
                      height: 66,
                      whiteVersion: true,
                      onTap: () => Navigator.of(context).pop(false),
                    ),
                    const SizedBox(height: 48),
                  ],
                ),
              ),
            ),
          ],
        );
      },
    );
    return res ?? false;
  }

  // Диалог с выбором текущего местоположения автобуса
  // (необходимо при окончании перерыва)
  Future dropDownDialog(BuildContext context) async {
    final res = await showDialog(
      context: context,
      barrierColor: barrierColor,
      barrierDismissible: false,
      builder: (context) {
        return Row(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              width: 551,
              height: 246,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(20),
                color: Colors.white,
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const SizedBox(height: 47),
                  Padding(
                    padding: const EdgeInsets.only(left: 53),
                    child: Text(
                      'Пожалуйста, укажите пункт, где\nнаходитесь в данный момент',
                      style: AppTextStyles.mainText(),
                    ),
                  ),
                  const Spacer(),
                  Container(
                    margin: const EdgeInsets.symmetric(horizontal: 53),
                    padding: const EdgeInsets.symmetric(horizontal: 25),
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(20),
                      color: AppColors.lightGrey,
                    ),
                    height: 56,
                    child: DropdownButtonHideUnderline(
                      child: DropdownButton(
                        isExpanded: true,
                        hint: Row(),
                        onChanged: (val) {
                          Navigator.of(context).pop(true);
                        },
                        items: points
                            .map(
                              (point) => DropdownMenuItem<String>(
                                value: point,
                                child: Text(
                                  point,
                                  style: AppTextStyles.input(
                                    fontWeight: FontWeight.w500,
                                  ),
                                ),
                              ),
                            )
                            .toList(),
                        icon: const Icon(Icons.keyboard_arrow_down_rounded),
                        iconSize: 26,
                        borderRadius: BorderRadius.circular(20),
                        dropdownColor: AppColors.lightGrey,
                        elevation: 0,
                        menuMaxHeight: 300,
                        style: AppTextStyles.input(),
                      ),
                    ),
                  ),
                  const SizedBox(height: 58),
                ],
              ),
            ),
          ],
        );
      },
    );
    return res;
  }

  // Вспомогательный метод вызова диалога с выбором поинтов
  // нужен для тестов
  Future<void> callRestDialogWithOptions(BuildContext context) async {
    final hc = Get.find<HomeController>();
    final res = await AppDialogs().dropDownDialog(context);
    hc.getTaskList();
  }
}
