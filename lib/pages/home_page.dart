import 'package:auto_route/auto_route.dart';
import 'package:avia_hackathon/navigation/router.gr.dart';
import 'package:avia_hackathon/utils/app_colors.dart';
import 'package:avia_hackathon/utils/assets_paths.dart';
import 'package:avia_hackathon/utils/text_styles.dart';
import 'package:avia_hackathon/widgets/app_button.dart';
import 'package:avia_hackathon/widgets/dialogs.dart';
import 'package:avia_hackathon/widgets/main_card_states.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bounce/flutter_bounce.dart';
import 'package:flutter_svg/flutter_svg.dart';

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
              const Spacer(flex: 45),
              mainTaskCard(),
              const Spacer(flex: 30),
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

  Container mainTaskCard() {
    return Container(
      width: 768,
      height: 611,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(14),
      ),
      child: false ? MainCardStates().restState() :
      Padding(
        padding: const EdgeInsets.symmetric(horizontal: 44),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 33),
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Текущая задача', style: AppTextStyles.heading1()),
                    Padding(
                      padding: const EdgeInsets.only(left: 5),
                      child: Text(
                        'Посадка на самолет',
                        style: AppTextStyles.smallText().copyWith(
                          fontSize: 22,
                          height: 26.63 / 22,
                          color: AppColors.greyText,
                        ),
                      ),
                    )
                  ],
                ),
                const Spacer(),
                Row(
                  children: [
                    Image.asset(Assets.planeTakeOff, height: 39),
                    const SizedBox(width: 14),
                    Text('12:00', style: AppTextStyles.heading1())
                  ],
                ),
              ],
            ),
            const SizedBox(height: 41),
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Кол-во пасажиров: 53\nВремя выполнения: 27 мин.\nМестонахождение: А444',
                  style: AppTextStyles.mainText(),
                ),
                const Spacer(),
                Text(
                  'Пункт посадки: A345\nПункт высадки: DCG_E',
                  style: AppTextStyles.mainText(),
                ),
              ],
            ),
            const Spacer(flex: 44),
            Text('Схема проезда:', style: AppTextStyles.mainText()),
            const SizedBox(height: 42),
            Row(
              children: [
                routeDot('A444'),
                const Spacer(),
                routeArrow('12'),
                const Spacer(),
                routeDot('A345'),
                const Spacer(),
                routeArrow('15'),
                const Spacer(),
                routeDot('DCG_E'),
              ],
            ),
            const Spacer(flex: 50),
            Text('С вами поедут: №20, №44', style: AppTextStyles.mainText()),
            const Spacer(flex: 51),
            AppButton(title: 'Принять', onTap: () {}),
            const SizedBox(height: 29),
          ],
        ),
      ),
    );
  }

  Column routeArrow(String time) {
    return Column(
      children: [
        SvgPicture.asset(Assets.arrow),
        Text('$time минут', style: AppTextStyles.smallText())
      ],
    );
  }

  Column routeDot(String route) {
    return Column(
      children: [
        Container(
          height: 19.71,
          width: 19.71,
          decoration: const BoxDecoration(
            color: Colors.black,
            shape: BoxShape.circle,
          ),
        ),
        const SizedBox(height: 3.17),
        Text(
          route,
          style: AppTextStyles.smallText().copyWith(
            fontSize: 16,
            height: 19.36 / 16,
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
            toolTipButton(0, onTap: () async {
              final res = await AppDialogs().showRestDialog(
                context,
                DialogState.takingRest,
              );
            }),
            const SizedBox(width: 26),
            toolTipButton(1, onTap: () async {
              final res = await AppDialogs().showRestDialog(
                context,
                DialogState.alert,
              );
              if (res) {
                context.router.push(const AlertRouter());
              }
            }),
            const SizedBox(width: 26),
            toolTipButton(2, onTap: () async {
              final res = await AppDialogs().showRestDialog(
                context,
                DialogState.exit,
              );
            }),
            const SizedBox(width: 24),
          ],
        ),
      ),
    );
  }

  Widget toolTipButton(int index, {required Function() onTap}) {
    final svgs = [
      Padding(
        padding: const EdgeInsets.only(
          left: 9,
          top: 14,
          bottom: 15,
          right: 13,
        ),
        child: SvgPicture.asset(Assets.rest),
      ),
      Padding(
        padding: const EdgeInsets.only(
          left: 14,
          top: 9,
          bottom: 13,
          right: 8,
        ),
        child: SvgPicture.asset(Assets.alert),
      ),
      Padding(
        padding: const EdgeInsets.all(14),
        child: SvgPicture.asset(Assets.exit),
      ),
    ];

    return Bounce(
      duration: const Duration(milliseconds: 150),
      onPressed: () {
        onTap();
      },
      child: AspectRatio(
        aspectRatio: 1.0,
        child: Container(
          decoration: BoxDecoration(
            color: AppColors.mainBlack,
            borderRadius: BorderRadius.circular(10),
            boxShadow: [
              BoxShadow(
                blurRadius: 12,
                offset: const Offset(3, 6),
                color: Colors.black.withOpacity(0.5),
              ),
            ],
          ),
          child: svgs[index],
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
          ),
          const SizedBox(height: 10),
          Expanded(
            child: CustomScrollView(
              slivers: [
                SliverPadding(
                  padding: const EdgeInsets.only(top: 10, left: 37, right: 37),
                  sliver: SliverList(
                    delegate: SliverChildListDelegate(
                      List.generate(
                        5,
                        (i) => sideTaskCard(),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget sideTaskCard() {
    return Container(
      height: 276,
      width: 402,
      margin: const EdgeInsets.only(bottom: 26),
      padding: const EdgeInsets.only(top: 16, left: 23, right: 15),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(15),
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.25),
            blurRadius: 4,
            offset: const Offset(2, 4),
          ),
        ],
      ),
      child: Stack(
        children: [
          Positioned.fill(
            child: Align(
              alignment: Alignment.topRight,
              child: Text(
                '12:00',
                style: AppTextStyles.smallText(
                  fontWeight: FontWeight.w700,
                ),
              ),
            ),
          ),
          Positioned.fill(
            bottom: 13.89,
            right: 23 - 16.12,
            child: Align(
              alignment: Alignment.bottomRight,
              child: Column(
                children: [
                  const Spacer(),
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      routeDot('A444'),
                      const SizedBox(width: 5),
                      Expanded(
                        child: FittedBox(
                          fit: BoxFit.fitWidth,
                          child: SvgPicture.asset(
                            Assets.arrow,
                            fit: BoxFit.fitWidth,
                          ),
                        ),
                      ),
                      const SizedBox(width: 5),
                      routeDot('A345'),
                    ],
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      Text(
                        'Следующая задача',
                        style: AppTextStyles.smallText(
                            color: AppColors.greyText),
                      ),
                      const SizedBox(width: 7),
                      SvgPicture.asset(Assets.doubleArrow)
                    ],
                  ),
                ],
              ),
            ),
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 5),
              Text(
                'Описание задачи:',
                style: AppTextStyles.mainText(
                  fontWeight: FontWeight.w700,
                ),
              ),
              const SizedBox(height: 27.83),
              Text('Кол-во пасажиров: 53', style: AppTextStyles.smallText()),
              const SizedBox(height: 8.63),
              Text('Время на выполнение: 5 мин.', style: AppTextStyles.smallText()),
              const SizedBox(height: 8.63),
              Text('Тип задачи: посадка на самолет', style: AppTextStyles.smallText()),
            ],
          ),
        ],
      ),
    );
  }
}
