import 'package:auto_route/auto_route.dart';
import 'package:avia_hackathon/utils/app_colors.dart';
import 'package:avia_hackathon/utils/assets_paths.dart';
import 'package:avia_hackathon/utils/text_styles.dart';
import 'package:avia_hackathon/widgets/app_button.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

// Экран, возникающий при попытке связи с диспетчером
class AlertPage extends StatefulWidget {
  const AlertPage({Key? key}) : super(key: key);

  @override
  State<AlertPage> createState() => _AlertPageState();
}

class _AlertPageState extends State<AlertPage> {
  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Center(
          child: Container(
            width: 768,
            height: 611,
            margin: const EdgeInsets.symmetric(vertical: 94),
            // constraints: const BoxConstraints(
            //   minHeight: 611,
            //   minWidth: 768,
            // ),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(14),
            ),
            child: Column(
              children: [
                const SizedBox(height: 91),
                Text(
                  'С Вами в ближайшие время свяжется диспетчер',
                  style: AppTextStyles.warningText(),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 23),
                Text(
                  'Пожалуйста, дождитесь инструкций',
                  style: AppTextStyles.mainText(),
                  textAlign: TextAlign.center,
                ),
                const Spacer(flex: 61),
                SvgPicture.asset(
                  Assets.alert,
                  height: 101,
                  width: 99,
                  color: AppColors.mainBlack,
                ),
                const Spacer(flex: 105),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 44),
                  child: AppButton(
                    title: 'Продолжить',
                    onTap: () {
                      context.router.navigateBack();
                    },
                  ),
                ),
                const SizedBox(height: 29),
              ],
            ),
          ),
        ),
      ],
    );
  }
}
