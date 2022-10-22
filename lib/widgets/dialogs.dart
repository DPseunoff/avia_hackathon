import 'package:avia_hackathon/utils/app_colors.dart';
import 'package:avia_hackathon/utils/text_styles.dart';
import 'package:avia_hackathon/widgets/app_button.dart';
import 'package:flutter/material.dart';

enum DialogState {
  takingRest, doneRest, alert, exit,
}

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

  Future<bool> showRestDialog(BuildContext context, DialogState state) async {
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
        });
    return res ?? false;
  }
}
