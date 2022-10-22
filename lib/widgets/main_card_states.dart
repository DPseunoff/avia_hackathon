import 'package:avia_hackathon/utils/app_colors.dart';
import 'package:avia_hackathon/utils/assets_paths.dart';
import 'package:avia_hackathon/utils/text_styles.dart';
import 'package:avia_hackathon/widgets/app_button.dart';
import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';

class MainCardStates {
  Widget restState() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 44),
      child: Column(
        children: [
          const SizedBox(height: 91),
          Text(
            '14:59',
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
          AppButton(title: 'Продолжить работу', onTap: () {}),
          const SizedBox(height: 29),
        ],
      ),
    );
  }

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
            child: SpinKitCircle(color: AppColors.mainBlack, size: 250),
          ),
        ],
      ),
    );
  }
}
