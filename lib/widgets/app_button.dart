import 'package:avia_hackathon/utils/app_colors.dart';
import 'package:avia_hackathon/utils/text_styles.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bounce/flutter_bounce.dart';

class AppButton extends StatelessWidget {
  const AppButton({
    required this.title,
    required this.onTap,
    this.height = 70,
    this.whiteVersion = false,
    Key? key,
  }) : super(key: key);

  final double height;
  final bool whiteVersion;
  final String title;
  final Function() onTap;

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
          color: whiteVersion ? Colors.white : AppColors.mainBlack,
          border: Border.all(
            width: whiteVersion ? 1 : 0,
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
