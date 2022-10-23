import 'package:avia_hackathon/controllers/home_controller.dart';
import 'package:avia_hackathon/utils/app_colors.dart';
import 'package:avia_hackathon/utils/assets_paths.dart';
import 'package:avia_hackathon/utils/enums.dart';
import 'package:avia_hackathon/utils/text_styles.dart';
import 'package:avia_hackathon/widgets/app_button.dart';
import 'package:avia_hackathon/widgets/dialogs.dart';
import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:get/get.dart';

// Дополнительные состояния большой карточки на домашнем экране
class MainCardStates {
  final hc = Get.find<HomeController>();

  // Состояние отдыха с таймером
  Widget restState(BuildContext context, String minutes, String seconds) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 44),
      child: Column(
        children: [
          const SizedBox(height: 91),
          Text(
            '$minutes:$seconds',
            style: AppTextStyles.warningText(
              fontSize: 84,
              height: 101.66 / 84,
            ),
          ),
          const SizedBox(height: 23),
          Text('Оставшееся время перерыва', style: AppTextStyles.mainText()),
          const SizedBox(height: 42),
          Image.asset(Assets.breakPic, height: 132),
          const Spacer(),
          AppButton(
              title: 'Продолжить работу',
              onTap: () async {
                final res = await AppDialogs()
                    .showDialogWindow(context, DialogState.doneRest);
                if (res) {
                  await AppDialogs().callRestDialogWithOptions(context);
                }
              }),
          const SizedBox(height: 29),
        ],
      ),
    );
  }

  // Состояние загрузки
  Widget loadingState() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 94),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SizedBox(height: 91),
          Text(
            'Ищем для вас подходящие\nзадачи...',
            style: AppTextStyles.warningText(),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 72),
          const Center(
            child: SpinKitCircle(color: AppColors.mainBlack, size: 175),
          ),
        ],
      ),
    );
  }
}
