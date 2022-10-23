import 'package:avia_hackathon/utils/app_colors.dart';
import 'package:avia_hackathon/utils/text_styles.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bounce/flutter_bounce.dart';

// Отдельный виджет кнопки, присутствующей на всех экранах
class AppButton extends StatelessWidget {
  const AppButton({
    required this.title,
    required this.onTap,
    this.height = 70,
    this.whiteVersion = false,
    this.color = AppColors.mainBlack,
    Key? key,
  }) : super(key: key);

  final double height;
  final bool whiteVersion;
  final String title;
  final Function() onTap;
  final Color color;

  final duration = const Duration(milliseconds: 150);

  @override
  Widget build(BuildContext context) {
    return Bounce(
      onPressed: () {
        onTap();
      },
      duration: duration,
      child: Container(
        height: height,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(10),
          color: whiteVersion ? Colors.white : color,
          border: Border.all(
            width: whiteVersion ? 1 : 0,
            color: whiteVersion ? Colors.black : Colors.transparent
          ),
        ),
        child: Center(
          child: Text(
            title,
            style: AppTextStyles.mainText().copyWith(
              fontWeight: FontWeight.w500,
              color: whiteVersion ? Colors.black : Colors.white,
            ),
          ),
        ),
      ),
    );
  }
}
