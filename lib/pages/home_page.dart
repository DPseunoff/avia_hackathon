import 'package:avia_hackathon/utils/app_colors.dart';
import 'package:avia_hackathon/utils/text_styles.dart';
import 'package:flutter/material.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        leftBar(context),
        Expanded(
          child: Column(
            children: [
              const Spacer(),
              Row(
                children: [
                  const Spacer(),
                  toolTip(),
                ],
              ),
              const SizedBox(height: 20),
            ],
          ),
        )
      ],
    );
  }

  Widget toolTip() {
    return Align(
      alignment: Alignment.bottomRight,
      child: Container(
        height: 96,
        padding: const EdgeInsets.symmetric(vertical: 13),
        decoration: const BoxDecoration(
          borderRadius: BorderRadius.only(
            topLeft: Radius.circular(20),
            bottomLeft: Radius.circular(20),
          ),
          color: AppColors.lightGrey,
        ),
        child: Row(
          children: [
            const SizedBox(width: 33),
            toolTipButton(),
            const SizedBox(width: 26),
            toolTipButton(),
            const SizedBox(width: 26),
            toolTipButton(),
            const SizedBox(width: 24),
          ],
        ),
      ),
    );
  }

  AspectRatio toolTipButton() {
    return AspectRatio(
      aspectRatio: 1.0,
      child: Container(
        decoration: BoxDecoration(
          color: AppColors.mainBlack,
          borderRadius: BorderRadius.circular(10),
          boxShadow: [
            BoxShadow(
              blurRadius: 12,
              offset: const Offset(3, 6),
              color: Colors.black.withOpacity(0.3),
            ),
          ],
        ),
      ),
    );
  }

  Container leftBar(BuildContext context) {
    final barWidth = MediaQuery.of(context).size.width / 3;

    return Container(
      width: barWidth,
      decoration: const BoxDecoration(
        borderRadius: BorderRadius.only(topRight: Radius.circular(40)),
        color: AppColors.darkGrey,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.only(left: 46, top: 39),
            child: Text(
              'Список задач',
              style: AppTextStyles.heading1(),
            ),
          )
        ],
      ),
    );
  }
}
